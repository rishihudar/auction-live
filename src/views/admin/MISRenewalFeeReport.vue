<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Renewal Fee Report</h2>
            </div>
        </div>
        <div class="box-grid">
            <div class="card col-span-6">
                <div class="form-grid">
                    <div class="col-span-full">
                        <div class="fm-group">
                            <label class="fm-label">Select Date</label>
                            <div class="fm-inner">
                                <Calendar v-model="dates" selectionMode="range" :manualInput="false" :maxDate="currentDate2" :showIcon="true"
                                    @date-select="MISRenewalFeeReport" />
                            </div>
                        </div>
                    </div>
                    <div class="fm-action">
                        <JsonExcel :data="json_data" type="xlsx" :fields="renewalReportFields" class="btn btn-primary cursor-pointer" worksheet="My Worksheet" name="RenewalFeeReport.xlsx">
                            Excel Report
                        </JsonExcel>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MQL from "@/plugins/mql.js";
import JsonExcel from "vue-json-excel3";
import Calendar from 'primevue/calendar';

const currentDate1 = new Date();
const currentDate2 = new Date();
let dates = ref([currentDate1, currentDate2]);

let json_data = ref([]);
const renewalReportFields = {
    
    'Registration Date and Time': 'registrationDate',
    'Bidder Regsitration Expiry date (Latest)':'registrationExpiryDate',
    'Payment Date and Time': 'paymentDate',
    'Transaction ID': 'transactionId',
    'Amount': 'amount',
    'Bidder Name': 'bidderName',
    'Email Id': 'emailId',
    'Status': 'status',
    'MerchantTxnID': 'merchantTxnId'
};

function MISRenewalFeeReport() {
    // Check if both dates are selected and end date is not null
    if (dates.value[0] && dates.value[1] !== null) {
        new MQL()
            .useManagementServer()
            .setActivity("r.[MISRenewalFeeReport]")
            .setData({ toDate: formatDate(dates.value[0]), fromDate: formatDate(dates.value[1]) })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("MISRenewalFeeReport", true)
                if (rs.isValid("MISRenewalFeeReport")) {
                    json_data.value = res.result;
                } else {
                    rs.showErrorToast("MISRenewalFeeReport")
                }
            });
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
