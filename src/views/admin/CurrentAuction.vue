<template>
  <Toast />
  <div class="card">
    <DataTable :value="products" showGridlines tableStyle="min-width: 50rem">
      <div class="fm-inner">
        <label class="fm-label">Search Auction:</label>
        <InputText v-model="filter" placeholder="Search By Auction Code..." @input="fetchScheduledAuctionsBidder" />
        <fa-magnifying-glass class="fm-icon fm-prefix"></fa-magnifying-glass>
      </div>
      <Column field="srNo" header="SrNo."></Column>
      <Column field="vsAuctionCode" header=" Auction Code"></Column>
      <Column field="vsAuctionDescription" header="Auction Description"></Column>
      <Column field="auctionCategoryName" header="Auction Category"></Column>
      <Column field="dEventProcessingFees" header="Auction Fees"></Column>
      <Column field="dtStartDate" header="Auction StartDate/Time"></Column>
      <Column field="dtEndDate" header="Auction EndDate/Time"></Column>
      <Column field="details" header="Action">
        <template #body="data">
          <Button @click="joinAuction(data.data)">Join</Button>
        </template>
      </Column>
    </DataTable>
    <Paginator :rows="perPage" :rowsPerPageOptions="[10, 20, 30]" :totalRecords="totalRows"
      template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" @page="handlePageChange" />

      <Dialog v-model:visible="visible" modal :header="`Enter Auction ${auction?.vsAuctionCode} Password`">

        <div class="flex align-items-center gap-3 mb-5">
          <label for="password">PassCode</label>
          <InputText type=password v-model="auctionPassword" />
        </div>
        <small class="text-red-600">
          {{ v$?.auctionPassword?.$errors[0]?.$message }}
        </small>
        <div class="flex justify-content-end gap-2">
          <Button label="Cancel" severity="secondary" @click="cancel()"></Button>
          <Button label="Submit" @click="submitAuctionPassword()"></Button>
        </div>
      </Dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MQL from "../../plugins/mql";
import { login } from "../../store/modules/login.js";
import { useRoute, useRouter } from "vue-router";
import { required, helpers, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast';
import Toast from "primevue/toast";
import { useAuctionStore } from "../../store/Auction.js";

const toast = useToast()
const auctionStore = useAuctionStore()

const loginStore = login();
const route = useRoute();
const router = useRouter();
const entityId = ref(null)
const visible = ref(false)
const perPage = ref(10);
const totalRows = ref();
const currentPage = ref(0);
const filter = ref("");
const auction = ref(null)
const auctionPassword = ref("")
const products = ref([{}])

const rules = {
  auctionPassword: {
    required: helpers.withMessage('Password is required', required),
    minLength: helpers.withMessage('Password must be at least 8 characters long', minLength(8)),
  },
};

const v$ = useVuelidate(rules, { auctionPassword });


onMounted(() => {
  // ProductService.getProductsMini().then((data) => (products.value = data));
  entityId.value = route.params.id
  fetchScheduledAuctionsBidder()
});
function handlePageChange(event) {
  currentPage.value = event.page;
  perPage.value = event.rows;
  console.log("event.page", event.page);
  fetchConcludedAuctionsBidder();
}
function fetchScheduledAuctionsBidder() {
  new MQL()
    .useManagementServer()
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
        console.log(res.result);
        products.value = res.result.scheduledAuctions;
        totalRows.value = res.result.rowCount.totalRows;
        console.log("auctionDetails.value.length", products.value.length);
        for (var i = 0; i < products.value.length; i++) {
          products.value[i].srNo = currentPage.value * perPage.value + i + 1;
          console.log("SrNo-", currentPage.value * perPage.value + i + 1);
        }
      } else {
        rs.showErrorToast("FetchScheduledAuctionsBidder");
      }
    });
}

function joinAuction(auction_) {
  console.log(auction_);
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
  console.log('Auction password submitted:', auctionPassword.value)
  // Close the modal
  const formValid = await v$.value.$validate()
  console.log(formValid);
  if (!formValid) {
    toast.add({ severity: 'error', summary: 'Form Invalid', detail: 'Please fill the form correctly', life: 3000 })
    return
  }
  visible.value = false
  //router.push("BidderAuctionBidding")
  // TODO: check if the passcode is correct
  const passwordValid = await checkPasscode()
  console.log(passwordValid);
  if (passwordValid) {
    window.open('/auction/#/admin/AdminAuctionBidding', '_blank')
    router.push({path:'/UserDashboard'})
  }
};

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
            auctionStore.setAuction({ ...auction.value, "auctionPassword": auctionPassword.value, "inventoryHirarchy": res.result.inventoryHirarchy.itemHierarchy, "inventoryCategoryName": res.result.inventoryHirarchy.inventoryCategoryName})
            console.log(auctionStore.$state);
            resolve(true)
          }
        } else {
          rs.showErrorToast("CheckAuctionPassword")
          reject()
        }
      })
  })
}

// function getInventoryHirarchy() {
//   new MQL()
//     .useManagementServer()
//     .setActivity("r.[CheckAuctionPassword]")
//     .fetch()
//     .then((rs) => {
//       let res = rs.getActivity("CheckAuctionPassword", true);
//       if (rs.isValid("CheckAuctionPassword")) {
//         console.log(res.result);
//         auctionStore.setAuction({ ...auction.value, "inventoryHirarchy": res.result.inventoryHirarchy })
//       } else {
//         rs.showErrorToast("CheckAuctionPassword");
//       }
//     });
// }
</script>
