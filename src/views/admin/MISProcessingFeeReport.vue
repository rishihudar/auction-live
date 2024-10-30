<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Registration Fee Report</h2>
            </div>
        </div>
        <div class="box-grid">
            <div class="card col-span-6">
                <div class="form-grid">
                    <div class="col-span-full">
                        <div class="fm-group">
                            
                            <label class="fm-label">Select Entity</label>
                            <div class="fm-inner">
                                <Dropdown v-model="selectedEntity" :options="entities" optionLabel="entityName"
                                    placeholder="Select Entity" />
                            </div>
                            <label class="fm-label">Select Date</label>
                            <div class="fm-inner">
                                <Calendar v-model="dates" selectionMode="range" :manualInput="false" :maxDate="currentDate2" :show-icon="true"
                                    @date-select="MISProcessingFeeReport" />
                            </div>
                        </div>
                    </div>
                    <div class="fm-action">
                        <JsonExcel :data="json_data" :fields="processingReportFields" type="xlsx" class="btn btn-primary cursor-pointer" worksheet="My Worksheet" name="ProcessingFeeReport.xlsx">
                            Excel Report
                        </JsonExcel>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted,watch} from "vue";
import MQL from "@/plugins/mql.js";
import JsonExcel from "vue-json-excel3";
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
const currentDate1 = new Date();
//console.log("currentdate1#########", currentDate1)
const currentDate2 = new Date();
let dates = ref([currentDate1, currentDate2]);
//console.log("dates@@@@@@@@@", dates)

let json_data = ref([]);

const selectedEntity = ref();
const entities = ref([]);
function fetchEntityName() {
new MQL()
.useCoreServer()
.setActivity("o.[FetchEntityData]")
.setData({})
.fetch()
.then(rs => {
let res = rs.getActivity("FetchEntityData",true)
if (rs.isValid("FetchEntityData")) {
entities.value = res.result
entities.value = entities.value.filter(entity => entity.entityId !== "1");
} else
{ 
rs.showErrorToast("FetchEntityData")
}
})

}
const processingReportFields = {
    
   'Auction Code':'auctionCode',
    'Payment Date and Time': 'paymentDate',
    'Transaction ID': 'transactionId',
    'Amount': 'amount',
    'Bidder Name': 'bidderName',
    'Email Id': 'emailId',
    'Status': 'status',
    'MerchantTxnID': 'merchantTxnId'
};
function MISProcessingFeeReport() {
    if (dates.value[0] && dates.value[1] !== null) {
    new MQL()
        .useManagementServer()
        .setActivity("r.[MISProcessingFeeReport]")
        .setData({ toDate: formatDate(dates.value[0]), fromDate: formatDate(dates.value[1]),entityId:selectedEntity.value.entityId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("MISProcessingFeeReport", true)
            if (rs.isValid("MISProcessingFeeReport")) {
                json_data.value = res.result;
            } else {
                rs.showErrorToast("MISProcessingFeeReport")
            }
        })
    }
}

function formatDate(date) {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
watch(selectedEntity, (newValue) => {

dates.value=[new Date(),new Date()]
json_data.value = undefined

 })

onMounted(() => {
    fetchEntityName();
})
</script>

<style></style>
