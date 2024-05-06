<template>
    <div>
        <div class="fm-group">
            <label class="fm-label" for="horizontal-buttons">Number of Days</label>
            <InputNumber v-model="noOfDays" placeholder="Enter number greater than one" showButtons :step="1" :disabled="disabled">
                <template #incrementbuttonicon>+</template>
                <template #decrementbuttonicon>-</template>
            </InputNumber>
            <div v-if="$v.noOfDays.$error" class="fm-error">
                {{ $v.noOfDays.$errors[0].$message }}
            </div>
        </div>

        <!-- <div>
              <InputText
                v-model="firstPaymentPercentage"
                placeholder="Enter First Payment Percentage"
                :class="{ 'p-invalid': $v.firstPaymentPercentage.$error }"
              />
            </div>
            <div v-if="$v.firstPaymentPercentage.$error" class="fm-error">
              {{ $v.firstPaymentPercentage.$errors[0].$message }}
            </div> -->

        <div class="table-custom">
            <!-- <table>
                <thead>
                    <tr>
                        <th>ROUND NUMBER</th>
                        <th>ALLOCATED PROPERTY</th>
                        <th>HIGHEST QUOTED VALUE (₹)</th>
                        <th>1st payment TO BE PAID (₹)</th>
                        <th>ELIGIBLE ?</th>
                        <th>INTENT_LETTER</th>
                        <th>ALLOTMENT LETTER</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in resultList" :key="index">
                        <tr>
                            <td>{{ item.roundNumber }}</td>
                            <td>{{ item.allocatedProperty }}</td>
                            <td>{{ item.highestQuotedValue }}</td>
                            <td>25% or 15%</td>
                            <td>
                                    <RadioButton inputId="accept" value="Accept" />
                                    <label for="accept">Accept</label>
                            </td>
                            <td>Intent letter</td>
                            <td>intent letter</td>
                        </tr>
                    </template>
                </tbody>
            </table> -->
            <!-- {{ resultList }}  -->
            <DataTable :value="resultList" dataKey="id" :disabled="disabled">
                <Column field="roundNumber" header="ROUND NUMBER"></Column>
                <Column field="allocatedProperty" header="ALLOCATED PROPERTY"></Column>
                <Column field="highestQuotedValue" header="HIGHEST QUOTED VALUE (₹)"></Column>
                <Column field="firstPayment" header="1st payment TO BE PAID (₹)"></Column>
                <Column header="ELIGIBLE ?">   
                    <template #body="rowData ">
                        <input type="checkbox" :checked="rowData.data.accepted" id="myCheck" @click="updateAccepted(rowData)" :disabled="disabled">
                    </template>
                </Column>
                <Column header="INTENT_LETTER">
                    <template #body="slotProps">
                        <span>Intent letter</span>
                    </template>
                    </Column>
                    <Column header="ALLOTMENT LETTER">
                    <template #body="slotProps">
                        <span>intent letter</span>
                    </template>
                </Column>
            </DataTable>
        </div>

        <div class="table-exp-action centered">
            <Button label="Submit" @click="submitForm" :disabled="disabled" />
        </div>
        <div class="table-exp-notice table-exp-notice-danger mt-4 text-center">
            <strong>Note:</strong> <span>First payment is calculated as = (Highest quoted value * First Payment Percentage) - EMD amount</span>
        </div>
    </div>
</template>

<script setup>


import Checkbox from 'primevue/checkbox';

import { computed, ref, onMounted,watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
    required,
    minLength,
    numeric
} from "@vuelidate/validators";
import MQL from "@/plugins/mql.js";
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';
import { storeToRefs } from 'pinia';
import { login } from "../../store/modules/login"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import { stringifyQuery } from 'vue-router';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: "top-right", duration: 3000 })
const props = defineProps({
    auctionId: Number
});

let auctionId = ref(props.auctionId)
const loginStore = login();
const {organizationId, entityId, loginId } = storeToRefs(loginStore);
let tick=ref()
let resultList=ref()
// let firstPaymentPercentage = ref()
const selectedRows = ref([]);

let noOfDays = ref()
let rules = computed(() => ({

    noOfDays: {
        required,
        numeric,
        minLength: minLength(1)
    }

}

))

const $v = useVuelidate(rules, { noOfDays });


let disabled=ref(false)
// let indentDays=ref()
function h1AuctionDetails() {

    // console.log("loadEntityAndOrganization" , entityId.value, organizationId.value)
    
			new MQL()
            .useManagementServer()
			.setActivity("r.[FetchH1BiddersAuctionDetails]")
			.setData({"auctionId":auctionId.value,"entityId":entityId.value})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchH1BiddersAuctionDetails",true)
			if (rs.isValid("FetchH1BiddersAuctionDetails")) {
                // resultList.value=res.result
                resultList.value = res.result.fetchH1BidderAuctionDetails.map(item => ({
  ...item,
  accepted: item.accepted === 1 ? 1 : 0
}));
                console.log("resultList is ",resultList.value)

                if(res.result.fetchH1BidderAuctionDetailsIndentDays[0].indentDays > 0) {
                    noOfDays.value=res.result.fetchH1BidderAuctionDetailsIndentDays[0].indentDays
                console.log("indentDays is ",noOfDays.value)
                    disabled.value=true
                } else {
                    disabled.value=false
                }

			} else
			 { 
			rs.showErrorToast("FetchH1BiddersAuctionDetails")
			}
			})
			
    
}

function updateAccepted(rowData) {
    // console.log(rowData)
    // console.log(resultList.value[rowData.index].accepted)
  rowData.accepted = !rowData.accepted; 
  resultList.value[rowData.index].accepted = rowData.accepted
}

function submitForm() {
    console.log("Auction id hai ",auctionId.value)
    const validation = $v.value.$validate();

    if(!$v.value.$error) {

        console.log("result list ",resultList.value)

			new MQL()
            .useManagementServer()
			.setActivity("r.[UpdateH1BidderDetails]")
			.setData({"auctionId":auctionId.value,"h1ApprovedBidders":resultList.value,"noOfDays":noOfDays.value})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("UpdateH1BidderDetails",true)
			if (rs.isValid("UpdateH1BidderDetails")) {
                disabled.value=true
                toaster.success("Successfully Updated");
			} else
			 { 
			rs.showErrorToast("UpdateH1BidderDetails")
			}
			})
			

    } else {

        toaster.error("Invalid Number of Days");

    }

}


onMounted(() => {
    h1AuctionDetails();
    // fetchH1AuctionDetails(); 
} )

</script>

