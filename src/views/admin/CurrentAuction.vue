<template>
  <div>
    <div class="page-header">
      <div class="ph-text">
        <h2 class="title">Current Auctions</h2>
      </div>
    </div>
    <Toast />
    <div class="table-custom">
      <Paginator class="pagination-up" :rows="perPage" :rowsPerPageOptions="[10, 20, 30]" :totalRecords="totalRows"
        template="RowsPerPageDropdown" @page="handlePageChange">
        <template #start>
          <div class="fm-inner">
            <InputText v-model="filter" placeholder="Search By Auction Code..." @input="fetchScheduledAuctionsBidder" />
            <fa-magnifying-glass class="fm-icon fm-prefix"></fa-magnifying-glass>
          </div>
        </template>
      </Paginator>
      <DataTable :value="products" showGridlines>
        <Column field="srNo" header="SrNo."></Column>
        <Column field="vsAuctionCode" header=" Auction Code"></Column>
        <Column field="vsAuctionDescription" header="Auction Description"></Column>
        <Column field="auctionCategoryName" header="Auction Category"></Column>
        <Column field="dEventProcessingFees" header="Auction Fees"></Column>
        <Column field="dtStartDate" header="Auction StartDate/Time"></Column>
        <Column field="dtEndDate" header="Auction EndDate/Time"></Column>
        <Column v-if="userRole == 'ROLE_APPROVER'"   field="details" header="Action">
          <template #body="data">
            <!-- <Button severity="danger" @click="">
                          <fa-trash-can></fa-trash-can> Cancel Auction {{ data }}
                      </Button>  -->
            <Button :disabled="data.data.isDisable == 0" class="btn-sm" severity="danger"
              @click="openCancelAuctionModal(data.data)"><fa-trash-can></fa-trash-can> Cancel Auction</Button>

          </template>
        </Column>
        <Column field="details" header="Action">
          <template #body="data">
            <Button class="btn-sm" @click="auctionJoinTime(data.data)">Join</Button>
          </template>
        </Column>
      </DataTable>
      <Paginator class="pagination-down" :rows="perPage" :rowsPerPageOptions="[10, 20, 30]" :totalRecords="totalRows"
        template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" @page="handlePageChange" />
    </div>
    <Dialog v-model:visible="visible" modal :header="`Enter Auction ${auction?.vsAuctionCode} Password`"
      :style="{ width: '40rem' }">

      <div class="fm-group" v-if=isWatcherPasscodeEnabled>
        <label class="fm-label" for="password">PassCode</label>
        <div class="fm-inner">
          <InputText type=password v-model="auctionPassword" />
        </div>
        <div class="fm-error">
          {{ v$?.auctionPassword?.$errors[0]?.$message }}
        </div>
      </div>
      <div class="modal-action fm-action justify-center" v-if=isWatcherPasscodeEnabled>
        <Button label="Submit" @click="submitAuctionPassword()"></Button>
        <Button label="Cancel" severity="grey" class="btn-grey" @click="cancel()"></Button>
      </div>
      <div class="modal-action fm-action justify-center" v-if=!isWatcherPasscodeEnabled>
        <Button label="Confirm Join" @click="submitAuctionPassword()"></Button>
        <Button label="Cancel" severity="grey" class="btn-grey" @click="cancel()"></Button>
      </div>
    </Dialog>
    <Toast />
    <Dialog v-model:visible="visible7" modal header="Cancel Auction" :style="{ width: '50rem' }">
      <div class="box-section">
        <div class="bs-item-holder">
          <div class="bs-item col-span-12 text-center">
            <h6> <strong> Cancel Auction:</strong> {{ aucdata.vsAuctionCode }} </h6>
            <h6> Are you sure? <strong>(EMD Paid: {{ totalEMDPaid }})</strong> </h6>
          </div>
          <div class="bs-item col-span-12 text-center">
            <h6><strong>Cancellation Reason</strong></h6>
            <InputText id="reason" v-model="reason" class="text-center"
              placeholder="Please enter Auction Cancellation Reason" />
              <div v-if="v$.reason.$error" class="fm-error">
              {{ v$.reason.$errors[0].$message }}
          </div>
          </div>
          <div class="bs-item col-span-6 text-center">
            <Button severity="danger" @click="cancelAuction">
              <fa-trash-can></fa-trash-can> Cancel Auction
            </Button>
          </div>
          <div class="bs-item col-span-6 text-center">
            <Button severity="secondary" @click="visible7 = false">
              Close
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="joinAuctionVisible"
      modal
      :style="{ width: '40rem' }" 
    >
    <div>
        <span>Users can only join within the last {{ compareTime/60 }} hour(s) before the auction starts.</span>
      </div>
  </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import MQL from "../../plugins/mql";
import { login } from "../../store/modules/login.js";
import { useRoute, useRouter } from "vue-router";
import { required, helpers, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast';
import Toast from "primevue/toast";
import { useAuctionStore } from "../../store/Auction.js";
import faTrashCan from '../../../assets/icons/trash-can.svg';
// import moment from 'moment'; // Import Moment.js

let isWatcherPasscodeEnabled=ref()
let joinAuctionVisible=ref(false);

const toast = useToast()
const auctionStore = useAuctionStore()
const totalEMDPaid = ref('')
// const cancellationCustomParam = ref('')
// const cancelAuctionBeforeTime = ref('')
const loginStore = login();
const route = useRoute();
const router = useRouter();
const entityId = ref(null)
const visible = ref(false)
const visible7 = ref(false);
const perPage = ref(10);
const totalRows = ref();
const currentPage = ref(0);
const filter = ref("");
const auction = ref(null)
const auctionPassword = ref("")
const products = ref([{}])
const joinTime = ref([]);
const compareTime = ref([]);
const aucdata = ref({
  AuctionUsersStatusId: 34,
  AuctionUsersStatusName: "These status should be used to add users during scheduling for the auc",
  EventEmdFeeMode : "Online",
  EventProcessingFeeMode : "Online",
  auctionCategoryName : "Residential",
  auctionStatus : "Auction Scheduled",
  dEventEmdProcessingFees : 100,
  dEventProcessingFees : 2000,
  dtEndDate : "2024-06-20 16:48:38",
  dtStartDate : "2024-06-20 16:43:38",
  iPropertiesEligibleFor : null,
  pklAuctionId : 1135,
  pklAuctionUserId : 3129,
  pklStatusId : 18,
  srNo : 1,
  vsAuctionCode : "MCF-1090",
  vsAuctionDescription : "TEST H1 SMS",
  vsAuctionMethodName : "Round-Wise",
  vsAuctionProcessName : "Forward",
  vsAuctionType : "Open",
  vsBidPlacementName : "Bid Factor",
  vsEMDAppliedForName : "Auction and Item Wise"
})
const reason = ref('')
const userRole = ref(loginStore.currentRole.roleCode);
const multiScreenParam = ref();
const rules = {
  auctionPassword: {
    required: helpers.withMessage('Password is required', required),
    minLength: helpers.withMessage('Password must be at least 8 characters long', minLength(8)),
  },
  reason: { required: helpers.withMessage('Please Provide Auction Cancelleation Reason', required) }
};

const v$ = useVuelidate(rules, { auctionPassword,  reason});


function fetchWatcherPasscodeSet() {

          new MQL()
          .useBidderServer()
			.setActivity("o.[fetchWatcherPasscode]")
			.setData({"entityId":loginStore.entityId})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("fetchWatcherPasscode",true)
			if (rs.isValid("fetchWatcherPasscode")) {

        //console.log("res.result is ",res.result.isWatcherPasscodeEnabled)

        if(res.result.isWatcherPasscodeEnabled == 1) {
          isWatcherPasscodeEnabled.value = true
          
        } else {
          isWatcherPasscodeEnabled.value = false
          
        }

			} else
			 { 
			rs.showErrorToast("fetchWatcherPasscode")
			}
			})
			
}

onMounted(() => {
  // ProductService.getProductsMini().then((data) => (products.value = data));
  entityId.value = route.params.id
   //setInterval(() => {
    fetchScheduledAuctionsBidder()
     //}, 1000);
     fetchWatcherPasscodeSet()
     fetchMultiScreenBiddingParam();
  // fetchCustomParam()
});
function handlePageChange(event) {
  currentPage.value = event.page;
  perPage.value = event.rows;
  //console.log("event.page", event.page);
  fetchConcludedAuctionsBidder();
}
function openCancelAuctionModal(data_) {
  //console.log("printing from openCancelAuctionModal: ", data_)
  aucdata.value = data_

  new MQL()
        .useManagementServer()
        .setActivity("o.[FetchEMDCount]")
        .setData({
            // userId: userId,
            auctionId: aucdata.value.pklAuctionId
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


function  checkAuctionRoundExists ()  {
  return new Promise((resolve, reject ) => {
			new MQL()
      .useManagementServer()
			.setActivity("o.[CheckAuctionRoundExists]")
			.setData({"auctionId": aucdata.value.pklAuctionId})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("CheckAuctionRoundExists",true)
			if (rs.isValid("CheckAuctionRoundExists")) {
        //console.log("count",res.result.counts)
        //console.log("whyyyyy",res.result.counts > 0)
        if(res.result.counts > 0){
          //console.log("Inside if")
          resolve( true)

        } else {
          //console.log("Inside else")
          resolve( false)
        }
			} else
			 { 
			rs.showErrorToast("CheckAuctionRoundExists")
			}
			})

      .catch((err) => {
        console.error("Error in CheckAuctionRoundExists:", err);
        reject(err); // Reject promise on error
      });

  })
			}

async function cancelAuction(){
  
  const response = await checkAuctionRoundExists(); // Check if auction round exists
  //Step 1: Remove Hub if it exists
if (response) {
  await removeHub(); // Remove the hub route
}
    // Step 2: Validate and execute the CancelAuction activity 
    const result = await v$.value.$validate();
    //console.log("#############", result)
    if (reason.value!="") {
        //console.log("Auction cancelled")
        new MQL()
        .useManagementServer()
        .setActivity("o.[CancelAuction]")
        .setData({
            // userId: userId,
            auctionId: aucdata.value.pklAuctionId,
            reason: reason.value
        })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("CancelAuction", true)
            if (rs.isValid("CancelAuction")) {
              // totalEMDPaid.value = res.result.totalEMDPaid
              //console.log("Auction cancelled for auction ID: ", aucdata.value.pklAuctionId , "****", reason.value)
              //   if(totalEMDPaid.value == null){
              //       totalEMDPaid.value = 0
              //       //console.log("printing from nullEMDCount", totalEMDPaid.value)
              //   }
              toast.add({ severity: 'success', summary: 'Success', detail: 'Auction Cancelled', life: 3000 });
              auctionCancellationNotification(aucdata.value.vsAuctionCode)
                 visible7.value = false
                
                //  fetchScheduledAuctionsBidder()
              //   //console.log("Printing from FetchEMDCount: ", totalEMDPaid.value)
            } else {
                rs.showErrorToast("CancelAuction")
            }
        })                
    }

}
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right", duration: 3000 });
import axios from "axios";


const removeHub = async () => {
  //console.log(aucdata.value.pklAuctionId)
  try {
    const response = await axios.get(
      `/bidding-server-http/o/removeHubRoute/${aucdata.value.pklAuctionId}` // Make a GET request to the specified URL
    );
    return response.data; // Return a resolved Promise with the response data
  } catch (err) {
    toaster.error("Error removing hub");
    console.error("Error removing hub:", err.message);
    throw err; // Rethrow the error to handle it in the calling function
  }
};

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
       fetchScheduledAuctionsBidder()
      } else {
        rs.showErrorToast("FetchBiddersDetailsForAuctionCancellationNotification");
      }
    });
   
}
function fetchMultiScreenBiddingParam() {
  new MQL()
    .useCoreServer()
    .setActivity("o.[FetchCustomValueByKey]")
    .setData({ key: "MULTISCREEN_BIDDING" })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchCustomValueByKey", true);
      if (rs.isValid("FetchCustomValueByKey")) {
        multiScreenParam.value = res.result.vsCustomParamValue;
        //console.log(res.result.vsCustomParamValue)
      } else {
        rs.showErrorToast("FetchCustomValueByKey");
      }
    });
}



function fetchScheduledAuctionsBidder() {
  new MQL()
    .useManagementServer()
    .enablePageLoader(false)
    .setActivity("r.[FetchScheduledAuctionsBidder]")
    .setData({
      entityId: loginStore.entityId,
      userId: loginStore.loginId,
      statusCode: "AUCTION_SCHEDULED",
      filter: "%" + filter.value.trim() + "%",
      skip: String(currentPage.value * perPage.value),
      limit: String(perPage.value),
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchScheduledAuctionsBidder", true);
      if (rs.isValid("FetchScheduledAuctionsBidder")) {
        //console.log(res.result);
        products.value = res.result.scheduledAuctions;
        totalRows.value = res.result.rowCount.totalRows;
        //console.log("auctionDetails.value.length", products.value.length);
        for (var i = 0; i < products.value.length; i++) {
          products.value[i].srNo = currentPage.value * perPage.value + i + 1;
          //console.log("SrNo-", currentPage.value * perPage.value + i + 1);
        }
      } else {
        rs.showErrorToast("FetchScheduledAuctionsBidder");
      }
    });
}
function auctionJoinTime(val) {
  const auctionCode = val.vsAuctionCode;
  //console.log("Auction Join Time");
  //console.log(auctionCode);
  new MQL()
    .useManagementServer()
    .setActivity("o.[AuctionJoinTimeWatcherScreen]")
    .setData({ auctionCode: auctionCode })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("AuctionJoinTimeWatcherScreen", true);
      if (rs.isValid("AuctionJoinTimeWatcherScreen")) {
        //console.log("Join Result", res.result.fetchAuctionJoinTime);
        joinTime.value = res.result.fetchAuctionJoinTime.timeDifference;
        //console.log("Join Time ***", joinTime.value);
        //console.log("AuctionJoinTime Result", res.result.customParamValue.auctionJoinTime);
        compareTime.value = res.result.customParamValue.auctionJoinTime;

        if (compareTime.value < joinTime.value) {
          joinAuctionVisible.value = true;
        } else {
          joinAuction(val);
        }
      } else {
        rs.showErrorToast("AuctionJoinTimeWatcherScreen");
      }
    });
}
function joinAuction(auction_) {
  //console.log(auction_);
  auction.value = auction_
  visible.value = true
  auctionPassword.value = ''
  v$.value.$reset()

}

function cancel() {
  visible.value = false
  auctionPassword.value = ''
}

const submitAuctionPassword = async () => {
  // Handle submission of auction password here
  //console.log('Auction password submitted:', auctionPassword.value)
  // Close the modal
  if(!isWatcherPasscodeEnabled.value) {

     await fetchWatcherPasscodeDetails()
     if (multiScreenParam.value == "NO") {
      //console.log("multiScreenParam.value")
      router.push({ name: "AdminAuctionBidding" });
    } else if (multiScreenParam.value=="YES") {
      // console.log("Pushed Data", {
      //   auctionId: auction.value.pklAuctionId,
      //   password: auctionPassword.value,
      //   auctionUserId: auction.value.pklAuctionUserId,
      // });
      //window.open('/applicant/#/v2/bidder/bidderAuctionBidding','_blank')
      router.push({ name: "MultiScreenAdminAuctionBidding" });
     
    }
  
  } else {

    v$.value['auctionPassword'].$touch()

    if (v$.value['auctionPassword'].$invalid) {
    toast.add({ severity: 'error', summary: 'Form Invalid', detail: 'Please fill the form correctly', life: 3000 })
    return
  }

  }
  auctionStore.pushAuction({
        auctionId: auction.value.pklAuctionId,
        password: auctionPassword.value,
        auctionUserId: auction.value.pklAuctionUserId,
      });
  visible.value = false
  //router.push("BidderAuctionBidding")
  // TODO: check if the passcode is correct
  const passwordValid = await checkPasscode()
  //console.log(passwordValid);
  if (passwordValid) {
    // window.open('/auction/#/admin/AdminAuctionBidding', '_blank')
    // router.push({ path: '/UserDashboard' })
  }
};

function fetchWatcherPasscodeDetails() {
  return new Promise((resolve) => {
          new MQL()
          .useBidderServer()
			.setActivity("o.[fetchMasterPasscodeDetails]")
			.setData({"auctionId": auction.value.pklAuctionId,"userId": loginStore.loginId })
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("fetchMasterPasscodeDetails",true)
			if (rs.isValid("fetchMasterPasscodeDetails")) {
        auctionPassword.value = res.result.passCode;
        //console.log("test auctionPassword.value ",auctionPassword.value)
        resolve()
			} else
			 { 
			rs.showErrorToast("fetchMasterPasscodeDetails")
			}
			})

    })
			
}

function checkPasscode() {
  return new Promise((resolve) => {
    // Automatically generated
    new MQL()
      .useBidderServer()
      .setActivity("o.[CheckAuctionPassword]")
      .setData({ "auctionId": auction.value.pklAuctionId, "auctionPassword": auctionPassword.value, "userId": loginStore.loginId })
      .fetch()
      .then(rs => {
        let res = rs.getActivity("CheckAuctionPassword", true)
        if (rs.isValid("CheckAuctionPassword")) {
          if (res.result.auctionPassword.checkAuctionPassword != 0) {
            toast.add({ severity: 'error', summary: 'Incorrect Password', detail: 'Please check your Password', life: 3000 })
            resolve(false)
          } else {
            toast.add({ severity: 'success', summary: 'Correct Password', detail: 'Welcome to Auction Live', life: 3000 })
            auctionStore.setAuction({ ...auction.value, "auctionPassword": auctionPassword.value, "inventoryHirarchy": res.result.inventoryHirarchy.itemHierarchy, "inventoryCategoryName": res.result.inventoryHirarchy.inventoryCategoryName })
            //console.log(auctionStore.$state);
            resolve(true)
          }
        } else {
          rs.showErrorToast("CheckAuctionPassword")
          reject()
        }
      })
  })
}

function reloadPage() {
        window.location.reload();
        }


// function getInventoryHirarchy() {
//   new MQL()
//     .useManagementServer()
//     .setActivity("r.[CheckAuctionPassword]")
//     .fetch()
//     .then((rs) => {
//       let res = rs.getActivity("CheckAuctionPassword", true);
//       if (rs.isValid("CheckAuctionPassword")) {
//         //console.log(res.result);
//         auctionStore.setAuction({ ...auction.value, "inventoryHirarchy": res.result.inventoryHirarchy })
//       } else {
//         rs.showErrorToast("CheckAuctionPassword");
//       }
//     });
// }
</script>

<style scoped>
.text-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* Ensures vertical centering */
}
</style>