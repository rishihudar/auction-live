<template>
    <div>
        <Toast />
        <div>
            <Dropdown 
                v-model="selectedOrg" 
                :options="orgs" 
                optionLabel="name" 
                placeholder="Select Org"  
            />
        </div>
        <div v-if="$v.selectedOrg.$error" class="fm-error">
        {{ $v.selectedOrg.$errors[0].$message }}
      </div>

        <div>
            <label for="percent">Total Payment Percent </label>
            <InputNumber 
                v-model="totalEMIPercent" 
                inputId="percent" 
                suffix="%" 
                showButtons 
                :min="0" 
                :max="100" 
            />
        </div>
        <div v-if="$v.totalEMIPercent.$error" class="fm-error">
        {{ $v.totalEMIPercent.$errors[0].$message }}
      </div>

      <div >
        <label for="isTotal">Is 100% </label>
        <Checkbox inputId="isTotal"  v-model="isTotal" :binary="true" />
    </div>

        <div>
            <label for="startDate">Select Start Date for Payments </label>
            <Dropdown 
                id="startDate"
                v-model="selectedStartDate" 
                :options="startDateList" 
                optionLabel="name" 
                placeholder="Select Start Date" 
            /> 
        </div>
        <div v-if="$v.selectedStartDate.$error" class="fm-error">
        {{ $v.selectedStartDate.$errors[0].$message }}
      </div>

        <Button label="Add Payment" @click="visible=true" />

        <Dialog v-model:visible="visible" modal header="ADD Payment" :style="{ width: '25rem' }">
            <span><b>Payment {{ emiDataList.length + 1 }}</b></span>
            <div>
                <label for="emiName">Payment Name</label>
                <InputText id="emiName" v-model="emiData.emiName" autocomplete="off" />
                <div v-if="$vEmiRules.emiData.emiName.$error" class="fm-error">
        {{ $vEmiRules.emiData.emiName.$errors[0].$message }}
      </div>
            </div>
            <div>
                <label for="emiPercent">Payment Percent</label>
                <InputNumber 
                    id="emiPercent" 
                    v-model="emiData.emiPercent" 
                    suffix="%" 
                    showButtons 
                    :min="0" 
                    :max="100" 
                />
                <div v-if="$vEmiRules.emiData.emiPercent.$error" class="fm-error">
        {{ $vEmiRules.emiData.emiPercent.$errors[0].$message }}
      </div>
            </div>
            <div>
                <label for="emiPeriod">Payment Period</label>
                <InputNumber 
                    id="emiPeriod" 
                    v-model="emiData.emiPeriod" 
                    :suffix="periodSuffix" 
                    showButtons 
                />
                <div v-if="$vEmiRules.emiData.emiPeriod.$error" class="fm-error">
        {{ $vEmiRules.emiData.emiPeriod.$errors[0].$message }}
      </div>
                <Dropdown 
                    v-model="selectedTimeType" 
                    :options="timeType" 
                    optionLabel="name" 
                    placeholder="Select" 
                    @change="selectedTimeTypeFunc(selectedTimeType)" 
                />
                <div v-if="$vEmiRules.emiData.emiPeriodType.$error" class="fm-error">
        {{ $vEmiRules.emiData.emiPeriodType.$errors[0].$message }}
      </div>
            </div>
            <div>
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="saveEMIData()"></Button>
            </div>
        </Dialog>

        <div>
            <ProgressBar :value="10"></ProgressBar>
        </div>

        <div class="table-custom">
            <DataTable 
                v-model:editingRows="editingRows" 
                :value="emiDataList" 
                showGridlines 
                editMode="row" 
                @row-edit-save="onRowEditSave"
            >
                <Column field="emiName" header="Payment Name">
                    <!-- <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template> -->
                </Column>
                <Column field="emiPercent" header="Payment Percent"></Column>
                <Column field="emiPeriod" header="Payment Period">
                    <!-- <template #editor="{ data, field }">
                        <InputText type="number" v-model="data[field]" />
                    </template> -->
                </Column>
                <Column field="emiPeriodType" header="Payment Period Type">
                    <!-- <template #editor="{ data, field }">
                        <Dropdown
                    v-model="data[field]" 
                    :options="timeType" 
                    optionLabel="name" 
                    optionValue="name"
                    placeholder="Select" 
                    >
                </Dropdown> 
                    </template> -->
                </Column>
                <!-- <Column 
                    :rowEditor="true" 
                    style="width: 10%; min-width: 8rem" 
                    bodyStyle="text-align:center" 
                    header="Edit">
                </Column> -->
                <!-- Delete Button Column -->
                <Column header="Delete" bodyStyle="text-align:center; width: 10%;">
                    <template #body="{ data }">
                        <Button 
                            @click="deleteRowData(data)"
                        ><fa-trash-can></fa-trash-can></Button>
                    </template>
                </Column>
            </DataTable>
        </div>

        <Button type="button" label="Save Payment Policy" @click="saveEMIPolicy()"></Button>

        <div>
            <b>Current Payment Policy Applied</b>
        </div>

        <div class="table-custom">
            <DataTable 
                :value="currPaymentPolicy" 
                showGridlines
            >
            <Column field="startDate" header="Start Date"></Column>
            <Column field="policyStartDate" header="Policy Start Date"></Column> 
            <Column field="createdBy" header="Created By"></Column>   
            </DataTable>
        </div>

        <div class="table-custom">
            <DataTable 
                :value="currPaymentPolicyDetails" 
                showGridlines
            >
            <Column field="paymentName" header="Payment Name"></Column>
            <Column field="paymentNumber" header="Payment Number"></Column> 
            <Column field="paymentPercentage" header="Payment Percent"></Column> 
            <Column field="paymentPeriod" header="Payment Period"></Column> 
            <Column field="paymentPeriodType" header="Payment Period Type"></Column>    
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { ref,computed,watch,onMounted} from "vue";
import MQL from "@/plugins/mql.js";
import { login } from "../../store/modules/login.js";
import faTrashCan from '../../../assets/icons/trash-can.svg';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import ProgressBar from 'primevue/progressbar';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, numeric, minValue } from "@vuelidate/validators";
import { useToast } from "primevue/usetoast";

let currPaymentPolicy=ref()
let currPaymentPolicyDetails=ref()
let isTotal=ref(false)
const toast = useToast();
const editingRows = ref([]);
const loginStore = login();
let visible = ref(false);
let periodSuffix = ref();

const selectedOrg = ref();
let emiDataList = ref([]);

let emiData = ref({
    emiName: '',
    emiPercent: '',
    emiPeriod: '',
    emiPeriodType: '',
    emiNumber:''
});

let totalEMIPercent = ref();
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

const rules = computed(() =>( {
    selectedOrg: { required },
    totalEMIPercent: { required },
    selectedStartDate: { required }

}));

const $v = useVuelidate(rules, { selectedOrg, totalEMIPercent, selectedStartDate });

const emiRules = computed(() =>( {
    emiData: { 
        emiName : {required},
        emiPercent : {required},
        emiPeriodType : {required},
        emiPeriod : {required}
     }

}));

const $vEmiRules = useVuelidate(emiRules, { emiData });

watch(isTotal,async(newValue,oldValue) => {
    // console.log("Old value is "+oldValue+" new value is "+newValue)
    if(newValue) {
        totalEMIPercent.value = 100;
    }
})


function selectedTimeTypeFunc(val) {
    // console.log("Selected Id is -> " + val);
    periodSuffix.value = val.name;
    emiData.value.emiPeriodType = val.name;
}

function saveEMIData() {

    const validationEmiRules = $vEmiRules.value.$validate();
    if ($vEmiRules.value.$error) {
        return 
    }

    let sumEmiPercent = emiDataList.value.reduce((sum, item) => sum + item.emiPercent, 0)+emiData.value.emiPercent;
    if (sumEmiPercent > totalEMIPercent.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Payment Percentage exceeds the limit ', life: 3000 });
        return
    }

    emiDataList.value.push({ 
        ...emiData.value, 
        createdBy: loginStore.loginId 
    });
    // console.log(emiDataList.value);
    visible.value = false;
}

function saveEMIPolicy() {

    const validation = $v.value.$validate();
    if ($v.value.$error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please fill all fields', life: 3000 });
        return 
    }
    
    let sumEmiPercent = emiDataList.value.reduce((sum, item) => sum + item.emiPercent, 0);
    if (sumEmiPercent > totalEMIPercent.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Payment Percentage exceeds the limit ', life: 3000 });
        return
    }

    if(sumEmiPercent==totalEMIPercent.value) {

    

    emiDataList.value.forEach((item,index) => {
        item.emiNumber = index+1;
    });
    // console.log(emiDataList.value)

    new MQL()
        .setActivity("r.[InsertEMIPolicy]")
        .useManagementServer()
        .setData({
            createdBy: loginStore.loginId,
            organizationId: loginStore.organizationId,
            startDate: "BID_ACCEPTANCE_DATE",
            emiDataList: emiDataList.value,
            isTotal:isTotal.value
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("InsertEMIPolicy", true);
            if (rs.isValid("InsertEMIPolicy")) {
                // console.log("Policy saved successfully!");
                toast.add({ severity: 'success', summary: 'Success', detail: 'New Payment Policy Created', life: 3000 });
                selectedOrg.value=null;
                totalEMIPercent.value=null;
                isTotal.value=null;
                emiDataList.value.length=0;
            } else {
                rs.showErrorToast("InsertEMIPolicy");
            }
        });

    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Added Payment Percentage does not match with Total Payment Percentage ', life: 3000 });
        return
    }
}

const onRowEditSave = (event) => {
    let { newData, index } = event;
    emiDataList.value[index] = newData;
};

const deleteRowData = (data) => {
    const index = emiDataList.value.findIndex((item) => item === data);
    if (index !== -1) {
        emiDataList.value.splice(index, 1);
    }
};

function fetchLastPolicy() {
    return new Promise((resolve) => {
			new MQL()
            .useManagementServer()
			.setActivity("r.[FetchLatestEMIPolicy]")
			.setData({})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchLatestEMIPolicy",true)
			if (rs.isValid("FetchLatestEMIPolicy")) {

                currPaymentPolicy.value = res.result.fetchEmiPolicyId;
                currPaymentPolicyDetails.value = res.result.fetchEmiDetails;

                resolve();
			} else
			 { 
			rs.showErrorToast("FetchLatestEMIPolicy")
			}
			})
        })
			
}

onMounted(() => {

    fetchLastPolicy();
  
});

</script>
