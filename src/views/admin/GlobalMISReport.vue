<template>


    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">GLobal MIS Report</h2>
            </div>
        </div>
        <div class="box-grid">
            <div class="card col-span-6">
                <div class="form-grid">
                    <div class="col-span-full">
                        <div class="fm-group">

                            <label class="fm-label">Select MIS Type</label>
                            <div class="fm-inner">
                                <Dropdown v-model="selectedMIS" :options="misTypes" optionLabel="name"
                                    placeholder="Select MIS Type" />
                            </div>


                            <label class="fm-label">Select Entity</label>
                            <div class="fm-inner">
                                <Dropdown v-model="selectedEntity" :options="entities" optionLabel="entityName"
                                    placeholder="Select Entity" />
                            </div>

                            <label class="fm-label">Select Date</label>
                            <div class="fm-inner">
                                <Calendar v-model="dates" selectionMode="range" :manualInput="false"
                                    :maxDate="currentDate2" :showIcon="true"
                                    @date-select="FetchReports" />
                            </div>
                            
                        </div>
                    </div>



                    <div class="fm-action">
                        <JsonExcel :data="json_data" type="xlsx" :fields="emdReportFields"
                            class="btn btn-primary cursor-pointer" worksheet="My Worksheet"
                            :name=MISFileName>
                            Excel Report
                        </JsonExcel>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

import Dropdown from 'primevue/dropdown';
import { ref, onMounted, watch } from "vue";
import MQL from "@/plugins/mql.js";
import JsonExcel from "vue-json-excel3";
import Calendar from 'primevue/calendar';
import { date } from '@formkit/icons/index.cjs';

const selectedEntity = ref();
const entities = ref([]);
let MISFileName=ref()
const selectedMIS = ref();
const misTypes = ref([
    { name: 'H1 MIS Report'},
    { name: 'EMD MIS Report'}
]);

const currentDate1 = new Date();
// console.log("currentdate1#########", currentDate1)
const currentDate2 = new Date();
let dates = ref([currentDate1, currentDate2]);
//console.log("dates@@@@@@@@@", dates)

let json_data = ref([]);
const emdReportFields = {

    'Entity Name': 'EntityName',
    'Auction Code': 'AuctionCode',
    'Payment Date and Time': 'Payment Date and Time',
    'MerchantTxnID': 'MerchantTxnId',
    'Transaction ID/Pay2Corp ID': 'transactionId',
    'Amount': 'Amount',
    'Bidder Name': 'Bidder Name',
    'Email Id': 'Email Id',
    'Auction Status':'Auction Status',
    'Transaction Status':'Transaction Status',
    'Approval Status':'Approval Status',
    'Property': 'Property',
    'Item Selection Method':'Item Selection Method',
    'Payment Mode':'Payment Mode'

};

function formatDate(date) {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function FetchReports() {

    // console.log(selectedMIS.value.name)

    if(selectedMIS.value.name == "H1 MIS Report") {
        // console.log("Inside H1 MIS Report")
        FetchH1MISReports();
    } else if (selectedMIS.value.name == "EMD MIS Report"){
        // console.log("Inside EMD MIS Report")
        FetchEMDMISReports();
    }
}

function FetchEMDMISReports() {
    // Check if both dates are selected and end date is not null
    if (dates.value[0] && dates.value[1] !== null) {
        new MQL()
            .useManagementServer()
            .setActivity("r.[FetchGlobalEMDMISReports]")
            .setData({ toDate: formatDate(dates.value[0]), fromDate: formatDate(dates.value[1]),entityId:selectedEntity.value.entityId })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("FetchGlobalEMDMISReports", true)
                if (rs.isValid("FetchGlobalEMDMISReports")) {
                    json_data.value = res.result.fetchEMDReports;
                    // console.log("json_data", json_data.value);
                    MISFileName.value = "EMD_MIS_Report"
                } else {
                    rs.showErrorToast("FetchGlobalEMDMISReports")
                }
            });
    }
}

function FetchH1MISReports() {
    // Check if both dates are selected and end date is not null
    if (dates.value[0] && dates.value[1] !== null) {
        new MQL()
            .useManagementServer()
            .setActivity("r.[FetchGlobalH1MISReports]")
            .setData({ toDate: formatDate(dates.value[0]), fromDate: formatDate(dates.value[1]),entityId:selectedEntity.value.entityId })
            .fetch()
            .then(rs => {
                let res = rs.getActivity("FetchGlobalH1MISReports", true)
                if (rs.isValid("FetchGlobalH1MISReports")) {
                    json_data.value = res.result.fetchH1MISReport;
                    // console.log("json_data", json_data.value);
                    MISFileName.value = "H1_MIS_Report"
                } else {
                    rs.showErrorToast("FetchGlobalH1MISReports")
                }
            });
    }
}

function fetchEntityName() {
    
    
					// Automatically generated
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

watch(selectedMIS, (newValue) => {

 selectedEntity.value=undefined
 dates.value=[new Date(),new Date()]
 json_data.value = undefined

  })

  watch(selectedEntity, (newValue) => {

 dates.value=[new Date(),new Date()]
 json_data.value = undefined

  })


onMounted(() => {
    fetchEntityName()
})

</script>