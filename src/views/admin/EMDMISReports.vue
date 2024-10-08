<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">EMD MIS Report</h2>
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
                                    @date-select="FetchConcludedAuctionsEMDReports" />
                            </div>
                        </div>
                    </div>
                    <div class="fm-action">
                        <JsonExcel :data="json_data" type="xlsx" :fields="emdReportFields" class="btn btn-primary cursor-pointer" worksheet="My Worksheet" name="Concluded Auctions EMD Report.xlsx">
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
import { login } from "../../store/modules/login.js";
const currentDate1 = new Date();
//console.log("currentdate1#########", currentDate1)
const currentDate2 = new Date();
let dates = ref([currentDate1, currentDate2]);
//console.log("dates@@@@@@@@@", dates)

let json_data = ref([]);
const emdReportFields = {
    
    'Entity Name': 'EntityName',
    'Auction Code': 'AuctionCode',
    'Payment Date and Time': 'Payment Date and Time',
    'MerchantTxnID': 'merchantTxnId',
    'Transaction ID/Pay2Corp ID': 'transactionId',
    'Amount': 'Amount',
    'Bidder Name': 'Bidder Name',
    'Email Id': 'Email Id',
    'Approved H1/Non-H1/Rejected H1': 'approval',
    'Property': 'Property',

};

function FetchConcludedAuctionsEMDReports() {
    // Check if both dates are selected and end date is not null
    
    if (dates.value[0] && dates.value[1] !== null) {
        new MQL()
            .useManagementServer()
            .setActivity("r.[FetchConcludedAuctionsEMDReports]")
            .setData({ entityId: login().loginDetails.entityId, toDate: formatDate(dates.value[0]), fromDate: formatDate(dates.value[1]) })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("FetchConcludedAuctionsEMDReports", true)
                if (rs.isValid("FetchConcludedAuctionsEMDReports")) {
                    json_data.value = res.result.fetchConcludedAuctionsEMDReports;
                    console.log("json_data", json_data.value);
                  // let Approved =res.result.fetchConcludedAuctionsEMDReports[0].approval
                //  for (let i = 0; i < json_data.value.length; i++) {
                //     if (json_data.value[i].approval == 1) {
                //         json_data.value[i].approval = "Approved H1"
                //     } else if (json_data.value[i].approval == 2) {
                //         json_data.value[i].approval = "Rejected H1"
                //     } else if (json_data.value[i].approval == 0) {
                //         json_data.value[i].approval = "Pending"
                //     }
                //     else {
                //         json_data.value[i].approval = "Non-H1"
                //     }
                // }
                    // console.log("Approved", Approved)
                } else {
                    rs.showErrorToast("FetchConcludedAuctionsEMDReports")
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
