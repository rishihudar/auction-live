<template>
    <div class="box-section">
        <div class="bs-header">
            Auction Details
        </div>
        <div class="bs-item-holder">
            <div class="bs-item col-span-full md:col-span-6 lg:col-span-4 2xl:col-span-3">
                <div class="bs-label">Auction Type:</div>
                <div class="bs-value">{{ auctionDetails.auctionType }}</div>
            </div>
            <div class="bs-item col-span-full md:col-span-6 lg:col-span-4 2xl:col-span-3">
                <div class="bs-label">Auction Method:</div>
                <div class="bs-value">{{ auctionDetails.auctionMethodName }}</div>
            </div>
            <div class="bs-item col-span-full md:col-span-6 lg:col-span-4 2xl:col-span-3">
                <div class="bs-label">Auction Process:</div>
                <div class="bs-value">{{ auctionDetails.auctionProcessName }}</div>
            </div>
            <div class="bs-item col-span-full md:col-span-6 lg:col-span-4 2xl:col-span-3">
                <div class="bs-label">Bid Placement:</div>
                <div class="bs-value">{{ auctionDetails.bidPlacementName }}</div>
            </div>
            <div class="bs-item col-span-full md:col-span-6 lg:col-span-4 2xl:col-span-3">
                <div class="bs-label">District:</div>
                <div class="bs-value">{{ auctionDetails.district }}</div>
            </div>
            <div class="bs-item col-span-full md:col-span-6 lg:col-span-4 2xl:col-span-3">
                <div class="bs-label">MC:</div>
                <div class="bs-value">{{ auctionDetails.mcName }}</div>
            </div>
            <div class="bs-item col-span-full md:col-span-6 lg:col-span-4 2xl:col-span-3">
                <div class="bs-label">Location:</div>
                <div class="bs-value">{{ auctionDetails.location }}</div>
            </div>
            <div class="bs-item col-span-full md:col-span-6 lg:col-span-4 2xl:col-span-3">
                <div class="bs-label">Area:</div>
                <div class="bs-value">{{ auctionDetails.area }}</div>
            </div>
            <div class="bs-item col-span-full md:col-span-6 lg:col-span-4 2xl:col-span-3">
                <div class="bs-label">Participants:</div>
                <div class="bs-value">{{ auctionDetails.participants }}</div>
            </div>
            <div class="bs-item col-span-full md:col-span-6 lg:col-span-4 2xl:col-span-3">
                <div class="bs-label">Total Joining Fees Paid For:</div>
                <div class="bs-value">{{ auctionDetails.joiningPaid }}</div>
            </div>
            <div class="bs-item col-span-full md:col-span-6 lg:col-span-4 2xl:col-span-3">
                <div class="bs-label">Total EMD Paid For:</div>
                <div class="bs-value">{{ auctionDetails.emdPaid }}</div>
            </div>
            <div class="bs-item col-span-full md:col-span-6 lg:col-span-4 2xl:col-span-3">
                <div class="bs-label">Properties Available:</div>
                <div class="bs-value">Upto {{ auctionDetails.itemCount }}</div>
            </div>
            <div class="bs-item col-span-full md:col-span-6 lg:col-span-4 2xl:col-span-3">
                <div class="bs-label">EMD:</div>
                <div class="bs-value">{{ auctionDetails.eventEmdProcessingFees }}</div>
            </div>
            <div class="bs-item col-span-full md:col-span-6 lg:col-span-4 2xl:col-span-3">
                <div class="bs-label">Reserve Price:</div>
                <div class="bs-value">{{ auctionDetails.reservePrice }}</div>
            </div>
            <div class="bs-item col-span-full md:col-span-6 lg:col-span-4 2xl:col-span-3">
                <div class="bs-label">Modifier Value:</div>
                <div class="bs-value">{{ auctionDetails.modifierValue }}</div>
            </div>
            <div class="bs-item col-span-full">
                <div class="bs-buttons">
                    <template v-for="(doc, index) in auctionDetails.auctionDocuments" :key="index">
                        <!-- <a :href="doc.documentPath" class="btn btn-sm btn-secondary">{{ doc.documentTypeName }}</a> -->
                        <button v-if="doc.documentPath != '/' " @click="viewImage(doc.documentPath)" class="btn btn-sm btn-secondary">{{
                        doc.documentTypeName }}</button>
                        <!-- <button v-else class="btn btn-sm btn-secondary" v-tooltip.top="'Document Not Available'">{{
                        doc.documentTypeName }} </button> -->
                    </template>
                </div>
            </div>
            <div class="bs-item col-span-full">
                <div class="bs-buttons">
                    <Button @click="visible6 = true" class="btn-sm">
                        Available Properties
                    </Button>
                    <Dialog v-model:visible="visible6" modal header="Available Properties" :style="{ width: '50rem' }">
                        <div class="dh-tags flex flex-wrap gap-2 items-center">
                            <span class="px-3 py-1 rounded text-sm font-medium text-emerald-700 bg-emerald-700 bg-opacity-20" v-for="item in auctionDetails.item" :key="item.id">
                                {{ item.item }}
                            </span>
                        </div>
                        <!-- <div class="box-section">
                            <div class="bs-item-holder">
                                <div class="bs-item col-span-6" v-for="item in auctionDetails.item"
                                    :key="item.id">
                                    <div class="bs-label">Item Name:</div>
                                    <div class="bs-value"> {{ item.item }}</div>
                                </div>
                            </div>
                        </div>
                        <span>
                            {{ item }}
                        </span> -->
                    </Dialog>

                    <div>
                        <Button v-if="!upcomingAuctionFlag && userRole == 'ROLE_APPROVER'" severity="danger" @click="fetchEMDCount">
                            <fa-trash-can></fa-trash-can> Cancel Auction
                        </Button>
                        <!-- {{upcomingAuctionFlag}}
                        {{auctionDetails.statusCode}} -->
                        <ExtendButton v-if="upcomingAuctionFlag && auctionDetails.statusCode != 'AUCTION_SCHEDULED'" :auctionId="auctionId" :auctionCode="auctionCode"></ExtendButton>
                    </div>

                    <div>
                        <template v-if="dataFetched">
                            <schedule-button v-if="upcomingAuctionFlag" :disabled="auctionDetails.participants < auctionDetails.roundRule"
                                :entity-id="loginStore.loginDetails.entityId" :auction-id="auctionDetails.auctionId" 
                                :auctionCode ="auctionDetails.auctionCode"
                                :item-list="auctionDetails.item" v-model:startDate="auctionDetails.auctionStartDate"
                                v-model:endDate="auctionDetails.auctionEndDate" v-model:users="auctionDetails.users" :statusCode="auctionDetails.statusCode"
                                :totalEmdPaid="auctionDetails.emdPaid"
                                :propertiesAvailable="auctionDetails.itemCount"/>
                        </template>
                        <p v-if="(auctionDetails.participants < auctionDetails.roundRule) && upcomingAuctionFlag" class="text-red-400 m-auto">
                            Minimum {{ auctionDetails.roundRule }} participants are required to schedule the auction.
                        </p>
                    </div>

                    <div>
                        <Button v-if="upcomingAuctionFlag && userRole == 'ROLE_APPROVER'" severity="danger" @click="fetchEMDCount">
                            <fa-trash-can></fa-trash-can> Cancel Auction
                        </Button>
                        <Toast />
                        <Dialog v-model:visible="visible7" modal header="Cancel Auction" :style="{ width: '50rem' }">
                            <div class="box-section">
                                <div class="bs-item-holder">
                                    <div class="bs-item col-span-12 text-center" >
                                        <h6> <strong> Cancel Auction:</strong> {{ auctionDetails.auctionCode }} </h6> 
                                        <h6> Are you sure? <strong>(EMD Paid: {{ totalEMDPaid }})</strong> </h6>
                                    </div>
                                    <div class="bs-item col-span-12 text-center">
                                        <h6><strong>Cancellation Reason</strong></h6>
                                        <InputText id="reason" v-model="reason" class="text-center"
                                    placeholder="Please enter Auction Cancellation Reason"  />
                                    <div v-if="$v.reason.$error" class="fm-error">
                                        {{ $v.reason.$errors[0].$message }}
                                    </div>
                                    </div>
                                    <div class="bs-item col-span-6 text-center">
                                        <Button  severity="danger" @click="cancelAuction">
                                            <fa-trash-can></fa-trash-can> Cancel Auction
                                        </Button>
                                    </div>
                                    <div class="bs-item col-span-6 text-center">
                                        <Button  severity="secondary" @click="visible7 = false">
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import MQL from "@/plugins/mql.js";
import Dialog from 'primevue/dialog';
import { fetchAuctionStatus } from "../../plugins/helpers";
import ScheduleButton from '@/components/SchedulerButton.vue';
import ExtendButton from '@/components/ExtendParticipationDate.vue'
import Calendar from "primevue/calendar";
import { login } from "../../store/modules/login.js";
import MQLCdn from '@/plugins/mqlCdn.js';
import moment from "moment";
import { useToast } from "primevue/usetoast";
import faTrashCan from '../../../assets/icons/trash-can.svg';
import { useVuelidate } from '@vuelidate/core';
import { helpers, integer, required } from '@vuelidate/validators'


const toast = useToast();
const agree = ref(false);
const visible6 = ref(false);
const visible7 = ref(false);
const visible = ref(false);
const auctionDetails = ref({});
const loginStore = login();
const reason = ref('')
const totalEMDPaid = ref('')

const props = defineProps({
  itemList: Array,
  auctionId: Number,
  entityId: Number,
  startDate: String,
  endDate: String,
  users: Array,
  disabled: Boolean,
  statusCode: String,
  auctionCode:String,
  upcomingAuctionFlag:Boolean
});

const emit = defineEmits({
   //to call fetchUpcomingAuctions
    call: null
})

const selectedStartDate = ref();
const selectedEndDate = ref();

const minDate = ref();
minDate.value = moment().add(1, "minutes").toDate();
const endMinDate = ref();
endMinDate.value = moment().add(2, "minutes").toDate();
const dbEndDate = ref();
const dbStartDate = ref();
const userRole = ref(loginStore.currentRole.roleCode);

let dataFetched = ref(false);
async function FetchAuctionDetailsByAuctionIdAdmin() {
    var participantsStatusId = await fetchAuctionStatus("AUCTION_PARTICIPATION");
    var emdStatusId = await fetchAuctionStatus("AUCTION_EMD_FEES_PAID");
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAuctionDetailsByAuctionIdAdmin]")
        .setData({
            auctionId: props.auctionId
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAuctionDetailsByAuctionIdAdmin", true)
            if (rs.isValid("FetchAuctionDetailsByAuctionIdAdmin")) {
                //console.log(res)
                res.result.fetchAuctionDetails['auctionDocuments'] = res.result.fetchDocuments
                res.result.fetchAuctionDetails.item = JSON.parse("[" + res.result.fetchAuctionDetails.item + "]");
                res.result.fetchAuctionDetails.participants = res.result.counts.TotalParticipants;
                res.result.fetchAuctionDetails.emdPaid = res.result.counts.TotalEMDPaid;
                res.result.fetchAuctionDetails.joiningPaid = res.result.counts.TotalJoiningPaid;
                res.result.fetchAuctionDetails.roundRule = res.result.roundRule.roundRule;

                res.result.fetchAuctionDetails.users = res.result.users.map(el => el.userId);
                const auctionDetailObj = res.result.fetchAuctionDetails;
                //console.log(auctionDetailObj, "auctionDetails")

                // Map documents to an object with documentTypeName as key and documentPath as value
                const documentsMap = {};
                auctionDetailObj.auctionDocuments.forEach(doc => {
                    documentsMap[doc.documentTypeName] = doc.documentPath;
                });

                // Assign documentsMap to auctionDetailObj
                auctionDetailObj.documentsMap = documentsMap;

                auctionDetails.value = auctionDetailObj;
                dataFetched.value = true;
                // You can access document paths using auctionDetail.documentsMap in the template
            } else {
                rs.showErrorToast("FetchAuctionDetailsByAuctionIdAdmin")
            }
        })
}
function DownloadDocument(url) {
    //console.log(url, "url")
    if (url !== "") {
        new MQLCdn()
            .setCDNPath(url)
            .enablePageLoader(true)
            .downloadFile("downloadBtn")
            .then((res) => {
                if (!res.isValid()) {
                    res.showErrorToast();
                }
            });
    } else {
        toaster.error("File can'nt be downloaded!")
    }
};
const Vue = window.app;
let imagePath = ref();
function viewImage(path) {
  imagePath.value = path;

  if (!path.startsWith("http")) {
    console.log("Inside " + path);
    imagePath.value = Vue.getCDNBaseURL() + "/" + imagePath.value;
  }

  console.log("path is " + imagePath.value);
  // if (path.endsWith('.pdf')) {
  //   console.log("inside pdfs")
  fetchImage(imagePath.value);
  //         viewImageModalPDF.value = true;
  // } else {
  // fetchImage(path)
  // viewImageModalImage.value=true;
  // }
}

function fetchImage(url) {
  const myHeaders = new Headers();

  myHeaders.append(
    "Authorization",
    "Bearer " + sessionStorage.getItem("user-token")
  );
  myHeaders.append("Accept", "application/json, text/plain, */*");
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(url, requestOptions)
    .then((response) => response.blob())
    .then((blob) => {
      // Create a URL for the image
      const imageUrl = URL.createObjectURL(blob);

      imagePath.value = imageUrl;
      console.log("imagePath.value is", imagePath.value);
      // viewImageModalImage.value=true
      window.open(imageUrl);
    })
    .catch((error) => console.error(error));
}

function fetchAllStepsAuctionPreview() {
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[FetchAllStepsAuctionPreview]")
    .setData({ auctionId: props.auctionId })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchAllStepsAuctionPreview", true);
      dbStartDate.value = res.result.fetchStep4AuctionPreview[0].startDate;
      dbEndDate.value = res.result.fetchStep4AuctionPreview[0].endDate;
      //console.log("dbStartDate.value", dbStartDate.value, "dbEndDate.value", dbEndDate.value);
      selectedStartDate.value = dbStartDate.value;
      selectedEndDate.value = dbEndDate.value;
      if (rs.isValid("FetchAllStepsAuctionPreview")) {
      } else {
        rs.showErrorToast("FetchAllStepsAuctionPreview");
      }
    });
}

function fetchEMDCount(){
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchEMDCount]")
        .setData({
            // userId: userId,
            auctionId: props.auctionId
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchEMDCount", true)
            if (rs.isValid("FetchEMDCount")) {
              totalEMDPaid.value = res.result.totalEMDPaid
              
                if(totalEMDPaid.value == null){
                    totalEMDPaid.value = 0
                    //console.log("printing from nullEMDCount", totalEMDPaid.value)
                }
                visible7.value = true
                //console.log("Printing from FetchEMDCount: ", totalEMDPaid.value)
            } else {
                rs.showErrorToast("FetchEMDCount")
            }
        })
}

async function cancelAuction(){
    const result = await $v.value.$validate();
   //console.log("#############", result)
    if (reason.value!="") {
        new MQL()
        .useManagementServer()
        .setActivity("o.[CancelAuction]")
        .setData({
            // userId: userId,
            auctionId: props.auctionId,
            reason: reason.value
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("CancelAuction", true)
            if (rs.isValid("CancelAuction")) {
            //   totalEMDPaid.value = res.result.totalEMDPaid
            //console.log("Auction cancelled for auction ID: ", props.auctionId , "****", reason.value)
                // if(totalEMDPaid.value == null){
                //     totalEMDPaid.value = 0
                //     //console.log("printing from CancelAuction", totalEMDPaid.value)
                // }
                //console.log("###############AUctionCOde: ", props.auctionCode)
                toast.add({ severity: 'success', summary: 'Success', detail: 'Auction Cancelled', life: 3000 });
                auctionCancellationNotification(props.auctionCode)
                 visible7.value = false
                 
                // FetchAuctionDetailsByAuctionIdAdmin()
                emit('call');
                // //console.log("Printing from CancelAuction: ", totalEMDPaid.value)
            } else {
                rs.showErrorToast("CancelAuction")
            }
        })
    }
}

function auctionCancellationNotification(auctionCode){
  new MQL()
    .useNotificationServer()
    .enablePageLoader(false)
    .setActivity("r.[FetchBiddersDetailsForAuctionCancellationNotification]")
    .setData({
      auctionId: auctionCode,
      roleId: 1,
      statusId: 31
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchBiddersDetailsForAuctionCancellationNotification", true);
      if (rs.isValid("FetchBiddersDetailsForAuctionCancellationNotification")) {
       //console.log("Auction Cancel Notification send")
    //    reloadPage()
      } else {
        rs.showErrorToast("FetchBiddersDetailsForAuctionCancellationNotification");
      }
    });
    
}

function reloadPage() {
        window.location.reload();
        }
// function UpdateExtendParticipationEndDate() {
//   if (moment(selectedEndDate.value).isSameOrBefore(moment(selectedStartDate.value), "minute")) {
//     //console.log(
//       "log-",
//       moment(selectedEndDate.value).isSameOrBefore(moment(selectedStartDate.value), "minute")
//     );
//     alert(`Start Date should not be equal or after End Date !`);
//   } else {
//     extendParticipationEndDate();
//     //iAgreeStatusUpdate();
//     visible.value = false
//     //fetchAuctionWithApprovedStatus()
//     toast.add({
//           severity: "success",
//           summary: "Success",
//           detail: "Extended Participation Date.",
//           life: 3000,
//         });
//   }
// }
// function extendParticipationEndDate() {
//   //console.log("endDate-", moment(selectedEndDate.value).format("YYYY/MM/DD HH:mm:ss"));
//   //console.log("auctionId-",auctionId);
  
				
//           new MQL()
//         .useManagementServer()
// 			.setActivity("o.[UpdateExtendParticipationEndDate]")
// 			.setData({
//         registrationEndDate:moment(selectedEndDate.value).format("YYYY/MM/DD HH:mm:ss"),
//         auctionId:auctionId,
//         registrationEndDateAudits:dbEndDate.value,
//         moduleName:"AUCTION_SCHEDULING"
//       })
// 			.fetch()
// 			 .then(rs => {
// 			let res = rs.getActivity("UpdateExtendParticipationEndDate",true)
// 			if (rs.isValid("UpdateExtendParticipationEndDate")) {
// 			} else
// 			 { 
// 			rs.showErrorToast("UpdateExtendParticipationEndDate")
// 			}
// 			})
			
  
// }

const rules = computed(() => ({
    
        reason: { required: helpers.withMessage('Please Provide Auction Cancelleation Reason', required) }
    
}))

const $v = useVuelidate(rules, {
    reason
});


onMounted(() => {
    FetchAuctionDetailsByAuctionIdAdmin()
});
</script>

<!-- <style scoped>
.document-link {
    color: blue;
    text-decoration: underline;
}

.profile-field label {
    display: inline-block;
    width: 120px;
    /* Adjust width as needed */
    margin-right: 10px;
    /* Example margin between label and span */
}

.profile-field {
    margin-bottom: 10px;
    /* Example margin */
    border-bottom: 1px solid #ccc;
    /* Add border to separate fields */
}
</style> -->
<!-- <style scoped>
.text-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Ensures vertical centering */
}
</style> -->
