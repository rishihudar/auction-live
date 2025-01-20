<template>
  <div>
    <!-- <div class="fm-group">
      <label class="fm-label" for="horizontal-buttons">Number of Hours</label>
      <InputNumber
        v-model="noOfDays"
        placeholder="Enter number greater than 98"
        showButtons
        :step="1"
        :disabled="disabled"
      >
        <template #incrementbuttonicon>+</template>
        <template #decrementbuttonicon>-</template>
      </InputNumber>
      <div v-if="$v.noOfDays.$error" class="fm-error">
        {{ $v.noOfDays.$errors[0].$message }}
      </div>
    </div> -->

    <div class="table-custom">
      <DataTable :value="resultList" dataKey="id" :disabled="disabled">
        <Column field="roundNumber" header="ROUND NUMBER"></Column>
        <Column field="allocatedProperty" header="ALLOCATED PROPERTY"></Column>
        <Column
          field="highestQuotedValue"
          header="HIGHEST QUOTED VALUE (₹)"
        ></Column>
        <!-- <Column
          field="firstPayment"
          header="1st payment TO BE PAID (₹)"
        ></Column> -->
        <Column header="ELIGIBLE ?">
          <template #body="rowData" v-if="!disabled">
            <Dropdown
              v-model="rowData.data.approvalStatusResult"
              :options="dropdownOptions"
              placeholder="kindly select"
              optionLabel="label"
              optionValue="value"
              @change="(e) => updateAccepted(rowData, e.value,e)"
              :disabled="disabled"
            />
            <!-- <div v-if="rowData.data.approvalStatusResult === 'Reject'"> -->
            


          </template>
          
          <!-- <template #body="rowData" v-if="!disabled">
            <Dropdown
              v-model="rowData.data.approvalStatusResult"
              :options="dropdownOptions"
              placeholder="kindly select"
              optionLabel="label"
              optionValue="value"
              @change="e => updateAccepted(rowData, e.value)"
              :disabled="disabled"
              
            />
          </template> -->

          <template #body="rowData" v-else>
            {{ rowData.data.ApprovalStatus }}
            <i class="pi pi-info-circle" v-if="rowData.data.ApprovalStatus === 'Reject'"
            v-tooltip.top="rowData.data.rejectionReason"
            ></i>
            <!-- <div class="card flex flex-wrap justify-content-center gap-2">
            

            <!-- </div> -->
          </template>
        </Column>
        <Column
          header="Post Auction Payment Status"
        >
        <template #body="row">
                        <Button
                            @click="viewPaymentDetails(row.data.roundNumber)"
                            class="btn-sm"
                            label="Details"
                        />
        </template>
      </Column>
        <Column header="Bidder Documents" style="width: 5rem">
                    <template #body="row">
                        <Button
                            @click="viewDetails(row.data.roundNumber)"
                            class="btn-sm"
                            label="Details"
                        />
                    </template>
            </Column>
        <Column header="INTENT_LETTER">
          <template #body="slotProps">
            <span>Intent letter</span>
          </template>
        </Column>
        <Column header="ALLOTMENT LETTER">
          <template #body="slotProps">
            <span>Intent letter</span>
          </template>
        </Column>
      </DataTable>
    </div>
   
    <Dialog v-model:visible="showModal" modal header="Reason for Rejection" :style="{ width: '40rem' }" :closable="false">
      <div class="form-group">
        <InputText
          v-model="rejectionReason"
          placeholder="Please provide a reason for rejection"
          rows="4"
          class="form-control"
        ></InputText>
      </div>
      <div class="modal-action">
        <Button 
          type="button" 
          label="Confirm" 
          :disabled="isConfirmDisabled"
          @click="submitRejection">
        </Button>
        <Button 
          type="button" 
          label="Cancel" 
          class="p-button-secondary" 
          severity="danger"
          @click="closeModal(true)">
        </Button>
      </div>
    </Dialog>

    <Dialog  v-model:visible="paymentListVisible" modal header="Bidder Payment Status" >
      <div class="table-custom">
        <DataTable :value="paymentList" showGridlines >
          <Column field="paymentNumber" header="Payment Number"></Column>
          <Column header="Payment Amount">
          
            <template #body="row">
              <span :style="{ color: row.data.paymentstatus === 'Transaction Success' ? 'green' : row.data.paymentstatus === 'Cancelled' ? 'red' : 'grey' }">
                <b>{{ row.data.paymentAmount }}</b>
              </span>
            </template>
          
          </Column>
          <Column field="paymentPeriod" header="Payment Period"></Column>
          <Column field="emiPeriodType" header="Period Type"></Column>
          <Column field="paymentExpiryDate" header="Payment Expiry Date"></Column>
          <!-- <Column field="paymentstatus" header="Payment Status"></Column> -->
        </DataTable>      
      </div>
    </Dialog>

    <Dialog  v-model:visible="documentVisible" modal header="Bidder Documents" >
      <div class="table-custom">
<p>Bank Documents</p>
        <DataTable :value="documentList" showGridlines>
          <Column field="docName" header="Document Name"></Column>
          <Column field="docPath" header="View Document">
            <template #body="row">
              <!-- {{ row.data.docPath }} -->
              <Button @click="viewImage(row.data.docPath)" class="btn-sm" label="View"><fa-eye></fa-eye> </Button>
              
              <Button severity="secondary" @click="DownloadDocument(row.data.docPath)"><downloadIcon></downloadIcon></Button>
                      <!-- {{ row.data.docPath }} -->
              <!-- <VPdfViewer :src="row.data.docPath"/> -->
              <!-- <img :src="row.data.docPath"> -->
            </template>
          </Column>
        </DataTable>
       <br> <p>Joint Holder Documents</p>
        <DataTable :value="jointHolderDocument" showGridlines>
          <Column field="docName" header="Document Name"></Column>
          <Column field="docPath" header="View Document">
            <template #body="row">
              <!-- {{ row.data.docPath }} -->
              <Button @click="viewImage(row.data.docPath)" class="btn-sm" label="View"><fa-eye></fa-eye> </Button>
              
              <Button severity="secondary" @click="DownloadDocument(row.data.docPath)"><downloadIcon></downloadIcon></Button>
                      <!-- {{ row.data.docPath }} -->
              <!-- <VPdfViewer :src="row.data.docPath"/> -->
              <!-- <img :src="row.data.docPath"> -->
            </template>
          </Column>
        </DataTable>

        <br> <p>Registration Documents</p>
        <DataTable :value="registrationDocuments" showGridlines>
          <Column field="docName" header="Document Name"></Column>
          <Column field="docPath" header="View Document">
            <template #body="row">
              <!-- {{ row.data.docPath }} -->
              <Button @click="viewImage(row.data.docPath)" class="btn-sm" label="View"><fa-eye></fa-eye> </Button>
              
              <Button severity="secondary" @click="DownloadDocument(row.data.docPath)"><downloadIcon></downloadIcon></Button>
                      <!-- {{ row.data.docPath }} -->
              <!-- <VPdfViewer :src="row.data.docPath"/> -->
              <!-- <img :src="row.data.docPath"> -->
            </template>
          </Column>
        </DataTable>
        
        <!-- <div :style="{ width: '1028px', height: '700px' }">
    <VPdfViewer
      src="https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"
    />
  </div> -->

      
      </div>
    </Dialog>

      <!-- Existing content -->
      
      <!-- OTP Modal -->
      <Dialog v-model:visible="otpModalVisible" modal header="Enter OTP" :style="{ width: '30rem' }" :closable="false">
        <div class="form-group">
          <InputText
            v-model="enteredOtp"
            placeholder="Enter OTP"
            class="form-control"
          />
          <div v-if="otpError" class="error-message">
            {{ otpError }}
          </div>
        </div>
        <div class="modal-action">
          <Button 
            type="button" 
            label="Verify OTP" 
            :disabled="isOtpSubmitDisabled"
            @click="verifyOtp"
          />
          <Button 
            type="button" 
            label="Cancel" 
            class="p-button-secondary" 
            severity="danger"
            @click="closeOtpModal">
          </Button>
        </div>
      </Dialog> 
      
      <!-- <Dialog v-model:visible="viewImageModalImage" modal header="View Image" :style="{ width: '30rem' }" >
        <div class="form-group">
          <img :src="imagePath" alt="No preview available... Please download the file" target="_blank">
        </div>
      </Dialog>  -->
      <!-- <Dialog v-model:visible="viewImageModalPDF" modal header="View PDF" :style="{ width: '30rem' }" >
        <div class="form-group">
          <PDF :src="imagePath" alt="No preview available... Please download the file"/>
        </div>
      </Dialog>  -->
    <!-- Your Submit button component -->
    <div class="table-exp-action centered">
      <Button label="Submit" @click="submitForm" :disabled="disabled" />
      <!-- <Button label="Submit" @click="openOtpModal" :disabled="disabled" /> -->
    </div>
    <div class="table-exp-notice table-exp-notice-danger mt-4 text-center">
      <strong>Note:</strong>
      <span>
        First payment is calculated as = (Highest quoted value * First Payment
        Percentage) - EMD amount
      </span>
    </div>
   
  </div>
</template>

<script setup>
import faEye from '../../../assets/icons/eye.svg';
import downloadIcon from '../../../assets/icons/download.svg';
//import PDF from "pdf-vue3";
import Dialog from "primevue/dialog";
// import Tooltip from 'primevue/tooltip';
import 'primeicons/primeicons.css';
import { defineEmits } from 'vue';
import Checkbox from "primevue/checkbox";
import { computed, ref, onMounted, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, numeric, minValue } from "@vuelidate/validators";
import MQL from "@/plugins/mql.js";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { storeToRefs } from "pinia";
import { login } from "../../store/modules/login";
import { createToaster } from "@meforma/vue-toaster";
import Dropdown from "primevue/dropdown";
import MQLCdn from '@/plugins/mqlCdn.js';
// import faEye from '../../../assets/icons/eye.svg';
const loginStore = login();
const Vue = window.app
const isOtpSubmitDisabled = computed(() => !enteredOtp.value.trim());
let isSubmitButtonDisabled=ref(false);
const emit = defineEmits(['close']);
const toaster = createToaster({ position: "top-right", duration: 3000 });
const props = defineProps({
  auctionId: Number,
  auctionCode: String,
});
// const rejectionCount = ref(0);  
const otpModalVisible = ref(false);
const enteredOtp = ref('');
const otpError = ref('');
const showModal = ref(false);
const rejectionReason = ref('');
const modalData = ref(null);
let auctionId = ref(props.auctionId);
const otp=ref ();
const { organizationId, entityId, loginId ,currentRole,auctionCode,roleId} = storeToRefs(loginStore);
let tick = ref();
const resultList = reactive([]);
const selectedRows = ref([]);
let accepted = ref();
// let noOfDays = ref(98);
// let rules = computed(() => ({
//   noOfDays: {
//     required,
//     numeric,
//     minLength: minLength(1),
//     minValue: minValue(98, 'The minimum value for "Number of Hours" is 98'),
//   },
// }));
const status = ref('');
// const $v = useVuelidate(rules, { noOfDays });
const isConfirmDisabled = computed(() => {
  return !rejectionReason.value.trim(); // Check if rejectionReason is empty or only whitespace
});
let disabled = ref(false);
const approvalStatusResult = ref({ id: 0, approvalStatus: "" });
const dropdownOptions = ref([]);

let documentVisible=ref(false)
const columns = [
    { field: 'docName', header: 'Document Type' },
    { field: 'docPath', header: 'File' }
];
let viewImageModalImage = ref(false)
let viewImageModalPDF = ref(false)
// const rejectionCount = computed(() => {
//   return resultList.filter(item => item.data.approvalStatusResult === 'Reject').length;
// });

// console.log(`Number of rejected items: ${rejectionCount}`);
function openRejectModal(rowData) {
  showModal.value = true;
  modalData.value = rowData;
  roundNumber.value=rowData.data.roundNumber;
}
function verifyOtp() {
  validateH1RejectionOtp();
}
function closeModal(isCancel = false) {
  // Reset approval status if canceling
  if (isCancel && modalData.value) {
    modalData.value.data.approvalStatusResult = null; // Reset to 'kindly select'
  }
  showModal.value = false;
  rejectionReason.value = ''; // Reset rejection reason
}

function updateH1RejectionReason() {
		// Automatically generated
    new MQL()
          .useManagementServer()
			.setActivity("r.[H1RejectionReason]")
			.setData({auctionId:auctionId.value,h1RejectionReason:rejectionReason.value,roundNumber:roundNumber.value})
			//.setHeaders({"Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NCIsImdyb3VwcyI6WyJSb2xlIE1ha2VyIiwiUm9sZSBDaGVja2VyIiwiUm9sZSBBcHByb3ZlciIsIlJvbGUgU2NoZWR1bGVyIiwiU3VwZXJBZG1pbiIsIk9yZ2FuaXphdGlvbkFkbWluIiwiUm9sZSBXYXRjaGVyIiwiUm9sZSBBZG1pbiIsIlJvbGUgUHVibGlzaGVyIiwiUm9sZSBEZXZlbG9wZXIiXSwiY2xpZW50SVAiOiIxMDMuODUuMTgxLjYxIiwiaGl0c0NvdW50IjowLCJ0b2tlbiI6IiIsIm1ldGFkYXRhIjoie1wiZnVsbE5hbWVcIjpcInNod2V0YSBwYW5kZXlcIixcIm1vYmlsZU51bWJlclwiOlwiNjM5MzMwMjI4NFwiLFwidXNlcm5hbWVcIjpcInNod2V0YUBnbWFpbC5jb21cIixcImVudGl0eUlkXCI6MixcIm9yZ2FuaXphdGlvbklkXCI6MSxcIm9yZ2FuaXphdGlvbk5hbWVcIjpcIkRVTEIgSGFyeWFuYVwiLFwicmVnU3RhdHVzSWRcIjowLFwicmVnU3RhdHVzTmFtZVwiOlwiVVNFUl9BUFBST1ZFRFwiLFwibG9naW5JZFwiOlwiOTRcIn0iLCJleHAiOjE3MjU2MDU2OTV9.NW1KmYLgcs8FB6AJ4X2d1FKZy6_4Vb-QZT2mFSDHORA"})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("H1RejectionReason",true)
			if (rs.isValid("H1RejectionReason")) {
			} else
			 { 
			rs.showErrorToast("H1RejectionReason")
			}
			})
    }
function submitRejection() {

  // Check if the rejection reason is provided
  if (!rejectionReason.value.trim()) {
    // If no rejection reason, show an error or keep the modal open
    toaster.error('Please provide a reason for rejection.');
    return;
  }

  // console.log("rejectionReason.valueis "+rejectionReason.value.length)

  if(rejectionReason.value.length <5 || rejectionReason.value.length > 100) {
    toaster.error('Minimum 5 characters and Maximum 100 characters only allowed');
    return;
  }

			
  // If the reason is provided, set approval status to "Reject"
  if (modalData.value) {
    modalData.value.data.approvalStatusResult = dropdownOptions.value.find(
      (option) => option.label === 'Reject'
    ).value;
  }

  resultList[currentIndex.value] = { ...resultList[currentIndex.value], rejectionReason: rejectionReason.value };
  // console.log(resultList);
  
  //sendRejectionEmailH1Bidders();
  // H1RejectionOtp(); // Send OTP for rejection 
  //validateH1RejectionOtp(); // Validate OTP for rejection 
  //updateH1RejectionReason();

  closeModal(); 
  //toaster.success('Rejection reason submiited successfully')// Close the modal after setting "Reject"
  
}
function H1RejectionOtp() {//rejection otp generator
const rejectedItems = resultList.filter(item => {
  // console.log("item.value:", item); // Log item.data here
    if (item.ApprovalStatus == "Reject") {
      return true; // Include this item in the filtered array
    }
    return false; // Exclude this item
  });

  const rejectionCount = rejectedItems.length;
  // console.log("count**********",rejectedItems.length)
  // console.log("rejectionCount.value", resultList,rejectedItems,rejectionCount);
					// Automatically generated
          new MQL()
          .useNotificationServer()
			.setActivity("r.[SendH1RejectionOTP]")
			.setData({auctionId:auctionId.value,"loginId":loginStore.loginId,"rejectionCount":rejectionCount,resultList:resultList,roleId:loginStore.currentRole.roleId})
      //console.log("rejectionCount",rejectionCount)
			//.setHeaders({"Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NCIsImdyb3VwcyI6WyJSb2xlIE1ha2VyIiwiUm9sZSBDaGVja2VyIiwiUm9sZSBTY2hlZHVsZXIiLCJSb2xlIEFQUFJPVkVSIiwiUm9sZSBQdWJsaXNoZXIiLCJTdXBlckFkbWluIiwiT3JnYW5pemF0aW9uQWRtaW4iLCJSb2xlIFdhdGNoZXIiLCJSb2xlIEFkbWluIl0sImNsaWVudElQIjoiMTkyLjE2OC4xMC42MSIsImhpdHNDb3VudCI6MCwidG9rZW4iOiIiLCJtZXRhZGF0YSI6IntcImZ1bGxOYW1lXCI6XCJzaHdldGEgcGFuZGV5XCIsXCJtb2JpbGVOdW1iZXJcIjpcIjYzOTMzMDIyODRcIixcInVzZXJuYW1lXCI6XCJzaHdldGFAZ21haWwuY29tXCIsXCJlbnRpdHlJZFwiOjIsXCJvcmdhbml6YXRpb25JZFwiOjEsXCJvcmdhbml6YXRpb25OYW1lXCI6XCJEVUxCIEhhcnlhbmFcIixcInJlZ1N0YXR1c0lkXCI6MCxcInJlZ1N0YXR1c05hbWVcIjpcIlVTRVJfQVBQUk9WRURcIixcImxvZ2luSWRcIjpcIjk0XCJ9IiwiZXhwIjoxNzI3NDk4NDgyfQ.ayV0EAukhSr1h8P6tmTIzvrapE0Ud3C7yP38IpYb2u0"})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("SendH1RejectionOTP",true)
			if (rs.isValid("SendH1RejectionOTP")) {
       
       openOtpModal();
			 }else
			 { 
			//rs.showErrorToast("SendH1RejectionOTP")
			}
			})
}	

function calculateBidderPaymentConfigurations() {
  return new Promise((resolve) => {
					// Automatically generated
          new MQL()
          .useManagementServer()
			.setActivity("r.[CalculateBidderPaymentConfigurations]")
			.setData({auctionId:auctionId.value,"loginId":loginStore.loginId})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("CalculateBidderPaymentConfigurations",true)
			if (rs.isValid("CalculateBidderPaymentConfigurations")) {
        resolve(true);
			} else
			 { 
			rs.showErrorToast("CalculateBidderPaymentConfigurations")
			}
			})
    });
			
}

function UpdateH1BidderDetails() {
  
new MQL()
      .useManagementServer()
      .setActivity("r.[UpdateH1BidderDetails]")
      .setData({
        auctionId: auctionId.value,
        loginId:loginStore.loginId,
        h1ApprovedBidders: resultList
      })
      .fetch()
      .then((rs) => {
        let res = rs.getActivity("UpdateH1BidderDetails", true);
        if (rs.isValid("UpdateH1BidderDetails")) {
          disabled.value = true;
          toaster.success("Successfully Updated");
          //isSubmitButtonDisabled.value = true;
          //await calculateBidderPaymentConfigurations();
         sendEmailH1Bidders();
         sendEmailH1BidRejection();
          sendSmsH1Bidders();
        } else {
          rs.showErrorToast("UpdateH1BidderDetails");
        }
      });

    
    }
function validateH1RejectionOtp() {
					// Automatically generated
          new MQL()
          .useNotificationServer()
			.setActivity("r.[ValidateH1RejectionOtp]")
			.setData({loginId:loginStore.loginId,verifyotp:enteredOtp.value})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("ValidateH1RejectionOtp",true)
			if (rs.isValid("ValidateH1RejectionOtp")) {
        if (res.result["validateOtp"] == "OTPFOUND") {
          toaster.success("OTP verified");
          UpdateH1BidderDetails();
          closeOtpModal();
          } //else {
        //  toaster.error("Invalid OTP");
        //  }
			} else
			 { 
			rs.showErrorToast("ValidateH1RejectionOtp")
			}
			})
    }
 function fetchH1ApprovalStatus() {
  new MQL()
    .useManagementServer()
    .setActivity("r.[FetchH1ApprovalStatus]")
    .setData({})
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchH1ApprovalStatus", true);
      if (rs.isValid("FetchH1ApprovalStatus")) {
        approvalStatusResult.value = res.result;
        dropdownOptions.value = approvalStatusResult.value.map((item) => ({
          label: item.approvalStatus,
          value: item.id,
        }));
        // console.log("approvalStatusResult", approvalStatusResult.value);
      } else {
        rs.showErrorToast("FetchH1ApprovalStatus");
      }
    });
}
const roundNumber=ref(null);
function h1AuctionDetails() {
  new MQL()
    .useManagementServer()
    .setActivity("r.[FetchH1BiddersAuctionDetails]")
    .setData({ auctionId: auctionId.value, entityId: entityId.value })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchH1BiddersAuctionDetails", true);
      if (rs.isValid("FetchH1BiddersAuctionDetails")) {
        res.result.fetchH1BidderAuctionDetails;
     //  res.result.fetchH1BidderAuctionDetails[0].roundNumber;
        //console.log(res.result.fetchH1BidderAuctionDetails[0]);
       
        // console.log("ResultList!!!!!",res.result.fetchH1BidderAuctionDetails)
        res.result.fetchH1BidderAuctionDetails.forEach((item) => {
          resultList.push({
            ...item,
           // accepted: item.accepted === 1 ? 1 : 2,
           //rejectionReason: item.rejectionReason || 'No reason provided',
          });
          
        });
        // console.log("resultList is **** ", resultList);

        if (
          res.result.fetchH1BidderAuctionDetailsIndentDays[0].approvalDate != null
        ) {
          // noOfDays.value =
          //   res.result.fetchH1BidderAuctionDetailsIndentDays[0].indentHours;
          // console.log("indentDays is ", noOfDays.value);
          disabled.value = true;
        } else {
          disabled.value = false;
        }
      } else {
        rs.showErrorToast("FetchH1BiddersAuctionDetails");
      }
    });
}
let rejectCount=ref(0);
let currentIndex=ref()
function updateAccepted(rowData, selectedValue) {
  let label = rowData.data.approvalStatusResult == 1 ? "Accept" : "Reject"
  // if(label=="Reject"){
  //   rejectCOunt.value++;
  // } else {
  //   rejectCount.value--;
  // }
  // console.log("rowData and label is",rowData.data.approvalStatusResult," ", label)
  // Find the index of the item in resultList to ensure reactivity
  const index = resultList.findIndex((item) => item.id === rowData.id);
  if (index !== -1) {
    // Update the reactive property
    resultList[rowData.index] = { ...resultList[rowData.index],ApprovalStatus:label, accepted: selectedValue,rejectionReason };
    currentIndex.value=rowData.index;
    if (label === "Reject") {
    openRejectModal(rowData); // Trigger the modal opening
  }
  }
}
// function SendH1RejectionSMS() {
  
// 					// Automatically generated
//           new MQL()
//           .useManagementServer()
// 			.setActivity("r.[SendH1RejectionSMS]")
// 			.setData({"auctionCode":auctionCode.value})
// 			.fetch()
// 			 .then(rs => {
// 			let res = rs.getActivity("SendH1RejectionSMS",true)
// 			if (rs.isValid("SendH1RejectionSMS")) {
// 			} else{ 
// 		}	rs.showErrorToast("SendH1RejectionSMS");
//   }
// });	
function openOtpModal() {
  if(approvalStatusResult.value.length>0){
  otpModalVisible.value = true;
  }
}
function closeOtpModal() {
  otpModalVisible.value = false;
  enteredOtp.value = '';
  otpError.value = '';
}
function submitForm() {
  const rejectedItems = resultList.filter(item => {
  // console.log("item.value:", item); // Log item.data here
    if (item.ApprovalStatus == "Reject") {
      return true; // Include this item in the filtered array
    }
    return false; // Exclude this item
  });
  const rejectionCount = rejectedItems.length;
  // console.log("rejectionCount.value", rejectionCount);
  // const validation = $v.value.$validate();
  // if (!$v.value.$error) {
    // Check if all dropdowns are selected
    const allDropdownsSelected = resultList.every(
      (item) => item.approvalStatusResult
    );

    if (!allDropdownsSelected) {
      toaster.error(
        "Please select an option for all dropdowns before submitting."
      );
      return;
    }
  //  console.log("rejectionCount.value",rejectionCount);   
   if(rejectionCount>0){
    //console.log("approvalStatusResult.value",approvalStatusResult.value); 
    H1RejectionOtp();
    } else {
      UpdateH1BidderDetails();
    }
  // }
  //   else {
  //   toaster.error("Invalid Number of Hours");
  // }
}

function sendRejectionEmailH1Bidders(){
          new MQL()
          .useNotificationServer()
			.setActivity("r.[SendEmailH1RejectedBidders]")
			.setData({loginId:loginStore.loginId,roleName:loginStore.currentRole.roleName,auctionCode:auctionCode.value}) 
      //setData({auctionId:auctionId.value})
			//.setHeaders({})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("SendEmailH1RejectedBidders",true)
			if (rs.isValid("SendEmailH1RejectedBidders")) {
			} else
			 { 
			rs.showErrorToast("SendEmailH1RejectedBidders")
			}
			})
    }

function sendEmailH1Bidders() {

          new MQL()
          .useNotificationServer()
			.setActivity("r.[NotifyH1ApprovedBidders]")
			.setData({"resultList":resultList})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("NotifyH1ApprovedBidders",true)
			if (rs.isValid("NotifyH1ApprovedBidders")) {
			} else
			 { 
			rs.showErrorToast("NotifyH1ApprovedBidders")
			}
			})
			

}
function sendEmailH1BidRejection() {
					// Automatically generated
          new MQL()
          .useNotificationServer()
			.setActivity("r.[SendEmailH1BidRejection]")
			.setData({auctionId:auctionId.value})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("SendEmailH1BidRejection",true)
			if (rs.isValid("SendEmailH1BidRejection")) {
			} else
			 { 
			rs.showErrorToast("SendEmailH1BidRejection")
			}
			})
    }
function sendSmsH1Bidders() {
					// Automatically generated
          new MQL()
          .useNotificationServer()
			.setActivity("r.[FetchDetailsForH1Rejection]")
			.setData({auctionId:auctionId.value,loginId:loginStore.loginId})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchDetailsForH1Rejection",true)
			if (rs.isValid("FetchDetailsForH1Rejection")) {
        // console.log("FetchDetailsForH1Rejection",res.result);
			} else
			 { 
		//	rs.showErrorToast("FetchDetailsForH1Rejection")
			}
			})
    }

    let documentList=ref([])
    let jointHolderDocument=ref([])
    let registrationDocuments=ref([]) 
    
    function viewDetails(roundNumberParam) {
      // console.log(auctionId.value,roundNumberParam)
      // window.open('https://testcdncs.mkcl.org/2czAobDzoGCmipmIZOtO7LXyOEF/bidderBankDocuments/12/1236/1728973709525_save.png', '_blank');
      
					// Automatically generated
			new MQL()
      .useManagementServer()
			.setActivity("r.[FetchConcludedAuctionBidderDocuments]")
			.setData({auctionId:auctionId.value,roundNumber:roundNumberParam})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchConcludedAuctionBidderDocuments",true)
			if (rs.isValid("FetchConcludedAuctionBidderDocuments")) {

        documentList.value = res.result.fetchBidderUploadedDocuments.filter(doc => !doc.docName.includes('holder'));
        // console.log(documentList.value);

        jointHolderDocument.value = res.result.fetchBidderUploadedDocuments.filter(doc => doc.docName.includes('holder'));
// console.log(jointHolderDocument.value);

registrationDocuments.value = res.result.fetchBidderRegistrationDocuments
    //     documentList.value = res.result.map(doc => {
    //   if(!doc.docPath.startsWith('http')) {
    //     return {
    //       ...doc,docPath:'https://testcdncs.mkcl.org/'+doc.docPath
    //     };
        
    //   }
    //   return doc;
    // })


        // console.log("-->",res.result)



			} else
			 { 
			rs.showErrorToast("FetchConcludedAuctionBidderDocuments")
			}
			})
			
      documentVisible.value = true
    }

function DownloadDocument(url) {
  // console.log("URL --->"+url)
    if (url !== "") {
        new MQLCdn()
            .setCDNPath(url)
            .enablePageLoader(true)
            .downloadFile("downloadBtn")
            .then((res) => {
              // console.log("res0 is ",res)
                if (!res.isValid()) {
                  // console.log("res is ",res)
                    res.showErrorToast();
                }
                // console.log("res1 is ",res)
            });
    } else {
        toaster.error("File can'nt be downloaded!")
    }
};

let imagePath=ref()
    function viewImage(path) {
      imagePath.value = path;

      if(!path.startsWith('http')) {
        // console.log("Inside "+path)
        imagePath.value =   Vue.getCDNBaseURL()+'/'+imagePath.value
      }

// console.log("path is "+imagePath.value)
      // if (path.endsWith('.pdf')) {
      //   console.log("inside pdfs")
        fetchImage(imagePath.value)
//         viewImageModalPDF.value = true;
// } else {
  // fetchImage(path)
  // viewImageModalImage.value=true;
// }



    }

function fetchImage(url) {

  const myHeaders = new Headers();

myHeaders.append("Authorization", 'Bearer ' + sessionStorage.getItem('user-token'));
myHeaders.append("Accept", "application/json, text/plain, */*");
const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(url, requestOptions)
  .then((response) =>
    response.blob())
    .then((blob) => {
    // Create a URL for the image
    const imageUrl = URL.createObjectURL(blob);

    imagePath.value =  imageUrl;
    // console.log("imagePath.value is",imagePath.value)
    // viewImageModalImage.value=true
    window.open(imageUrl);
  })
  .catch((error) => console.error(error));
  
}

let paymentList=ref()
let paymentListVisible=ref(false)
function viewPaymentDetails(r) {

  
					// Automatically generated
          new MQL()
          .useManagementServer()
			.setActivity("r.[FetchBidderEMIPaymentStatus]")
			.setData({auctionId:auctionId.value,roundNumber:r})
			.fetch()
			 .then(async rs => {
			let res = rs.getActivity("FetchBidderEMIPaymentStatus",true)
			if (rs.isValid("FetchBidderEMIPaymentStatus")) {
        paymentList.value = res.result;
        console.log("paymentList.value is ",paymentList.value)
			} else
			 { 
			rs.showErrorToast("FetchBidderEMIPaymentStatus")
			}
			})

      paymentListVisible.value = true;
			

}


      
      
    
    
onMounted(() => {
  h1AuctionDetails();
  fetchH1ApprovalStatus();
});
</script>
