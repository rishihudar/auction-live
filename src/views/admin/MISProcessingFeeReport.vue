<template>
    <div class="card flex justify-content-center">
      <h1>  Processing Fee Report</h1>
        <label>select date</label>
        <Calendar v-model="dates" selectionMode="range" :manualInput="false" :maxDate="currentDate2"
            @date-select="MISProcessingFeeReport" />
    </div>
    <div>
        <JsonExcel :data="json_data" :fields="processingReportFields" type="xlsx" class="btn btn-default" worksheet="My Worksheet" name="ProcessingFeeReport.xlsx">
            Excel Report
        </JsonExcel>
    </div>
</template>

<script setup>
import { ref} from "vue";
import MQL from "@/plugins/mql.js";
import JsonExcel from "vue-json-excel3";
import Calendar from 'primevue/calendar';

const currentDate1 = new Date();
console.log("currentdate1#########", currentDate1)
const currentDate2 = new Date();
let dates = ref([currentDate1, currentDate2]);
console.log("dates@@@@@@@@@", dates)

let json_data = ref([]);
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
        .setData({ toDate: formatDate(dates.value[0]), fromDate: formatDate(dates.value[1]) })
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

</script>

<style></style>
