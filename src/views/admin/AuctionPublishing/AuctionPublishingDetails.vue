<template>
  <div class="card">
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="auctionData"
      showGridlines
      tableStyle="min-width: 50rem"
    >
    <template #empty>No Auctions Found</template>
      <Column field="auctionCode" header="Auction Code"> </Column>
      <Column field="auctionDescription" header="Auction Description"> </Column>
      <Column field="inventoryCategoryName" header="Auction Category"> </Column>
      <Column field="eventProcessingFees" header="Auction Fees"> </Column>
      <Column
        field="startDate"
        header="Processing Fee StartDate/Time"
      >
      </Column>
      <Column field="endDate" header="Processing Fee EndDate/Time">
      </Column>
      <Column expander header="Action" style="width: 5rem" >
      <template #rowtogglericon="">
<Button label="Action"/>
      </template>
      </Column>
      <template #expansion="slot">
        <div class="card">
          <h2>
            Auction Code: {{ slot.data.auctionCode }} Auction Category:
            {{ slot.data.inventoryCategoryName }} Description:{{
              slot.data.auctionDescription
            }}
            Auction Type:{{ slot.data.auctionType }}
          </h2>
          <h2>
            Auction Method: {{ slot.data.auctionMethodName }} Auction Process:
            {{ slot.data.auctionProcessName }} Department:
            {{ slot.data.departmentName }} District: {{ slot.data.district }} MC:
            {{ slot.data.mcName }}
          </h2>
          <h2>
            Location: {{ slot.data.location }} Area: {{ slot.data.AREA }}
          </h2>
          <Button label="View Publishing Details" @click="viewPublishDetails(slot.data.auctionCode),fetchAllStepsAuctionPreview(),visible = true" />
          <Dialog
            v-model:visible="visible"
            modal
            header="Publish Auction"
            :style="{ width: '60rem' }"
          >
            <h2>Auction Code: {{ auctionId }}</h2>
            <label for="calendar-12h" class="font-bold block mb-2">
              Processing Fee And EMD payment Start Date:</label
            >
            <Calendar
              id="calendar-24h"
              v-model="selectedStartDate"
              showTime
              hourFormat="24"
              :minDate="minDate"
              :showIcon="true"
            />
            {{selectedStartDate}}
            <label for="calendar-12h" class="font-bold block mb-2">
              Processing Fee And EMD payment End Date:</label
            >
            <Calendar
              id="calendar"
              v-model="selectedEndDate"
              showTime
              hourFormat="24"
              :minDate="endMinDate"
              :showIcon="true"
            />
            {{selectedEndDate}}
            <div v-if="moment(selectedEndDate).isSameOrBefore(selectedStartDate) || moment(selectedEndDate).isSame(moment(selectedStartDate),'minute')" style="color: red;">
             Start Date should not be equal or after End Date !
            </div>
            <div> <input type="checkbox" id="agreeCheckbox" v-model="agree" required/>
              <label for="agreeCheckbox">  I agree that to publish.</label></div>
            <div class="flex justify-content-end gap-2">             
              <Button
                type="button"
                label="Publish"
                :disabled="!agree"
                @click="publishAuction(),visible=false"
              ></Button>
            </div>
          </Dialog>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import Calendar from "primevue/calendar";
import moment from "moment";
import MQL from "@/plugins/mql.js";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right", duration: 5000 });

const auctionData = ref([]);
const visible = ref(false);
const expandedRows = ref([]);
const auctionId = ref();

const agree = ref(false);

const selectedStartDate = ref();
const selectedEndDate = ref();

const minDate = ref();
minDate.value = moment().add(1, "minutes").toDate();
const endMinDate = ref();
endMinDate.value = moment().add(2, "minutes").toDate();
const dbEndDate = ref();
const dbStartDate = ref();



function fetchAuctionWithApprovedStatus(){
  
					// Automatically generated
          new MQL()
      .useManagementServer()
			.setActivity("o.[FetchAuctionsWithApprovedStatus]")
			.setData({statusId:28})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchAuctionsWithApprovedStatus",true)
			auctionData.value=res.result.auctionData
      if (rs.isValid("FetchAuctionsWithApprovedStatus")) {
			} else
			 { 
			rs.showErrorToast("FetchAuctionsWithApprovedStatus")
			}
			})
			
};
function fetchAllStepsAuctionPreview() {
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[FetchAllStepsAuctionPreview]")
    .setData({ auctionId: auctionId.value })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchAllStepsAuctionPreview", true);
      dbStartDate.value = res.result.fetchStep4AuctionPreview[0].startDate;
      dbEndDate.value = res.result.fetchStep4AuctionPreview[0].endDate;
      console.log(
        "dbStartDate.value",
        dbStartDate.value,
        "dbEndDate.value",
        dbEndDate.value
      );
      selectedStartDate.value=dbStartDate.value
      selectedEndDate.value=dbEndDate.value
      if (rs.isValid("FetchAllStepsAuctionPreview")) {
      } else {
        rs.showErrorToast("FetchAllStepsAuctionPreview");
      }
    });
}
function processingFeeEmdPaymentStartEndDate() {
 // store.setLastInsertedAuctionId(31);
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[step4UpdateDatesAndUploadDocuments]")
    .setData({
      registrationStartDate: moment(selectedStartDate.value).format(
        "YYYY/MM/DD HH:mm:ss"
      ),
      registrationEndDate: moment(selectedEndDate.value).format(
        "YYYY/MM/DD HH:mm:ss"
      ),
      statusId:17,
      auctionId: auctionId.value,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("step4UpdateDatesAndUploadDocuments", true);
      if (rs.isValid("step4UpdateDatesAndUploadDocuments")) {
        console.log("res.result",res.result);
      } else {
        rs.showErrorToast("step4UpdateDatesAndUploadDocuments");
      }
    });
}

function viewPublishDetails(rowAuctionId){
  console.log("rowAuctionId", rowAuctionId);
  auctionId.value = rowAuctionId;
};

function publishAuction() {
  if(moment(selectedEndDate.value).isSameOrBefore(selectedStartDate.value) || moment(selectedEndDate.value).isSame(moment(selectedStartDate.value),'minute')){
    console.log("log-",moment(selectedEndDate.value).isSameOrBefore(selectedStartDate.value) || moment(selectedEndDate.value).isSame(moment(selectedStartDate.value),'minute'));
    alert(`Start Date should not be equal or after End Date !`);
  }else{  
   processingFeeEmdPaymentStartEndDate();
   iAgreeStatusUpdate();
  toaster.success("Auction Published !!!");
  }
}


function iAgreeStatusUpdate(){
  
					// Automatically generated
          new MQL()
      .useManagementServer()
			.setActivity("o.[IAgreeFlagUpdate]")
			.setData({auctionId:auctionId.value})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("IAgreeFlagUpdate",true)
			if (rs.isValid("IAgreeFlagUpdate")) {
			} else
			 { 
			rs.showErrorToast("IAgreeFlagUpdate")
			}
			})
			
};

onMounted(() => {
  fetchAuctionWithApprovedStatus();
  //fetchAuctionDetailsForPublishing();
});
</script>
