<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Modify Challan</h2>
            </div>
        </div>
        <Toast/>
        <div class="card">
            <div class="form-grid">
                <div class="col-span-full md:col-span-6 xl:col-span-4">
                    <div class="fm-group">
                        <label class="fm-label" for="clientTransactionId">Client Transaction ID</label>
                        <div class="fm-inner">
                            <!-- <InputText id="clientTransactionId" v-model="challanDetails.clientTransactionId"  @change="onChange"/> -->
                            <Dropdown 
                                    v-model="challanDetails.clientTransactionId" option-value="clientTransactionId"
                                    variant="filled" :options="clientTransacId" optionLabel="clientTransactionId"
                                    placeholder="Select Client Transaction Id" 
                                    @change="onChange"
                                    />
                        </div>
                        <!-- <div id="clientTransactionId-help" class="fm-info">Enter Client Transaction ID</div> -->
                        <div v-if="$v.challanDetails.clientTransactionId.$error" class="fm-error">
                        {{ $v.challanDetails.clientTransactionId.$errors[0].$message }}
                    </div>
                    </div>
                </div>
                <div class="col-span-full md:col-span-6 xl:col-span-4">
                    <div class="fm-group">
                        <label class="fm-label" for="challanModificationRequestId">Challan Modification Request ID</label>
                        <div class="fm-inner">
                            <InputText id="challanModificationRequestId" v-model="challanDetails.challanModificationRequestId" readonly />
                        </div>
                        <!-- <div id="challanModificationRequestId-help" class="fm-info">Enter your challanModificationRequestId</div> -->
                        <div v-if="$v.challanDetails.challanModificationRequestId.$error" class="fm-error">
                        {{ $v.challanDetails.challanModificationRequestId.$errors[0].$message }}
                    </div>
                    </div>
                </div>
                <div class="col-span-full md:col-span-6 xl:col-span-4">
                    <div class="fm-group">
                        <label class="fm-label" for="challanNumber">Challan No./Virtual Account No</label>
                        <div class="fm-inner">
                            <InputText id="challanNumber" v-model="challanDetails.challanNumber"  readonly/>
                        </div>
                        <!-- <div id="challanNumber-help" class="fm-info">Enter your full name</div> -->
                        <div v-if="$v.challanDetails.challanNumber.$error" class="fm-error">
                        {{ $v.challanDetails.challanNumber.$errors[0].$message }}
                    </div>
                    </div>
                </div>
                <div class="col-span-full md:col-span-6 xl:col-span-4">
                    <div class="fm-group">
                        <label class="fm-label" for="challanAmount">Challan Amount</label>
                        <div class="fm-inner">
                            <!-- <Dropdown v-model="challanDetails.districtName" option-value="districtName" :options="districtMaster" optionLabel="districtName" placeholder="Select challanAmount" /> -->
                        </div><InputText id="fullName" v-model="challanDetails.challanAmount" readonly/>
                        <!-- <div id="fullName-help" class="fm-info">Select your challanAmount</div> -->
                        <div v-if="$v.challanDetails.challanAmount.$error" class="fm-error">
                        {{ $v.challanDetails.challanAmount.$errors[0].$message }}
                    </div>
                    </div>
                </div>
                <div class="col-span-full md:col-span-6 xl:col-span-4">
                    <div class="fm-group">
                        <label class="fm-label" for="calendar-12h">Challan Expiry Date</label>
                        <div class="fm-inner">
                        <Calendar
                            id="calendar-24h"
                            v-model="challanDetails.challanExpiryDate"
                            showTime
                            dateFormat="yy/mm/dd"
                            hourFormat="24"
                            :minDate="minDate"
                            :showIcon="true"
                        />
                        <!-- <div id="fullName-help" class="fm-info">Select your Entity</div> -->
                        <span v-if="$v.challanDetails.challanExpiryDate.$error" class="fm-error">{{
                            $v.challanDetails.challanExpiryDate.$errors[0].$message
                        }}</span>
                    </div>
                    </div>
                </div>
                <div class="col-span-full md:col-span-6 xl:col-span-4">
                    <div class="fm-group">
                        <label class="fm-label" for="calendar-12h">Request Modification Date & Time</label>
                        <div class="fm-inner">
                            <Calendar
                                id="calendar"
                                v-model="challanDetails.requestModificationDate"
                                :showTime="true"
                                dateFormat="yy/mm/dd"
                                hourFormat="24"
                                :showIcon="true"
                                readonly
                            />
                            </div>
                        <!-- <div id="fullName-help" class="fm-info">Select your organization</div> -->
                        <span v-if="$v.challanDetails.requestModificationDate.$error" class="fm-error">{{
                            $v.challanDetails.requestModificationDate.$errors[0].$message
                        }}</span>
                    </div>
                </div>
                <div class="fm-action">
                    <Button @click="modifyChallan" label="Submit"></Button>
                    <Button @click="reloadPage" severity="danger" label="Cancel"></Button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>

// Importing required modules and components

import { ref, onMounted, computed } from 'vue';
import MQL from '@/plugins/mql.js';
import Button from 'primevue/button';
import { useVuelidate } from '@vuelidate/core';
import { useToast } from "primevue/usetoast";
import { helpers, required } from '@vuelidate/validators'
import Calendar from "primevue/calendar";
import axios from 'axios';
import moment from "moment";
import Dropdown from 'primevue/dropdown';

// Data variables declaration

    const clientTransacId = ref([]);

    const challanDetails = ref( {
        clientTransactionId: '' ,
        challanModificationRequestId: '',
        challanNumber: '',
        challanAmount: '',
        challanExpiryDate: '',
        requestModificationDate:''
    });

    const toast = useToast();
    const minDate = ref();
    const entityWTCode = ref('');

    const responseDetails = ref({
        transactionFor : '',
        additionalParam1 : '',
        additionalParam2 : '',
        additionalParam3 : '',
        additionalParam4 : '',
        additionalParam5 : '',
        transactionDatetime : '',
        challanExpiryDate : '',
        walletUserCode : '',
        transactionId : '',
        transactionAmount : '',
        walletPaymentMode : '',
        walletTransactionId : '',
        challanTransactionId : '',
        walletTransactionStatus : '',
        walletTransactionDatetime : ''
    });

    const upsCtrnPrefix = ref('');

    // Function to perform modify challan operation


    // Function to perform modify challan operation by calling the UPS server API and updating the challan details in database
    const modifyChallan = async () => {
        const result = await $v.value.$validate();
        if (result) {
            console.log('Validation Passed');
            console.log('modifyChallan');
            console.log(challanDetails.value, "challanDetails");
            console.log(moment(challanDetails.value.challanExpiryDate, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY HH:mm"), "challanExpiryDate");
            console.log(moment(challanDetails.value.requestModificationDate).format("DD/MM/YYYY HH:mm:ss"), "requestModificationDate");

        let requestData = {
          'txn-id': upsCtrnPrefix.value + challanDetails.value.clientTransactionId,
          'req-id': challanDetails.value.challanModificationRequestId,
          'req-dt': moment(challanDetails.value.requestModificationDate).format("DD/MM/YYYY HH:mm:ss"),
          'challan-txn-id': challanDetails.value.challanNumber,
          'txn-amount': challanDetails.value.challanAmount,
          'expiry-dt': moment(challanDetails.value.challanExpiryDate, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY HH:mm"),  
          'modifychallan-code': 2,
          'entityWTCode': entityWTCode.value
        }
        axios.post (
          '/ups-server/o/modifychallan',
          requestData
        ).then((response) => {
            console.log('Response from server after modification:', response.data)
            if (response.data === 'Challan Modified Successfully') {
            toast.add({
                severity: "success",
                summary: "Success",
                detail: "Challan Modified Successfully",
                life: 3000,
                });
                updateModificationStatus();
                updateChallanModificationDetails(response.data, moment(challanDetails.value.challanExpiryDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"));
            } else if (response.data === 'Challan Rejected') {
            toast.add({
                severity: "error",
                summary: "Error",
                detail: "Challan Modification Rejected",
                life: 3000,
                });
                updateChallanModificationDetails(response.data, moment(responseDetails.value.challanExpiryDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"));
            } else if (response.data === 'Challan Reject, Already Paid, In case amount has been paid') {
            toast.add({
                severity: "error",
                summary: "Error",
                detail: "Challan Reject, challan amount Already Paid",
                life: 3000,
                });
                console.log('Challan Reject, Already Paid, In case amount has been paid', response.data, "challanExpiryDate", moment(responseDetails.value.challanExpiryDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"));
                updateChallanModificationDetails(response.data, moment(responseDetails.value.challanExpiryDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"));
            } 
            else {
                console.log('Validation Failed');
                console.log('modifyChallan Failed');
                toast.add({
                severity: "error",
                summary: "Error",
                detail: "something went wrong, please try again later",
                life: 3000,
                });
                console.log('something went wrong, please try again later ', response.data, "challanExpiryDate", moment(responseDetails.value.challanExpiryDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"), "responseDetails", responseDetails.value);   
                updateChallanModificationDetails(response.data, moment(responseDetails.value.challanExpiryDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"));
            }
        }).catch((error) => {
                console.log('Error:', error);
                toast.add({
                severity: "error",
                summary: "Error",
                detail: "Error in modifying challan, please try again later", 
                life: 3000,
                });
            });
            } else {
                console.log('Validation Failed');
                console.log('modifyChallan Failed');
                toast.add({
                severity: "error",
                summary: "Error",
                detail: "please fill all the required fields properly",
                life: 3000,
                });
        }
    }


    // Function to reload the page on cancel button click event
    const reloadPage = () => {
        window.location.reload();
    }


    // Function to handle change event on client transaction id input field and fetch response details from database
    const onChange = (event) => {
        challanDetails.value.challanModificationRequestId = ''
        challanDetails.value.challanNumber = ''
        challanDetails.value.challanAmount = ''
        challanDetails.value.challanExpiryDate = ''
        console.log('Value changed:', event.value);
        console.log("clientTransactionId:- ", upsCtrnPrefix.value + "_" + event.value);
        fetchResponseDetails(event.value);
        fetchEntityWTCode(event.value);
        challanDetails.value.challanModificationRequestId = createChallanModificationRequestId();
    };
    

    // Function to fetch response details from database based on client transaction id
    function fetchResponseDetails(clientTransactionId) {
        new MQL()
        .useManagementServer()
        .setActivity("r.[FetchResponseDetails]")
        .setData({
            clientTransactionId: clientTransactionId
        })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity("FetchResponseDetails", true);
            if (rs.isValid("FetchResponseDetails")) {
                parseResponse(res.result.response);
                console.log(responseDetails.value, "responseDetails");
                console.log(challanDetails.value, "challanDetails");
            } else {
                rs.showErrorToast("FetchResponseDetails");
            }
        });
    }


    // Function to fetch entity WT code from database based on client transaction id
    function fetchEntityWTCode(clientTransactionId) {
        new MQL()
        .useManagementServer()
        .setActivity("r.[FetchEntityWTCode]")
        .setData({
            clientTransactionId: clientTransactionId
        })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity("FetchEntityWTCode", true);
            if (rs.isValid("FetchEntityWTCode")) {
                console.log(res.result.entityWTCode, " -:entityWTCode");
                entityWTCode.value = res.result.entityWTCode;
            } else {
                rs.showErrorToast("FetchEntityWTCode");
            }
        });
    }


    // Function to create challan modification request id with timestamp and random number appended to it 
    function  createChallanModificationRequestId (length = 16){
        const timestamp = Date.now().toString(36);
        const randomPart = Math.random().toString(36).substr(2, length - timestamp.length);
        return timestamp + randomPart;
    }


    // Function to parse the response from database and populate the responseDetails object with the parsed parameters 
    function parseResponse(response) {
        // Split the response by '|' to get individual parameters
        const paramsArray = response.split('|');
        
        // Create an object to hold the parsed parameters
        const paramsObject = {};

        // Iterate over each parameter and populate the paramsObject
        paramsArray.forEach(param => {
            const [key, value] = param.split('=');
            if (key && value !== undefined) {
                paramsObject[key.trim()] = value.trim();
            }
        });

        // Map the parsed parameters to the responseDetails object
        responseDetails.value = {
            transactionFor: paramsObject['txn-for'] || '',
            additionalParam1: paramsObject['additional-param1'] || '',
            additionalParam2: paramsObject['additional-param2'] || '',
            additionalParam3: paramsObject['additional-param3'] || '',
            additionalParam4: paramsObject['additional-param4'] || '',
            additionalParam5: paramsObject['additional-param5'] || '',
            transactionDatetime: paramsObject['txn-datetime'] || '',
            challanExpiryDate: paramsObject['challan-expiry-date'] || '',
            walletUserCode: paramsObject['wallet-user-code'] || '',
            transactionId: paramsObject['txn-id'] || '',
            transactionAmount: paramsObject['txn-amount'] || '',
            walletPaymentMode: paramsObject['wallet-payment-mode'] || '',
            walletTransactionId: paramsObject['wallet-txn-id'] || '',
            challanTransactionId: paramsObject['challan-txn-id'] || '',
            walletTransactionStatus: paramsObject['wallet-txn-status'] || '',
            walletTransactionDatetime: paramsObject['wallet-txn-datetime'] || ''
        };

        challanDetails.value.challanNumber = responseDetails.value.challanTransactionId;
        challanDetails.value.challanAmount = responseDetails.value.transactionAmount;
        challanDetails.value.challanExpiryDate = responseDetails.value.challanExpiryDate;
        minDate.value = new Date(moment(challanDetails.value.challanExpiryDate, "DD-MM-YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"));
        // minDate.value = moment(challanDetails.value.challanExpiryDate, "DD-MM-YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss")
    }

    // Function to fetch custom param from database
    function fetchCustomParam() {
        new MQL()
        .useManagementServer()
        .setActivity("r.[FetchUPSCTRNPrefix]")
        .setData({
            customParamKey: "UPS_CTRN_PREFIX"
        })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity("FetchUPSCTRNPrefix", true);
            if (rs.isValid("FetchUPSCTRNPrefix")) {
                console.log(res.result.upsCtrnPrefix, " -:customParam");
                upsCtrnPrefix.value = res.result.upsCtrnPrefix;
            } else {
                rs.showErrorToast("FetchUPSCTRNPrefix");
            }
        });
    }

    // Function to update challan modification details in database
    function updateChallanModificationDetails(responseData, expiryDate) {
        new MQL()
        .useManagementServer()
        .setActivity("r.[UpdateChallanModificationDetails]")
        .setData({
            response: responseData,
            expiryDate: expiryDate,
            challanModificationRequestId: challanDetails.value.challanModificationRequestId,
            clientTransactionId: challanDetails.value.clientTransactionId
        })
        .fetch()
        .then((rs) => {
            if (rs.isValid("UpdateChallanModificationDetails")) {
                console.log('Challan Modification Details Updated Successfully');
            } else {
                rs.showErrorToast("UpdateChallanModificationDetails");
            }
        });
    }

    // Function to update modification status in database
    function updateModificationStatus() {
        new MQL()
        .useManagementServer()
        .setActivity("r.[UpdateModificationStatus]")
        .setData({
            clientTransactionId: challanDetails.value.clientTransactionId
        })
        .fetch()
        .then((rs) => {
            if (rs.isValid("UpdateModificationStatus")) {
                console.log('Modification Status Updated Successfully');
                reloadPage();
            } else {
                rs.showErrorToast("UpdateModificationStatus");
            }
        });
    }

    function fetchClientTransactionId() {
        new MQL()
        .useManagementServer()
        .setActivity("r.[FetchClientTransactionId]")
        .setData({
            paymentGatewayCodeName: "Challan",
            statusCode: "TRANSACTION_AWATING"
        })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity("FetchClientTransactionId", true);
            if (rs.isValid("FetchClientTransactionId")) {
                console.log(res.result.clientTransactionId, " -:clientTransactionId");
                clientTransacId.value = res.result;
                console.log(clientTransacId.value, "clientTransacId");
            } else {
                rs.showErrorToast("FetchClientTransactionId");
            }
        });
    }

    // Function to check the expiry date validation use in vuelidate rules
    function checkDates(){
        if (moment(responseDetails.value.challanExpiryDate, "DD-MM-YYYY HH:mm").isSameOrAfter(moment(challanDetails.value.challanExpiryDate, "DD-MM-YYYY HH:mm"))) {
            //console.log("Inside rules vali date check");
            console.log("Expiry Date is same: ","responseDetails: ", moment(responseDetails.value.challanExpiryDate, "DD-MM-YYYY HH:mm"), " challanDetails: ", moment(challanDetails.value.challanExpiryDate, "DD-MM-YYYY HH:mm"));
            return false; // Dates are not valid
        }
            console.log("Expiry Date is not same: ","responseDetails: ", moment(responseDetails.value.challanExpiryDate, "DD-MM-YYYY HH:mm"), " challanDetails: ", moment(challanDetails.value.challanExpiryDate, "DD-MM-YYYY HH:mm"));
            return true; // Dates are valid
    };



    // Vuelidate rules for form validation

    const rules = computed(() => ({
        challanDetails: {
        clientTransactionId: {
            required: helpers.withMessage('Client Transaction Id is required', required)
        },
        challanModificationRequestId: {
            required: helpers.withMessage('Challan Modification Request Id is required', required)
        },
        challanNumber: {
            required: helpers.withMessage('Challan Number is required', required)
        },
        challanAmount: {
            required: helpers.withMessage('Challan Amount  is required', required)
        },
        challanExpiryDate: {
            required, validator: helpers.withMessage('Challan Expiry Date should not be same or before of current date', checkDates)
        },
        requestModificationDate: {
            required: helpers.withMessage('Request Modification Date is required', required)
        }
        }
    }));

const $v = useVuelidate(rules, { challanDetails });





// Lifecycle hook method

onMounted(() => {
    //   challanDetails.value.requestModificationDate =  new Date();

      const intervalId = setInterval(() => {
        challanDetails.value.requestModificationDate = new Date();
      }, 1000);
        fetchClientTransactionId();
      fetchCustomParam();
}) 
</script>
