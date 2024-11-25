<template>
     
    <div class="content-holder-full content-auction-bidding" style="padding: 0;">
        
        <div class="h-screen grid grid-cols-[1fr_320px]">
            <div class="relative py-5 px-8 bg-slate-100">
                <!-- <Toast/> -->
               
                <div class="mb-5 flex items-start justify-between">
                    <div class="text">
                        <div class="text-2xl font-bold text-[var(--neutral-600)]">Auction Bidding</div>
                        <h4 class="font-medium">IP: {{ clientLoginIpAddress }}</h4>
                        <p>{{ loginStore.username }}</p>
                    </div>
                    <div
                        class="py-2 px-8 bg-primary-400 bg-opacity-20 rounded-md border border-primary-400 text-center">
                        <div class="text-sm text-green-700">Server Time</div>
                        <div class="text-2xl font-medium text-green-700">{{ latestTime }}</div>
                    </div>
                    <!-- <Button style="padding-inline: 30px;" severity="danger" @click="leaveAuction()">Leave</Button> -->
                    <Button
            style="padding-inline: 30px"
            severity="danger"
            @click="leaveAuction()"
            >Leave</Button
          >
                </div>

                <!-- Auction Details -->
                <div class="box-section">
                    <div class="bs-header">Auction Information</div>
                    <div class="bs-item-holder">
                        <div class="bs-item col-span-4">
                            <div class="bs-label">Auction Code:</div>
                            <div class="bs-value">
                                {{ auctionStore.auctionObj.vsAuctionCode }}
                            </div>
                        </div>
                        <div class="bs-item col-span-4">
                            <div class="bs-label">Round Number:</div>
                            <div class="bs-value">
                                {{ auctionDetails[0].roundNumber }}
                            </div>
                        </div>
                        <div class="bs-item col-span-4">
                            <div class="bs-label">Total Rounds:</div>
                            <div class="bs-value">
                                {{ itemDetails.numberOfRounds }}
                            </div>
                        </div>
                        <div class="bs-item col-span-full">
                            <div class="bs-label">Item Details:</div>
                            <div class="bs-value">
                                {{ auctionStore.auctionObj.inventoryCategoryName }} :
                                {{ auctionStore.auctionObj.inventoryHirarchy }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bid History Table -->
                <div class="table-custom">
                    <DataTable showGridlines :value="auctionDetails">
                        <Column field="auctionNumber" header="Item Code">
                            <template #body="{ data }">
                                <div class="flex align-items-center gap-2">
                                    <span>{{ data.auctionNumber }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="currentHigh" header="Current High">
                            <template #body="{ data }">
                                <div class="flex align-items-center gap-2">
                                    <span>{{ currencyFormat(data.currentHigh) }}</span>
                                </div>
                            </template>
                        </Column>
                        <!-- <Column field="placeBid" header="Place Bid">
                            <template #body="">
                                <div class="flex align-items-center gap-2">
                                    <div class="flex flex-col">
                                        <span> Modifier value : {{ itemDetails.ModifierValue }} </span>
                                        <span class="font-black" v-if="bidFlag && !roundHasEnded && count">
                                            {{ currencyFormat(bidValue) }}
                                        </span>
                                    </div>
                                    <span v-if="bidFlag && !roundHasEnded">
                                        <Dropdown v-model="count" :options="multiplieries" optionLabel="text" optionValue="value"
                                            placeholder="Multiplier" class="w-full md:w-14rem" />
                                    </span>
                                    <Button v-if="!bidFlag || roundHasEnded" :disabled="isbidDisabled"
                                        @click="bidFlag = true">Bid</Button>
                                    <Button v-if="bidFlag && !roundHasEnded" :disabled="!count" @click="bidPlaced()">
                                        Place Bid
                                    </Button>
                                </div>
                            </template>
                        </Column> -->
                        <Column field="timeLeft" header="Time Left"><template #body="">
                                <div class="flex align-items-center gap-2 text-lg font-medium text-red-600">
                                    <span ref="timeLeft"></span>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <!--item selection-->
                <!-- <div class="my-3 text-center">
                    <Button label="Open item selection" :disabled="isItemSelectionBtnDisable" @click="openItem()"></Button>
                </div>

                <Dialog v-model:visible="visible" maximizable modal header="Item Selection" :style="{ width: '50rem' }"
                    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">

                    <h4>You have been highest quoted bidder for this round. Please select the property of your interest.</h4>
                    <br>

                    Item Details: <b>{{ auctionStore.auctionObj.inventoryCategoryName }} : {{
                        auctionStore.auctionObj.inventoryHirarchy
                        }}</b>
                    <br>
                    <b class="float-right">
                        Select property in: <span style="color: red;">{{ time }} </span>
                    </b>
                    <br>
                    <div v-for="property in propertiesToBeSold" :key="property.pklAuctionItemsDetails">
                        <RadioButton v-model="selectedCategory" name="dynamic" :value="property.pklAuctionItemsDetails"
                            :disabled="property.bInventorySold" />
                        <label :for="property.pklAuctionItemsDetails" class="ml-2">{{ property.vsInventoryName }}</label>
                    </div>
                    <Button label="Submit" @click="submitProperty()"></Button>
                </Dialog> -->

                <div class="absolute bottom-0 left-0 right-0 px-8 pb-5 flex gap-2 justify-between">
                    <Button severity="secondary" @click="visibleItemDetails = true; fetchItemDetails()"
                        style="padding-inline: 30px;">
                        Item Details
                    </Button>
                    <Button severity="secondary" @click="visiblePropertyDetails = true; fetchProperties()"
                        style="padding-inline: 30px;">
                        Property Details
                    </Button>
                </div>

                <Dialog v-model:visible="visibleItemDetails" modal header="Item Details" :style="{ width: '50rem' }">
                    <ul>
                        <li>Description : <b>{{ itemDetails.Description }}</b></li>
                        <li>CurrentRound : <b>{{ itemDetails.CurrentRound }}</b></li>
                        <li>StartValue : <b>{{ itemDetails.StartValue }}</b></li>
                        <li>ModifierValue : <b>{{ itemDetails.ModifierValue }}</b></li>
                        <li>MaxBidAmount : <b>{{ itemDetails.MaxBidAmount }}</b></li>
                        <li>TotalNoOfBids : <b>{{ bidHistory.length }}</b></li>
                    </ul>
                </Dialog>
                <Dialog v-model:visible="visiblePropertyDetails" modal header="Property Details"
                    :style="{ width: '50rem' }">
                    <div class="mb-4">
                        <strong>{{ auctionStore.auctionObj.inventoryCategoryName }}:</strong> {{
                            auctionStore.auctionObj.inventoryHirarchy }}
                    </div>
                    <div class="table-custom">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Property Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="property in properties" :key="property.pklAuctionItemsDetails">
                                    <td> <strong>{{ property.vsInventoryName }}</strong> </td>
                                    <td class="text-center">
                                        <div v-if="property.bInventorySold"
                                            class="tag py-1 px-4 inline-flex rounded font-medium text-primary-600 bg-primary-400 bg-opacity-30">
                                            Sold</div>
                                        <div v-if="!property.bInventorySold"
                                            class="tag py-1 px-4 inline-flex rounded font-medium text-red-600 bg-red-200">
                                            Unsold</div>
                                        <!-- {{ property.bInventorySold ? 'Sold' : 'Unsold' }} -->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Dialog>
                <!-- <Panel header="" toggleable @toggle="getAuctionProperties"> -->
            </div>
            <div class="border-l border-slate-300 bg-slate-50">
                <h3 class="px-6 h-20 flex items-center text-xl font-bold text-[var(--neutral-600)]">Bid History</h3>
                <div class="px-6 h-[calc(100vh_-_5rem)] overflow-auto">
                    <ul>
                        <li v-for="(copyData, index) in bidHistory" :key="index">
                            <div class="relative py-5 px-6 border border-slate-300 rounded-lg bg-white">
                                <div
                                    class="absolute top-0 right-5 py-0.5 px-3 rounded-b bg-slate-300 text-xs font-medium">
                                    Round: {{ copyData.roundNumber }}
                                </div>
                                <div class="item">Amount: <strong>{{ currencyFormat(copyData.quoteAmount) }}</strong>
                                </div>
                                <div class="item">@ <strong>{{ copyData.quoteTime }}</strong></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Dialog v-model:visible="visible1" modal header="Highest Bidder" :style="{ width: '30rem' }">
            <div class="text-center">
                You are the highest bidder.<br>
                Click on the <kbd class="bg-primary">OPEN ITEM SELECTION</kbd> button and select property of your
                interest
            </div>
            <template #footer>
                <Button label="Ok" @click="function1" autofocus />
                <!-- <Button label="Save" outlined severity="secondary" @click=" " autofocus /> -->
            </template>
        </Dialog>

        <Dialog
      v-model:visible="leaveAuctionVisible"
      modal
      header="Are you sure?"
      class="modal-confirm modal-confirm-danger"
      :closable="false"
    >
      <template #default>
        Are you sure you want to leave
        <strong>{{ auctionStore.auctionObj.vsAuctionCode }}</strong
        >?
      </template>
      <template #footer>
        <Button
          severity="grey"
          class="btn-grey"
          @click="leaveAuctionVisible = false"
          >Cancel</Button
        >
        <Button severity="danger" @click="close">Leave</Button>
      </template>
    </Dialog>

    </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeMount, watch } from 'vue';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import { createToaster } from "@meforma/vue-toaster"
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from 'primevue/confirmdialog';
import { useAuctionStore } from "../../store/Auction.js";
import { login } from "../../store/modules/login.js";
import moment from 'moment';
import axios from 'axios';
import MQL from '../../plugins/mql.js';

import { useRouter } from 'vue-router';
const router = useRouter();

const leaveAuctionVisible = ref(false);
const timeLeft = ref(null)
const auctionStore = useAuctionStore()
const confirm = useConfirm();
const confirm1 = useConfirm();
const loginStore = login()
const auctionDetails = ref([{
    auctionNumber: 1076,
    roundNumber: 1,
    roundStartTime: null,
    roundEndTime: null,
    placeBid: "",
    timeLeft: ""
}])
const itemSelectionTimeLeft = ref(0)
const time = ref(0)
const remaningTime = ref(0);
const selectedCategory = ref('')
const toaster = createToaster({ position: "top-right", duration: 3000 })
const visible = ref(false);
const visible1 = ref(false);
const visibleItemDetails = ref(false);
const visiblePropertyDetails = ref(false);
const bidFlag = ref(false)
const bidValue = ref(null)
const multiplieries = ref([])
const wsConnection = ref(null)
const isItemSelectionBtnDisable = ref(true)
const isHighestBidder = ref(false)
const connectionStatus = ref(null)
const clientLoginIpAddress = ref()
const count = ref(1);
const properties = ref([])
const itemDetails = ref({
    Description: "Therer bidder biddere ",
    CurrentRound: 1,
    StartValue: 378000,
    ModifierValue: 1000,
    MaxBidAmount: 100000,
    TotalNoOfBids: 0,
    itemSelectionTime: 0
})

const latestTime = ref();
const bidHistory = ref([]);


onMounted(() => {
    connectionStatus.value = navigator.onLine
    websocketConn()

})


function currencyFormat(value) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 15 }).format(value)
}

function leaveAuction() {
    // //router.push("BidderCurrentAuctions")
    // confirm1.require({
    //     // message: 'Are you sure you want to leave?',
    //     // header: 'Confirmation',
    //     message: 'You will not be able to participate in the bidding.',
    //     header: 'Are you sure?',
    //     // icon: 'pi pi-exclamation-triangle',
    //     rejectClass: 'btn-grey',
    //     rejectLabel: 'Cancel',
    //     acceptClass: 'btn-danger',
    //     acceptLabel: 'Leave',
    //     accept: () => {
    //         window.close()
    //     },
    //     reject: () => {
    //     }
    // });

    leaveAuctionVisible.value = true;
}

function close() {
//   console.log("Auction Leaving Log inside close fuction");
  // Auction Leaving Log
//   auctionLeavingLog(); 
//   console.log("Auction Leaving Log after auctionLeavingLog fuction");
  //window.close();
  goBack();
}

const goBack = () => {
  // Navigates one step back in the browser history
  // router.go(-1); 
  clearInterval(timeInterval.value)
  wsConnection.value.close(1000);
  router.push("/current-auction")
};

function checkH1(incomingBid) {
    // //console.log(incomingBid.bidderId, loginStore.loginId);
    if (incomingBid.bidderId == loginStore.loginId) {
        isHighestBidder.value = true
        // isItemSelectionBtnDisable.value = false
    } else {
        isHighestBidder.value = false
        // isItemSelectionBtnDisable.value = true
    }
}

function updateHistory(bidObject) {
    if (bidObject.bidderId) {
        let bidHistoryObj = {
            roundNumber: auctionDetails.value[0].roundNumber,
            quoteAmount: bidObject.bidAmount,
            quoteTime: latestTime.value
        }
        bidHistory.value.unshift(bidHistoryObj)
    }
}

// function function1() {
//     visible1.value = false
//     if (isHighestBidder.value = true) {
//         isItemSelectionBtnDisable.value = false
//     }
// }

function websocketConn() {
    wsConnection.value = new WebSocket(`wss://${window.location.host}/bidding-server-ws/ws/admin-auction`)

    // opening connection
    wsConnection.value.onopen = function () {
        wsConnection.value.send(
            JSON.stringify({
                token: 'Bearer ' + sessionStorage.getItem('user-token'),
                loginId: parseInt(loginStore.loginId),
                auctionId: parseInt(auctionStore.auctionObj.pklAuctionId),
                auctionPassword: (auctionStore.auctionObj.auctionPassword)
            })
        )
    }


    // adding message listener
    wsConnection.value.addEventListener('message', function (e) {
        var message
        message = JSON.parse(e.data)

        switch (true) { // Change this to status based code
            case message.typeCode === 200:
                auctionDetails.value[0].currentHigh = message.bidAmount
                auctionDetails.value[0].modifierValue = message.modifierValue
                auctionDetails.value[0].roundEndTime = message.roundEndTime
                auctionDetails.value[0].roundStartTime = message.roundStartTime
                checkH1(message)
                updateHistory(message)
                break

            case message.typeCode === 100:
                (message.error)
                // hot fix
                if (message.error === "You don't have enough EMD left to bid for a new property" ||
                    message.error === 'You have already joined this auction, If you have already left previous auction then please try again after 20 seconds') {
                    alert(message.error)
                    goBack();
                }
                break

            case message.typeCode === 400:
                // New Round has begun fetch auction details
                if (message.bidderId == loginStore.loginId) {
                    alert(`Congratulations the selected property has been sold to you.`)
                }
                // self.getAuctionDetals()
                break
            case message.typeCode === 500:
                // Auction has ended redirect to dashboard
                // self.leaveAuction()
                toaster.success('Auction Ended, Thank you for Participating!');
                //alert('Auction Ended, Thank you for Participating!')
                // self.$router.push({ name: 'vendorDashboard' })
                goBack();

                break
            case message.typeCode === 600:
                alert('The current auction has been cancelled abruptly by the department due to unavoidable circumstances. We regret for the inconvenience caused.')
                // self.$router.push({ name: 'vendorDashboard' })
                goBack();
                break

            default:
                checkH1(message)
                updateHistory(message)
        }
    })

    // adding error listener
    wsConnection.value.addEventListener('error', function (e) {
        //console.log(`ERROR: ${e} REASON ${e.reason} CODE ${e.code} WASCLEAN ${e.wasClean} MESSAGE ${e.message}`);
    })

    // adding close listener
    wsConnection.value.addEventListener('close', function (e) {
        //console.log(`CLOSE: ${e} REASON ${e.reason} CODE ${e.code} WASCLEAN ${e.wasClean} MESSAGE ${e.message}`);
    })
}

// const propertiesToBeSold = computed(() => properties.value.filter((p) => !p.bInventorySold))

// function submitProperty() {
//     visible.value = false;
//     isHighestBidder.value = false
//     isItemSelectionBtnDisable.value = true
//     if (selectedCategory.value !== '') {
//         wsConnection.value.send(
//             JSON.stringify({
//                 auctionId: parseInt(auctionStore.auctionObj.pklAuctionId),
//                 bidderId: parseInt(loginStore.loginId),
//                 auctionUserId: parseInt(auctionStore.auctionObj.pklAuctionUserId),
//                 roundNumber: parseInt(auctionDetails.value[0].roundNumber),
//                 auctionItemId: parseInt(selectedCategory.value),
//                 typeCode: parseInt(300)
//             })
//         )
//         toaster.success(`Selected Property is now allocated to you.`);

//     }
// }


watch(count, (newV) => {
    totalBid()
})



function totalBid() {
    // bidFlag.value = true
    bidValue.value = parseInt(auctionDetails.value[0].modifierValue) * parseInt(count.value);
}

async function bidPlaced() {
    bidFlag.value = false
    // //console.log(bidValue.value);
    let totalvalue = parseInt(bidValue.value) + parseInt(auctionDetails.value[0].currentHigh)
    count.value = 1
    // bidHistory.value.push(totalvalue)


    wsConnection.value.send(
        JSON.stringify({
            auctionId: parseInt(auctionStore.auctionObj.pklAuctionId),
            bidderId: parseInt(loginStore.loginId),
            auctionUserId: parseInt(auctionStore.auctionObj.pklAuctionUserId),
            roundNumber: parseInt(auctionDetails.value[0].roundNumber),
            currentPrice: parseInt(auctionDetails.value[0].currentHigh),
            roundEndTime: moment(auctionDetails.value[0].roundEndTime),
            roundStartTime: moment(auctionDetails.value[0].roundStartTime),
            bidAmount: parseInt(totalvalue),
            typeCode: parseInt(200),
            clientLoginIpAddress: clientLoginIpAddress.value
        })
    )
}


const openItemSelection = computed(() => {
    if (roundHasEnded.value == true && isHighestBidder.value == true && isItemSelectionBtnDisable.value == true && moment(latestTime.value, "DD/MM/YYYY hh:mm:ss A").isSameOrAfter(moment(auctionDetails.value[0].roundEndTime), 'second')) {
        return true
    } else {
        return false
    }
})

function openItem() {
    visible.value = true
    selectedCategory.value = ''
}

const roundHasStarted = computed(() => moment(auctionDetails.value[0].roundStartTime).isSameOrBefore(moment(latestTime.value, "DD/MM/YYYY hh:mm:ss A"), 'second'));
const roundHasEnded = computed(() => moment(auctionDetails.value[0].roundEndTime).isSameOrBefore(moment(latestTime.value, "DD/MM/YYYY hh:mm:ss A"), 'second'));
const isbidDisabled = ref(true);


watch(openItemSelection, (val) => {
    if (val) {
        visible1.value = true
    }
})

function syncTime() {
    axios.get('/bidding-server-http/o/time').then((res) => {
        confirm.close()
        latestTime.value = moment(res.data.ServerTime).format('DD/MM/YYYY hh:mm:ss A')
    }).catch(() => {
        confirm.require({
            header: 'It seems that you have lost internet connectivity',
            message: 'Please refresh your screen once you are reconnected to the internet.',
            icon: 'pi pi-exclamation-triangle',
            rejectClass: 'p-button-secondary p-button-outlined',
            acceptLabel: 'Reload',
            accept: () => {
                location.reload()
            },
            reject: () => {
            }
        })
    })
}

function nextRoundReservePrice() {
    return new Promise(async (resolve) => {
        // ** New Rules 
        let previousHRoundBid, RoundNumber
        if (auctionDetails.value[0].roundNumber == 1) {
            auctionDetails.value[0].currentHigh = auctionDetails.value[0].currentHigh
        } else if (auctionDetails.value[0].roundNumber >= 2) {
            RoundNumber = auctionDetails.value[0].roundNumber - 1
            previousHRoundBid = await getPreviousRoundHBid(RoundNumber, auctionStore.auctionObj.pklAuctionId, 1)
            if (previousHRoundBid.bidCount > 0) {
                if (previousHRoundBid.hnBidAmount > 0) {
                    auctionDetails.value[0].currentHigh = previousHRoundBid.hnBidAmount
                } else {
                    auctionDetails.value[0].currentHigh = auctionDetails.value[0].currentHigh
                }
            } else {
                RoundNumber = auctionDetails.value[0].roundNumber - 2
                previousHRoundBid = await getPreviousRoundHBid(RoundNumber, auctionStore.auctionObj.pklAuctionId, 2)
                if (previousHRoundBid.bidCount > 0) {
                    if (previousHRoundBid.hnBidAmount > 0) {
                        auctionDetails.value[0].currentHigh = previousHRoundBid.hnBidAmount
                    } else {
                        auctionDetails.value[0].currentHigh = auctionDetails.value[0].currentHigh
                    }
                } else {
                    auctionDetails.value[0].currentHigh = auctionDetails.value[0].currentHigh
                }
            }
        }
        resolve()
    })
}

const fetchItemDetails = () => {
    new MQL()
        .useCoreServer()
        .setActivity("r.[FetchDataForBidding]")
        .setData({ "auctionId": auctionStore.auctionObj.pklAuctionId, "userId": loginStore.loginId })
        .fetch()
        .then(async (rs) => {
            let res = rs.getActivity("FetchDataForBidding", true)
            if (rs.isValid("FetchDataForBidding")) {
                itemDetails.value.Description = res.result.inventoryDetails.auctionDescription
                itemDetails.value.CurrentRound = res.result.inventoryDetails.currentRoundNumber
                itemDetails.value.StartValue = res.result.inventoryDetails.startValue
                itemDetails.value.ModifierValue = res.result.inventoryDetails.modifierValue
                itemDetails.value.MaxBidAmount = 100 * res.result.inventoryDetails.modifierValue
                itemDetails.value.TotalNoOfBids = res.result.auctionHistory.length
                itemDetails.value.numberOfRounds = res.result.inventoryDetails.numberOfRounds
                itemDetails.value.itemSelectionTime = parseInt(res.result.inventoryDetails.itemSelectionTime)
            } else {
                rs.showErrorToast("FetchDataForBidding")
            }
        })
}


const fetchProperties = () => {
    new MQL()
        .useCoreServer()
        .setActivity("r.[FetchDataForBidding]")
        .setData({ "auctionId": auctionStore.auctionObj.pklAuctionId, "userId": loginStore.loginId })
        .fetch()
        .then(async (rs) => {
            let res = rs.getActivity("FetchDataForBidding", true)
            if (rs.isValid("FetchDataForBidding")) {

                properties.value = res.result.propertyDetails

            } else {
                rs.showErrorToast("FetchDataForBidding")
            }
        })
}

function fetchAuctionDetails() {
    return new Promise((resolve) => {
        // Automatically generated
        new MQL()
            .useCoreServer()
            .setActivity("r.[FetchDataForBidding]")
            .setData({ "auctionId": auctionStore.auctionObj.pklAuctionId, "userId": loginStore.loginId })
            .enablePageLoader(true)
            .fetch()
            .then(async (rs) => {
                let res = rs.getActivity("FetchDataForBidding", true)
                if (rs.isValid("FetchDataForBidding")) {

                    properties.value = res.result.propertyDetails
                    bidHistory.value = res.result.auctionHistoryAdmin

                    isItemSelectionBtnDisable.value = true
                    isHighestBidder.value = false
                    visible.value = false
                    visible1.value = false

                    itemDetails.value.Description = res.result.inventoryDetails.auctionDescription
                    itemDetails.value.CurrentRound = res.result.inventoryDetails.currentRoundNumber
                    itemDetails.value.StartValue = res.result.inventoryDetails.startValue
                    itemDetails.value.ModifierValue = res.result.inventoryDetails.modifierValue
                    itemDetails.value.MaxBidAmount = 100 * res.result.inventoryDetails.modifierValue
                    itemDetails.value.TotalNoOfBids = res.result.auctionHistory.length
                    itemDetails.value.numberOfRounds = res.result.inventoryDetails.numberOfRounds
                    itemDetails.value.itemSelectionTime = parseInt(res.result.inventoryDetails.itemSelectionTime)

                    auctionDetails.value[0].roundStartTime = res.result.inventoryDetails.currentRoundStartTime
                    auctionDetails.value[0].roundEndTime = res.result.inventoryDetails.currentRoundEndTime
                    auctionDetails.value[0].currentHigh = res.result.inventoryDetails.currentHigh
                    auctionDetails.value[0].modifierValue = res.result.inventoryDetails.modifierValue
                    auctionDetails.value[0].roundNumber = res.result.inventoryDetails.currentRoundNumber

                    clientLoginIpAddress.value = res.result.fetchIPAddress.clientLoginIpAddress

                    if (res.result.inventoryDetails.currentHighestBidderId == loginStore.loginId) {
                        isHighestBidder.value = true
                    }

                    if (res.result.inventoryDetails.BidCount == 'NO_BID') {
                        auctionDetails.value[0].currentHigh = res.result.inventoryDetails.startValue

                        // await nextRoundReservePrice()
                    }

                    resolve()
                } else {
                    rs.showErrorToast("FetchDataForBidding")
                }
            })
    })

}

function getPreviousRoundHBid(roundNumber, auctionId, offset) {
    return new Promise((resolve) => {
        let data = {
            "roundNumber": String(roundNumber),
            "auctionId": String(auctionId),
            "offset": String(offset)
        }

        // Automatically generated
        new MQL()
            .useCoreServer()
            .setActivity("o.[GetPreviousRoundHBid]")
            .setData(data)
            .fetch()
            .then(rs => {
                let res = rs.getActivity("GetPreviousRoundHBid", true)
                if (rs.isValid("GetPreviousRoundHBid")) {
                    //console.log(res.result);
                    resolve(res.result)
                } else {
                    rs.showErrorToast("GetPreviousRoundHBid")
                }
            })

    })

}

async function updateAuctionTimeLeft() {


    var msg;
    var finalMsg
    remaningTime.value = roundHasStarted.value ? moment(auctionDetails.value[0].roundEndTime).diff(moment(latestTime.value, 'DD/MM/YYYY hh:mm:ss A')) : moment(auctionDetails.value[0].roundStartTime).diff(moment(latestTime.value, 'DD/MM/YYYY hh:mm:ss A'));

    itemSelectionTimeLeft.value = moment(auctionDetails.value[0].roundEndTime).add(itemDetails.value.itemSelectionTime, 'm').diff(moment(latestTime.value, 'DD/MM/YYYY hh:mm:ss A'))
    // //console.log("TL", itemSelectionTimeLeft);

    time.value = `${moment.duration(itemSelectionTimeLeft.value).hours()}:${moment.duration(itemSelectionTimeLeft.value).minutes()}:${moment.duration(itemSelectionTimeLeft.value).seconds()}`
    // //console.log("Time", time);

    // auction start or next round start
    if (!roundHasStarted.value && !roundHasEnded.value) {
        if (itemDetails.value.CurrentRound == 1) {
            msg = 'The auction will start in'
        } else {
            msg = 'Next round will start in'
        }
        if (moment.duration(remaningTime.value).hours()) {
            finalMsg = `${msg} <b class='text-red-400 font-bold'>${moment.duration(remaningTime.value).hours()} hrs:${moment.duration(remaningTime.value).minutes()} mins:${moment.duration(remaningTime.value).seconds()} secs</b>`;
        } else {
            finalMsg = `${msg} <b class='text-red-400 font-bold'>${moment.duration(remaningTime.value).minutes()} mins:${moment.duration(remaningTime.value).seconds()} secs </b>`;
        }
        timeLeft.value.innerHTML = finalMsg
        // round has started
    } else if (roundHasStarted.value && !roundHasEnded.value) {
        msg = 'The round will end in'
        if (moment.duration(remaningTime.value).hours()) {
            finalMsg = `${msg} <b class='text-red-400 font-bold'>${moment.duration(remaningTime.value).hours()} hrs:${moment.duration(remaningTime.value).minutes()} mins:${moment.duration(remaningTime.value).seconds()} secs</b>`;
        } else {
            finalMsg = `${msg} <b class='text-red-400 font-bold'>${moment.duration(remaningTime.value).minutes()} mins:${moment.duration(remaningTime.value).seconds()} secs </b>`;
        }
        timeLeft.value.innerHTML = finalMsg
        // last round has ended or some round has ended in item selection time
    } else if (roundHasEnded.value && roundHasStarted.value) {
        if (itemDetails.value.CurrentRound == itemDetails.value.numberOfRounds) {
            msg = 'The auction will end in'
        } else {
            msg = 'Next round will start in'
        }
        if (moment.duration(itemSelectionTimeLeft.value).hours()) {
            finalMsg = `${msg} <b  class='text-red-400 font-bold'>${moment.duration(itemSelectionTimeLeft.value).hours()} hrs:${moment.duration(itemSelectionTimeLeft.value).minutes()} mins:${moment.duration(itemSelectionTimeLeft.value).seconds()} secs</b>`;
        } else {
            finalMsg = `${msg} <b  class='text-red-400 font-bold'>${moment.duration(itemSelectionTimeLeft.value).minutes()} mins:${moment.duration(itemSelectionTimeLeft.value).seconds()} secs </b>`;
        }
        timeLeft.value.innerHTML = finalMsg
    }




    if (roundHasStarted.value && !roundHasEnded.value) {
        isbidDisabled.value = false; // Auction is ongoing, enable bidding
    } else {
        isbidDisabled.value = true; // Auction has not started yet or has ended, disable bidding
    }

    if (itemSelectionTimeLeft.value < 0) {
        await fetchAuctionDetails()
        // await nextRoundReservePrice()
    }

}

const makeMultiplieries = () => {
    for (var i = 1; i <= 100; i++) {
        multiplieries.value.push({
            'text': i,
            'value': i
        });
    }
}
const timeInterval = ref(null)
onBeforeMount(async () => {
    await fetchAuctionDetails()
    timeInterval.value = setInterval(() => {
        syncTime()
        updateAuctionTimeLeft()
    }, 1000);
    makeMultiplieries()
    totalBid()
});

</script>

<!-- <style>
.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

.server-time {
    font-size: 18px;
    font-weight: bold;
    color: red;
}

.leave-auction {
    margin-right: 20px;
    /* Adjust margin as needed */
}

.error-msg {
    color: red;
}
</style> -->
