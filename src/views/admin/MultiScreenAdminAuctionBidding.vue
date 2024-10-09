<template>
    <div class="content-holder-p-0" :class="{ 'sidebar-open': mbidSidebar }">
        <Toast position="top-center" />
        <!-- Internet Connection Dialog -->
         <Dialog 
         v-model:visible="internetVisible" 
         modal 
         header="It seems that you have lost internet connectivity"
         class="modal-confirm modal-confirm-warning"
        :style="{ width: '40rem' }" 
        :closable="false" 
        >
        <!-- :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" -->
         <template #default>
        Please refresh once you are reconnected to the internet.
        </template>
         <template #footer>
        <Button severity="warning" @click="reload">Reload</Button>
      </template>
        </Dialog> 

        <!-- Join Auction Dialog -->
        <Dialog v-model:visible="auctionPasswordModal" modal
            :header="`Enter Auction ${auction?.vsAuctionCode} Password`">
            <form @submit.prevent="submitAuctionPassword()">
                <div class="flex align-items-center gap-3 mb-5">
                    <label for="password">PassCode</label>
                    <InputText type="password" v-model="auctionPassword" />
                </div>
                <small class="text-red-600">
                    {{ v$?.auctionPassword?.$errors[0]?.$message }}
                </small>
                <div class="flex justify-content-end gap-2">
                    <Button type="submit" label="Submit"></Button>
                    <Button label="Cancel" severity="secondary" @click="cancel()"></Button>
                </div>
            </form>
        </Dialog>

        <!-- Current Auction list Auction -->
        <div class="mbid-sidebar fixed top-0 left-0 bottom-0 w-[var(--mbid-sidebar-width)] bg-slate-600">
            <div class="mbid-sidebar-content">
                <div class="px-6 py-6">
                    <p class="text-2xl font-bold text-center text-white">Current Auctions</p>
                    <div class="my-2 text-center">
                        <p class="px-4 py-1.5 inline-block rounded text-sm font-normal text-center text-sky-600 bg-sky-100">You can join atmost {{ maxAuctionJoinLimit }} auctions</p>
                    </div>
                    <div class="fm-group">
                        <div class="fm-inner">
                            <InputText
                                v-model="filter"
                                placeholder="Search Auction Code"
                            />
                            <magnifyingglass class="fm-icon fm-prefix" @click="fetchScheduledAuctionsBidder()"></magnifyingglass>
                        </div>
                    </div>
                    <!-- <InputGroup>
                        <InputText type="text" v-model="filter" placeholer="search auction code" />
                        <Button @click="fetchScheduledAuctionsBidder()">
                            <magnifyingglass></magnifyingglass>
                        </Button> -->
                        <!-- <Button v-else  @click="filter = ''"><xmark></xmark></Button> -->
                    <!-- </InputGroup> -->
                </div>
                <div class="mbid-sidebar-card-holder px-6 pb-5">
                    <div class="card card-auction mb-4 last:mb-0" v-for="auction in scheduledAuctions" :key="auction.pklAuctionId">
                        <div class="ca-title text-xl font-bold text-[var(--neutral-600)]">{{ auction.vsAuctionCode }}</div>
                        <div class="ca-subtitle mb-3 text-sm text-[var(--neutral-400)] line-clamp-1">{{ auction.vsAuctionDescription }} and something else that we can add</div>
                        <div class="ca-info mb-3 text-[var(--neutral-400)]">
                            <div class="ca-info-item mb-1">
                                <div class="text-xs text-[var(--neutral-200)]">Start Date:</div>
                                <div class="font-medium">{{ moment(auction.dtStartDate).format('DD/MM/YYYY hh:mm:ss A') }}</div>
                            </div>
                            <div class="ca-info-item">
                                <div class="text-xs text-[var(--neutral-200)]">End Date:</div>
                                <div class="font-medium">{{ moment(auction.dtEndDate).format('DD/MM/YYYY hh:mm:ss A') }}</div>
                            </div>
                        </div>
                        <div class="ca-action text-center">
                            <Button class="btn-sm w-2/3" :disabled="isAuctionJoined(auction.pklAuctionId)" @click="joinAuction(auction)">{{
                                isAuctionJoined(auction.pklAuctionId) ? 'Joined' : 'Join' }}</Button>
                        </div>
                    </div>
                  
                </div>

              
            </div>
        </div>

        <div class="mbid-main-content ml-[var(--mbid-sidebar-width)]">
            <div class="mbid-header px-8 h-[var(--mbid-header-height)] flex items-center">
                <button class="btn btn-mbid-sidebar-toggle mr-4 w-[55px] [&_svg]:h-[28px]" @click="mbidSidebar = !mbidSidebar">
                    <fa-xmark v-if="mbidSidebar" class="fill-[var(--neutral-400)]"></fa-xmark>
                    <fa-bars v-else class="fill-[var(--neutral-400)]"></fa-bars>
                </button>
                <div class="py-2 px-8 flex gap-x-2 items-center bg-red-700 bg-opacity-10 rounded-md border border-red-700 border-opacity-40 text-center">
                    <div class="text-sm text-red-700">Server Time:</div>
                    <div class="text-[1.75rem] leading-[2rem] font-semibold text-red-700">{{ latestTime }}</div>
                </div>
                <div class="ml-auto flex items-center">
                    <div class="text-right">
                        <!-- <h1>Auction Bidding</h1> -->
                        <div>IP: {{ clientLoginIpAddress }}</div>
                        <div>{{ loginStore.username }}</div>
                    </div>
                    <router-link to="/bidder/bidderDashboard" class="btn btn-mbid-back ml-5 border border-slate-200 bg-white">
                        <fa-chevron-left></fa-chevron-left>
                        <div class="text" @click="dashboard">
                            <span class="-mb-1 block text-xs leading-[1] text-[var(--neutral-200)]">back to</span>
                            <span class="text-sm leading-[1] text-[var(--neutral-300)]">Dashboard</span>
                        </div>
                    </router-link>
                    <!-- <Button @click="openSidebar">
                        <div v-if="isOpen">
                            <xmark></xmark>
                        </div>
                        <div v-else>
                            <fa-bars></fa-bars>
                        </div>
                    </Button> -->
                </div>
                
            </div>

            <!-- Joined Auction -->
            <div class="mbid-auction-holder px-8 pb-7">
                <!-- <p class="text-2xl font-bold">Auction</p> -->
                <div class="auction-card-container">
                    <WatcherAuctionCard class="mb-6 last:mb-0" v-for="auction in auctionStore.auctionList" :key="auction.auctionId"
                        :auction="auction" :latestTime="latestTime" :active-index="activeAuction"
                        :clientLoginIpAddress="clientLoginIpAddress" @activeTab="activeTab" />
                    <WatcherAuctionCard class="mb-6 last:mb-0" v-for="auction in auctions" :key="auction.auctionId"
                        :auction="auction" :latestTime="latestTime" :active-index="activeAuction"
                        :clientLoginIpAddress="clientLoginIpAddress" @activeTab="activeTab" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import Dialog from 'primevue/dialog';
import moment from 'moment';
import { login } from "../../store/modules/login.js";
import axios from 'axios';
import Card from 'primevue/card';
import Button from 'primevue/button';
// import MQL from '../../../plugins/mql';
import MQL from "../../plugins/mql";
import useVuelidate from '@vuelidate/core';
import { useToast } from 'primevue/usetoast';
import Toast from "primevue/toast";
import { required, helpers, minLength } from "@vuelidate/validators";
import WatcherAuctionCard from './WatcherAuctionCard.vue';
import { useAuctionStore } from '../../store/Auction';
import { useRoute, useRouter } from "vue-router";
import faBars from '../../../assets/icons/bars.svg';
import faXmark from '../../../assets/icons/xmark.svg';
import faChevronLeft from "../../../assets/icons/chevron-left.svg";
import magnifyingglass from "../../../assets/icons/magnifying-glass.svg";

const loginStore = login()
const auctionStore = useAuctionStore()
const toast = useToast()

const mbidSidebar = ref(true)

const filter = ref('')
const perpage = ref(5)
const currentPage = ref(0)
const totalRows = ref(0)


const internetVisible = ref(false)
const latestTime = ref(null)
const auction = ref(null)
const auctionPasswordModal = ref(false)
const auctionPassword = ref(null)
const maxAuctionJoinLimit = ref(4)
const isOpen = ref(true)
const clientLoginIpAddress = ref('192.168.10.69')
const activeAuction = ref(null)

const scheduledAuctions = ref([])
// const auctions = ref([
//     {
//         auctionId: 1145,
//         password: null,
//         auctionUserId: 3168
//     }
// ])

const rules = {
    auctionPassword: {
        required: helpers.withMessage('Password is required', required),
        minLength: helpers.withMessage('Password must be at least 8 characters long', minLength(8)),
    },
};

const v$ = useVuelidate(rules, { auctionPassword });

function reload() {
    location.reload()
}
const router = useRouter()
const timeleftInterval = ref(null)
function dashboard () {
    //   vm.$store.dispatch('MultiAuctionBidding/CLEAR_AUCTIONLIST')
    auctionStore.clearAucitonStore()
      clearInterval(timeleftInterval.value);
      clearInterval(syncTime1.value);
      router.push({ name: 'BidderDashboard' })
    }

function isAuctionJoined(auctionId_) {
    return auctionStore.auctionList?.findIndex(({ auctionId }) => auctionId == auctionId_) > -1
}

const submitAuctionPassword = async () => {
    const formValid = await v$.value.$validate()
    console.log(formValid);
    if (!formValid) {
        toast.add({ severity: 'error', summary: 'Form Invalid', detail: 'Please fill the form correctly', life: 3000 })
        return
    }

    const passwordValid = await checkPasscode()


    if (passwordValid) {
        auctionStore.pushAuction({ auctionId: auction.value.pklAuctionId, password: auctionPassword.value, auctionUserId: auction.value.auctionUserId })
    }
    auctionPassword.value = null
    v$.value.$reset()
    auctionPasswordModal.value = false
    isOpen.value = false
};

function activeTab(e) {
    console.log(e);
    if (activeAuction.value == e) {
        activeAuction.value = null
    } else {
        activeAuction.value = e
    }
}


function fetchClientLoginIpAddress() {
    // Automatically generated
    new MQL()
        .useCoreServer()
        .setActivity("r.[query_2gRS4UVBp7lrMIzuQeQLHqCIAZp]")
        .setData({ 'userId': loginStore.loginId })
        .fetch()
        .then(rs => {
            let res = rs.getActivity("query_2gRS4UVBp7lrMIzuQeQLHqCIAZp", true)
            if (rs.isValid("query_2gRS4UVBp7lrMIzuQeQLHqCIAZp")) {
                clientLoginIpAddress.value = res[0].clientLoginIpAddress
            } else {
                rs.showErrorToast("query_2gRS4UVBp7lrMIzuQeQLHqCIAZp")
            }
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
                        auction.value.auctionUserId = res.result.auctionPassword.auctionUserId
                        toast.add({ severity: 'success', summary: 'Correct Password', detail: 'Welcome to Auction Live', life: 3000 })
                        resolve(true)
                    }
                } else {
                    rs.showErrorToast("CheckAuctionPassword")
                    reject()
                }
            })
    })
}

function cancel() {
    auctionPasswordModal.value = false
    auctionPassword.value = ''
}


function MaxAuctionJoinLimitFunction() {
    new MQL()
        .useCoreServer()
        .setActivity("o.[FetchCustomValueByKey]")
        .setData({ key: "MAX_AUCTION_JOINING_LIMIT" })
        // .setHeaders({})
        .fetch()
        .then((rs) => {
            let res = rs.getActivity("FetchCustomValueByKey", true);
            if (rs.isValid("FetchCustomValueByKey")) {
                console.log("value is ", res.result.vsCustomParamValue);
                maxAuctionJoinLimit.value = res.result.vsCustomParamValue
            } else {
                rs.showErrorToast("FetchCustomValueByKey");
            }
        });
}

function syncTime() {
    axios.get('/bidding-server-http/o/time').then((res) => {
       // internetVisible.value = false
        latestTime.value = moment(res.data.ServerTime).format('DD/MM/YYYY hh:mm:ss A')
    }).catch(() => {
        internetVisible.value = true
    })
}

function joinAuction(auction_) {
    if (auctionStore.auctionList.length < maxAuctionJoinLimit.value) {
        console.log(auction_);
        auction.value = auction_
        auctionPasswordModal.value = true
    } else {
        toast.add({ severity: 'error', summary: 'Oops', detail: `Can not join more than ${maxAuctionJoinLimit.value} auctions`, life: 3000 })
    }

}

function fetchScheduledAuctionsBidder() {
    new MQL()
        .useManagementServer()
        .setActivity("r.[FetchScheduledAuctionsBidder]")
        .enablePageLoader(false)
        .setData({
            entityId: "0",
            userId: loginStore.loginId,
            statusCode: "AUCTION_SCHEDULED",
            filter: `%${filter.value}%`,
            skip: `0`,
            limit: `100`,
        })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity("FetchScheduledAuctionsBidder", true);
            if (rs.isValid("FetchScheduledAuctionsBidder")) {
                console.log(res.result);
                scheduledAuctions.value = res.result.scheduledAuctions
                totalRows.value = res.result.rowCount.totalRows
            } else {
                rs.showErrorToast("FetchScheduledAuctionsBidder");
            }
        });
}

function openSidebar() {
    isOpen.value = !isOpen.value
}

onMounted(() => {
    fetchScheduledAuctionsBidder()
    MaxAuctionJoinLimitFunction()
    fetchClientLoginIpAddress()
})

const syncTime1 = ref(null)
onBeforeMount(() => {
 syncTime1.value = setInterval(() => {
        syncTime()
    }, 1000);

    timeleftInterval.value = setInterval(() => {
      fetchScheduledAuctionsBidder()
    }, 5000)

    // handling window closed event
    window.addEventListener('beforeunload', function (event) {
      console.log('inbeforeunload', performance)
      const navType = performance.getEntriesByType('navigation')[0].type

      if (navType == 'reload') {
        // This is a page reload
        console.log('Page is being reloaded')
      }

      if (navType != 'reload') {
        // This is a page reload
        console.log('Page is not being reloaded')
        // alert('unload?')
        auctionStore.clearAucitonStore()
      clearInterval(timeleftInterval.value);
      clearInterval(syncTime1.value);
      }
    })
})

</script>

<style lang="scss">
:root {
    --mbid-sidebar-width                : 300px;
    --mbid-header-height                : 100px;
}

.content-holder.content-holder-p-0 {padding: 0;}

.btn-mbid-sidebar-toggle {padding-inline: 15px;}
.btn-mbid-back {padding: 8px 22px 6px 18px; height: auto;
    svg {height: 20px; fill: var(--neutral-300);}
    .text span {transition: color 0.2s ease;}

    &:hover {border-color: rgb(var(--primary-400)); background: rgb(var(--primary-400) / 0.5);
        svg {fill: rgb(var(--primary-800));}
        .text span {color: rgb(var(--primary-800));}
    }
}

.mbid-sidebar {transition: transform 0.3s ease;
    .fm-group {margin-bottom: 0;
        .fm-control {border: none;}
    }
}
.mbid-main-content {transition: margin-left 0.3s ease;}
.content-holder:not(.sidebar-open) {
    .mbid-sidebar {transform: translate3d(calc(var(--mbid-sidebar-width) * -1), 0, 0);}
    .mbid-main-content {margin-left: 0;}
}
.mbid-sidebar-card-holder {height: calc(100vh - 172px); overflow-y: auto;}
.mbid-auction-holder {height: calc(100vh - var(--mbid-header-height)); overflow-y: auto;}

.card-auction {padding: 18px;}

.table-auction {font-size: 15px; border: 2px solid theme('colors.sky[400]');/* box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.1);*/
    th, td {padding: 12px 15px; border-bottom: 1px solid theme('colors.slate[300]'); border-right: 1px solid theme('colors.slate[300]');
        &:last-child {border-right: none;}
    }
    tr:first-child {
        th {border-radius: 8px 8px 0 0; background: theme('colors.sky[100]');}
    }
    tr:last-child, tr:nth-last-child(2) {
        td {border-bottom: none;}
    }
    th {line-height: 20px;}
    td {line-height: 20px; text-align: center;}
    thead {
        tr {
            th {background: lighten(#e2e8f0, 3%)/*theme('colors.slate[200]')*/;}
            &:nth-child(3) {
                th {background: theme('colors.slate[50]');}
                th:nth-child(1) {width: 12%;}
                th:nth-child(2) {width: 12%;}
                th:nth-child(3) {width: 20%;}
                th:nth-child(5) {width: 16%;}
            }
        }
    }

    .p-0 {padding: 0;}

    .time-holder {display: block; white-space: nowrap;}
    .fm-control.fm-select {padding-block: 7px; padding-inline: 10px; width: auto; height: var(--fm-height-sm);}
    .btn {white-space: nowrap;}
}

.details-holder {height: 0px; overflow: hidden; line-height: 24px; text-align: left; box-shadow: inset 0 1px 0 0 theme('colors.slate[300]'); transition: height 0.2s ease;
    .show-details & {height: 205px;}
    .dh-item {margin-top: 1px; border-right: 1px solid theme('colors.slate[300]');
        &:last-child {border-right: none;}
    }
    .dh-title {padding: 10px 15px; border-bottom: 1px solid theme('colors.slate[300]'); font-size: 16px; line-height: 24px; font-weight: 600; background: theme('colors.slate[50]')}
    .dh-content {padding: 15px 15px; height: 160px; overflow-y: auto;}
}

/* .header {
    position: sticky;
    z-index: 3;
    width: 100%;
    display: flex;
    height: max-content;
    justify-content: space-between;
    margin-bottom: 4px;
    padding: 24px;
    top: 0;
    background-color: white;
} */

/* .sidebar-content {
    background-color: white;
    padding: 8px;
    z-index: 2;
    position: absolute;
    width: max-content;
    height: 100vh;
    overflow-y: scroll;
} */

/* .main-auction {
    margin-left: 350px;
} */

/* .auction-card-container {
    display: flex;
    flex-wrap: wrap;
} */

/* .server-time {
    font-size: 18px;
    font-weight: bold;
    color: red;
} */
</style>
