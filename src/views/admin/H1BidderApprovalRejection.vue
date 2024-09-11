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
            <!-- <div v-if="rowData.data.approvalStatusResult === 'Reject'"> -->
            


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
           
            <!-- <div class="card flex flex-wrap justify-content-center gap-2">
            

            <!-- </div> -->
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
   
    <Dialog v-model:visible="showModal" modal header="Reason for Rejection" :style="{ width: '40rem' }">
      <div class="form-group">
        <InputText
          v-model="rejectionReason"
          placeholder="Please provide a reason for rejection"
          rows="4"
          class="form-control"
        ></InputText>
      </div>
      <div class="modal-action">
        <Button 
          type="button" 
          label="Confirm" 
          :disabled="isConfirmDisabled"
          @click="submitRejection">
        </Button>
        <Button 
          type="button" 
          label="Cancel" 
          class="p-button-secondary" 
          severity="danger"
          @click="closeModal(true)">
        </Button>
      </div>
    </Dialog>
    <!-- Your Submit button component -->
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
import Dialog from "primevue/dialog";
// import Tooltip from 'primevue/tooltip';
import 'primeicons/primeicons.css';
import { defineEmits } from 'vue';
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
// import faEye from '../../../assets/icons/eye.svg';

let isSubmitButtonDisabled=ref(false);
const emit = defineEmits(['close']);
const toaster = createToaster({ position: "top-right", duration: 3000 });
const props = defineProps({
  auctionId: Number,
});

const showModal = ref(false);
const rejectionReason = ref('');
const modalData = ref(null);
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
const status = ref('');
const $v = useVuelidate(rules, { noOfDays });
const isConfirmDisabled = computed(() => {
  return !rejectionReason.value.trim(); // Check if rejectionReason is empty or only whitespace
});
let disabled = ref(false);
const approvalStatusResult = ref({ id: 0, approvalStatus: "" });
const dropdownOptions = ref([]);
function openRejectModal(rowData) {
  showModal.value = true;
  modalData.value = rowData;
  roundNumber.value=rowData.data.roundNumber;
}

function closeModal(isCancel = false) {
  // Reset approval status if canceling
  if (isCancel && modalData.value) {
    modalData.value.data.approvalStatusResult = null; // Reset to 'kindly select'
  }
  showModal.value = false;
  rejectionReason.value = ''; // Reset rejection reason
}

function updateH1RejectionReason() {
		// Automatically generated
    new MQL()
          .useManagementServer()
			.setActivity("r.[H1RejectionReason]")
			.setData({auctionId:auctionId.value,h1RejectionReason:rejectionReason.value,roundNumber:roundNumber.value})
			//.setHeaders({"Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NCIsImdyb3VwcyI6WyJSb2xlIE1ha2VyIiwiUm9sZSBDaGVja2VyIiwiUm9sZSBBcHByb3ZlciIsIlJvbGUgU2NoZWR1bGVyIiwiU3VwZXJBZG1pbiIsIk9yZ2FuaXphdGlvbkFkbWluIiwiUm9sZSBXYXRjaGVyIiwiUm9sZSBBZG1pbiIsIlJvbGUgUHVibGlzaGVyIiwiUm9sZSBEZXZlbG9wZXIiXSwiY2xpZW50SVAiOiIxMDMuODUuMTgxLjYxIiwiaGl0c0NvdW50IjowLCJ0b2tlbiI6IiIsIm1ldGFkYXRhIjoie1wiZnVsbE5hbWVcIjpcInNod2V0YSBwYW5kZXlcIixcIm1vYmlsZU51bWJlclwiOlwiNjM5MzMwMjI4NFwiLFwidXNlcm5hbWVcIjpcInNod2V0YUBnbWFpbC5jb21cIixcImVudGl0eUlkXCI6MixcIm9yZ2FuaXphdGlvbklkXCI6MSxcIm9yZ2FuaXphdGlvbk5hbWVcIjpcIkRVTEIgSGFyeWFuYVwiLFwicmVnU3RhdHVzSWRcIjowLFwicmVnU3RhdHVzTmFtZVwiOlwiVVNFUl9BUFBST1ZFRFwiLFwibG9naW5JZFwiOlwiOTRcIn0iLCJleHAiOjE3MjU2MDU2OTV9.NW1KmYLgcs8FB6AJ4X2d1FKZy6_4Vb-QZT2mFSDHORA"})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("H1RejectionReason",true)
			if (rs.isValid("H1RejectionReason")) {
			} else
			 { 
			rs.showErrorToast("H1RejectionReason")
			}
			})
    }
function submitRejection() {
  // Check if the rejection reason is provided
  if (!rejectionReason.value.trim()) {
    // If no rejection reason, show an error or keep the modal open
    toaster.error('Please provide a reason for rejection.');
    return;
  }

			
  // If the reason is provided, set approval status to "Reject"
  if (modalData.value) {
    modalData.value.data.approvalStatusResult = dropdownOptions.value.find(
      (option) => option.label === 'Reject'
    ).value;
  }
  updateH1RejectionReason();

  closeModal(); 
  //toaster.success('Rejection reason submiited successfully')// Close the modal after setting "Reject"
  
}

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
        // console.log("approvalStatusResult", approvalStatusResult.value);
      } else {
        rs.showErrorToast("FetchH1ApprovalStatus");
      }
    });
}
const roundNumber=ref(null);
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
     //  res.result.fetchH1BidderAuctionDetails[0].roundNumber;
        //console.log(res.result.fetchH1BidderAuctionDetails[0]);
       
        // console.log("ResultList!!!!!",res.result.fetchH1BidderAuctionDetails)
        res.result.fetchH1BidderAuctionDetails.forEach((item) => {
          resultList.push({
            ...item,
           // accepted: item.accepted === 1 ? 1 : 2,
           //rejectionReason: item.rejectionReason || 'No reason provided',
          });
          
        });
        // console.log("resultList is **** ", resultList);

        if (
          res.result.fetchH1BidderAuctionDetailsIndentDays[0].indentHours > 0
        ) {
          noOfDays.value =
            res.result.fetchH1BidderAuctionDetailsIndentDays[0].indentHours;
          // console.log("indentDays is ", noOfDays.value);
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
  // console.log("rowData and label is",rowData.data.approvalStatusResult," ", label)
  // Find the index of the item in resultList to ensure reactivity
  const index = resultList.findIndex((item) => item.id === rowData.id);
  if (index !== -1) {
    // Update the reactive property
    resultList[rowData.index] = { ...resultList[rowData.index],ApprovalStatus:label, accepted: selectedValue };
    // console.log(
    //   "rowData.accepted#################",
    //   resultList[index].accepted,
    //   "result list ",
    //   resultList
    // );
    if (label === "Reject") {
    openRejectModal(rowData); // Trigger the modal opening
  }
  }
}

function submitForm() {
  // console.log("Auction id ", auctionId.value);
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

    // console.log("result list ", resultList);

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
          //isSubmitButtonDisabled.value = true;
          sendEmailH1Bidders();
          sendSmsH1Bidders();
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
          .useNotificationServer()
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
function sendSmsH1Bidders() {
					// Automatically generated
          new MQL()
          .useNotificationServer()
			.setActivity("r.[FetchDetailsForH1Rejection]")
			.setData({approvalId:approvalId.value,auctionId:auctionId.value})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchDetailsForH1Rejection",true)
			if (rs.isValid("FetchDetailsForH1Rejection")) {
			} else
			 { 
			rs.showErrorToast("FetchDetailsForH1Rejection")
			}
			})
    }		
onMounted(() => {
  h1AuctionDetails();
  fetchH1ApprovalStatus();
});
</script>
