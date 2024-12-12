
<template>
    <div>
    <div>
        <Dropdown 
        v-model="selectedOrg" 
        :options="orgs" 
        optionLabel="name" 
        placeholder="Select Org" 
        @change="selectedOrgFunc(selectedOrg.id)" />
    </div>

    <div>
            <label for="percent">Total EMI Percent </label>
            <InputNumber v-model="totalEMIPercent" inputId="percent" suffix="%" showButtons :min="0" :max="100" />
        </div>

        <div>
            <label for="startDate">Select Start Date for Payments </label>
        <Dropdown 
        id="startDate"
        v-model="selectedStartDate" 
        :options="startDateList" 
        optionLabel="name" 
        placeholder="Select Start Date" />
    </div>

        <Button label="Add EMI" @click="visible=true" />

        <Dialog v-model:visible="visible" modal header="ADD EMI" :style="{ width: '25rem' }">
            <span ><b>EMI Payment {{ emiDataList.length+1 }}</b></span>
            <div >
                <label for="emiName" >EMI Name</label>
                <InputText id="emiName" v-model="emiData.emiName" autocomplete="off" />
            </div>
            <div >
                <label for="emiPercent" >EMI Percent</label>
                <InputNumber id="emiPercent" v-model="emiData.emiPercent" inputId="percent" prefix="%" showButtons :min="0" :max="100" />
            </div>
            <div >
                
                <label for="emiPeriod" >EMI Period</label>
                <InputNumber id="emiPeriod" v-model="emiData.emiPeriod" :suffix=periodSuffix showButtons />
        <Dropdown 
        v-model="selectedTimeType" 
        :options="timeType" 
        optionLabel="name" 
        placeholder="Select" 
        @change="selectedTimeTypeFunc(selectedTimeType)" /> 
    
            </div>
            <div >
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="saveEMIData()"></Button>
            </div>
        </Dialog>
    
    <div>
        <ProgressBar :value="10"></ProgressBar>
    </div>


    <div class="table-custom">
    <DataTable :value="emiDataList" showGridlines >
            <Column field="emiName" header="EMI Name"></Column>
            <Column field="emiPercent" header="EMI Percent"></Column>
            <Column field="emiPeriod" header="EMI Period"></Column>
            <Column field="emiPeriodType" header="EMI Period Type"></Column>
        </DataTable>
        </div>

        <Button type="button" label="Save EMI Policy" @click="saveEMIPolicy()"></Button>

</div>
</template>

<script setup>
import { ref } from "vue";
import { login } from "../../store/modules/login.js";
import Dropdown from 'primevue/dropdown';

import InputText from 'primevue/inputtext';

import InputNumber from 'primevue/inputnumber';

import ProgressBar from 'primevue/progressbar';

import Button from 'primevue/button';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
const loginStore = login()
let visible=ref(false)
let periodSuffix=ref()
const selectedOrg = ref();
let emiDataList=ref([])
let emiData = ref({
    emiName: '',
    emiPercent: '',
    emiPeriod:'',
    emiPeriodType:''
    });

let totalEMIPercent=ref();
const orgs = ref([
    { name: 'DULB', id: 'dulb' }
]);

const selectedTimeType = ref();
const timeType = ref([
    { name: 'days', id: '1' },
    { name: 'hours', id: '2' }
]);

const selectedStartDate = ref();
const startDateList = ref([
    { name: 'Bid Acceptance date', id: '1' }
]);

function selectedOrgFunc(val) {
    console.log("Selected Id is -> "+val)
}

function selectedTimeTypeFunc(val) {
    console.log("Selected Id is -> "+val)
    periodSuffix.value=val.name
    emiData.value.emiPeriodType=val.name
}

function saveEMIData() {
    emiDataList.value.push({ ...emiData.value,"emiNumber":emiDataList.value.length+1,"createdBy":loginStore.loginId });
    console.log(emiDataList.value)
    visible.value = false;
}

function saveEMIPolicy() {

			new MQL()
			.setActivity("r.[InsertEMIPolicy]")
			.setData({
                "createdBy":loginStore.loginId,
                "organizationId":loginStore.organizationId,
                "startDate":"BID_ACCEPTANCE_DATE",
                "emiDataList" : emiDataList.value
            })
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("InsertEMIPolicy",true)
			if (rs.isValid("InsertEMIPolicy")) {
			} else
			 { 
			rs.showErrorToast("InsertEMIPolicy")
			}
			})
			

}

</script>