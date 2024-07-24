<template>
  <div>
    <div class="fm-group">
      <label class="fm-label" for="horizontal-buttons">Number of Hours</label>
      <InputNumber
        v-model="noOfDays"
        placeholder="Enter number greater than 98"
        showButtons
        :step="1"
        :disabled="disabled"
      >
        <template #incrementbuttonicon>+</template>
        <template #decrementbuttonicon>-</template>
      </InputNumber>
      <div v-if="$v.noOfDays.$error" class="fm-error">
        {{ $v.noOfDays.$errors[0].$message }}
      </div>
    </div>

    <div class="table-custom">
      <DataTable :value="resultList" dataKey="id" :disabled="disabled">
        <Column field="roundNumber" header="ROUND NUMBER"></Column>
        <Column field="allocatedProperty" header="ALLOCATED PROPERTY"></Column>
        <Column
          field="highestQuotedValue"
          header="HIGHEST QUOTED VALUE (₹)"
        ></Column>
        <Column
          field="firstPayment"
          header="1st payment TO BE PAID (₹)"
        ></Column>
        <Column header="ELIGIBLE ?">
          <template #body="rowData" v-if="!disabled">
            <Dropdown
              v-model="rowData.data.approvalStatusResult"
              :options="dropdownOptions"
              placeholder="kindly select"
              optionLabel="label"
              optionValue="value"
              @change="(e) => updateAccepted(rowData, e.value,e)"
              :disabled="disabled"
            />
          </template>
          <!-- <template #body="rowData" v-if="!disabled">
            <Dropdown
              v-model="rowData.data.approvalStatusResult"
              :options="dropdownOptions"
              placeholder="kindly select"
              optionLabel="label"
              optionValue="value"
              @change="e => updateAccepted(rowData, e.value)"
              :disabled="disabled"
              
            />
          </template> -->

          <template #body="rowData" v-else>
            {{ rowData.data.ApprovalStatus }}
          </template>
        </Column>
        <Column header="INTENT_LETTER">
          <template #body="slotProps">
            <span>Intent letter</span>
          </template>
        </Column>
        <Column header="ALLOTMENT LETTER">
          <template #body="slotProps">
            <span>Intent letter</span>
          </template>
        </Column>
      </DataTable>
    </div>

    <div class="table-exp-action centered">
      <Button label="Submit" @click="submitForm" :disabled="disabled" />
    </div>
    <div class="table-exp-notice table-exp-notice-danger mt-4 text-center">
      <strong>Note:</strong>
      <span>
        First payment is calculated as = (Highest quoted value * First Payment
        Percentage) - EMD amount
      </span>
    </div>
  </div>
</template>

<script setup>
import Checkbox from "primevue/checkbox";
import { computed, ref, onMounted, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, numeric, minValue } from "@vuelidate/validators";
import MQL from "@/plugins/mql.js";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { storeToRefs } from "pinia";
import { login } from "../../store/modules/login";
import { createToaster } from "@meforma/vue-toaster";
import Dropdown from "primevue/dropdown";

const toaster = createToaster({ position: "top-right", duration: 3000 });
const props = defineProps({
  auctionId: Number,
});

let auctionId = ref(props.auctionId);
const loginStore = login();
const { organizationId, entityId, loginId } = storeToRefs(loginStore);
let tick = ref();
const resultList = reactive([]);
const selectedRows = ref([]);
let accepted = ref();
let noOfDays = ref(98);
let rules = computed(() => ({
  noOfDays: {
    required,
    numeric,
    minLength: minLength(1),
    minValue: minValue(98, 'The minimum value for "Number of Hours" is 98'),
  },
}));

const $v = useVuelidate(rules, { noOfDays });

let disabled = ref(false);
const approvalStatusResult = ref({ id: 0, approvalStatus: "" });
const dropdownOptions = ref([]);

function fetchH1ApprovalStatus() {
  new MQL()
    .useManagementServer()
    .setActivity("r.[FetchH1ApprovalStatus]")
    .setData({})
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchH1ApprovalStatus", true);
      if (rs.isValid("FetchH1ApprovalStatus")) {
        approvalStatusResult.value = res.result;
        dropdownOptions.value = approvalStatusResult.value.map((item) => ({
          label: item.approvalStatus,
          value: item.id,
        }));
        console.log("approvalStatusResult", approvalStatusResult.value);
      } else {
        rs.showErrorToast("FetchH1ApprovalStatus");
      }
    });
}

function h1AuctionDetails() {
  new MQL()
    .useManagementServer()
    .setActivity("r.[FetchH1BiddersAuctionDetails]")
    .setData({ auctionId: auctionId.value, entityId: entityId.value })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchH1BiddersAuctionDetails", true);
      if (rs.isValid("FetchH1BiddersAuctionDetails")) {
        res.result.fetchH1BidderAuctionDetails;
        console.log("ResultList!!!!!",res.result.fetchH1BidderAuctionDetails)
        res.result.fetchH1BidderAuctionDetails.forEach((item) => {
          resultList.push({
            ...item,
           // accepted: item.accepted === 1 ? 1 : 2,
          });
          
        });
        console.log("resultList is **** ", resultList);

        if (
          res.result.fetchH1BidderAuctionDetailsIndentDays[0].indentHours > 0
        ) {
          noOfDays.value =
            res.result.fetchH1BidderAuctionDetailsIndentDays[0].indentHours;
          console.log("indentDays is ", noOfDays.value);
          disabled.value = true;
        } else {
          disabled.value = false;
        }
      } else {
        rs.showErrorToast("FetchH1BiddersAuctionDetails");
      }
    });
}

function updateAccepted(rowData, selectedValue) {
  let label = rowData.data.approvalStatusResult == 1 ? "Accept" : "Reject"
  console.log("rowData and label is",rowData.data.approvalStatusResult," ", label)
  // Find the index of the item in resultList to ensure reactivity
  const index = resultList.findIndex((item) => item.id === rowData.id);
  if (index !== -1) {
    // Update the reactive property
    resultList[rowData.index] = { ...resultList[rowData.index],ApprovalStatus:label, accepted: selectedValue };
    console.log(
      "rowData.accepted#################",
      resultList[index].accepted,
      "result list ",
      resultList
    );
  }
}

function submitForm() {
  console.log("Auction id ", auctionId.value);
  const validation = $v.value.$validate();
  if (!$v.value.$error) {
    // Check if all dropdowns are selected
    const allDropdownsSelected = resultList.every(
      (item) => item.approvalStatusResult
    );

    if (!allDropdownsSelected) {
      toaster.error(
        "Please select an option for all dropdowns before submitting."
      );
      return;
    }

    console.log("result list ", resultList);

    // if (!$v.value.$error) {
    //   console.log("result list ", resultList);

    new MQL()
      .useManagementServer()
      .setActivity("r.[UpdateH1BidderDetails]")
      .setData({
        auctionId: auctionId.value,
        h1ApprovedBidders: resultList,
        noOfDays: noOfDays.value,
      })
      .fetch()
      .then((rs) => {
        let res = rs.getActivity("UpdateH1BidderDetails", true);
        if (rs.isValid("UpdateH1BidderDetails")) {
          disabled.value = true;
          toaster.success("Successfully Updated");
          sendEmailH1Bidders();
        } else {
          rs.showErrorToast("UpdateH1BidderDetails");
        }
      });
  } else {
    toaster.error("Invalid Number of Hours");
  }
}

function sendEmailH1Bidders() {

          new MQL()
			.setActivity("r.[NotifyH1ApprovedBidders]")
			.setData({"resultList":resultList})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("NotifyH1ApprovedBidders",true)
			if (rs.isValid("NotifyH1ApprovedBidders")) {
			} else
			 { 
			rs.showErrorToast("NotifyH1ApprovedBidders")
			}
			})
			

}

onMounted(() => {
  h1AuctionDetails();
  fetchH1ApprovalStatus();
});
</script>
