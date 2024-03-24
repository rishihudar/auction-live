<template>
    <div>
        <!-- <Toast/> -->
        <strong>
            <h1>Auction Bidding</h1>
            <h4>IP: {{ clientLoginIpAddress }}</h4>
            <div class="my-5 flex item-center justify-between">
                <div class="py-3 px-10 server-time bg-red-100 rounded-md border border-red-400">
                    <p>Server Time: {{ latestTime }}</p>
                </div>
                <div class="leave-auction">
                    <Button @click="leaveAuction()">Leave Auction</Button>
                </div>
            </div>
        </strong>

        <!-- Auction Details -->
        <div class="mb-5 bg-white shadow rounded-md">
            <h3 class="py-5 px-5 text-2xl font-bold text-[var(--neutral-600)]"><strong>Auction Information</strong></h3>
            <div class="grid grid-cols-2">
                <div class="py-4 px-5 flex flex-col border-t border-r">
                    <span class="text-sm">Auction Code :</span>
                    <span class="text-lg font-semibold text-[var(--neutral-600)]">
                        <!-- {{ auctionStore.auctionObj.pklAuctionId }} -->
                        {{ auctionStore.auctionObj.vsAuctionCode }}
                    </span>
                </div>
                <div class="py-4 px-5 flex flex-col border-t">
                    <span class="text-sm">Round Number :</span>
                    <span class="text-lg font-semibold text-[var(--neutral-600)]">
                        {{ auctionDetails[0].roundNumber }}
                    </span>
                </div>
                <div class="py-4 px-5 flex flex-col border-t col-span-full">
                    <span class="text-sm">Item Details:</span>
                    <span class="text-lg font-semibold text-[var(--neutral-600)]">
                        {{ auctionStore.auctionObj.inventoryCategoryName }} :
                        {{ auctionStore.auctionObj.inventoryHirarchy }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Bid History Table -->
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
                        <span>{{ data.currentHigh }}</span>
                    </div>
                </template>
            </Column>
            <Column field="timeLeft" header="Time Left"><template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>
                            {{ roundHasStarted }} | {{ roundHasEnded }} <br />
                            {{ auctionDetails[0].roundStartTime }} |{{ auctionDetails[0].roundEndTime }}
                            <!-- Auction is in progress -->
                            <p v-if="roundHasStarted && !roundHasEnded">
                                <b>The Round Will End In:</b> {{ data.timeLeft }}
                            </p>

                            <!-- Auction has not started yet -->
                            <p v-else-if="!roundHasStarted && !roundHasEnded">
                                <b>The Round Will Start In:</b> {{ data.timeLeft }}
                            </p>

                            <!-- Auction has ended -->
                            <p v-if="roundHasEnded">
                                <b>Round has ended.</b>
                            </p>
                        </span>
                    </div>
                </template>
            </Column>
        </DataTable>

        <!--item selection-->
        <div class="my-3 text-center">
            <Button label="Open item selection" :disabled="isItemSelectionBtnDisable"
                @click="openItem()"></Button>
        </div>

        <Dialog v-model:visible="visible" maximizable modal header="Item Selection" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div v-for="category in properties" :key="category.pklAuctionItemsDetails">
                <RadioButton v-model="selectedCategory"  name="dynamic" :value="category.pklAuctionItemsDetails" />
                <label :for="category.pklAuctionItemsDetails" class="ml-2">{{ category.vsInventoryName }}</label>
            </div>
            <Button label="Submit" @click="submitProperty()"></Button>
        </Dialog>

        <div class="card">
            <Panel header="Bid History" toggleable>
                <ul>
                    <li v-for="(copyData, index) in bidHistory" :key="index">
                        Round : <strong>{{ copyData.roundNumber }}</strong>
                        Amt: <strong class="my-2">₹ {{ copyData.quoteAmount }}</strong>
                        @ <strong>{{ copyData.quoteTime }}</strong>
                    </li>
                    <!-- </li> -->
                </ul>
            </Panel>
            <Panel header="Item Details" toggleable>
                <ul>
                    <li>Description : <b>{{ itemDetails.Description }}</b></li>
                    <li>CurrentRound : <b>{{ itemDetails.CurrentRound }}</b></li>
                    <li>StartValue : <b>{{ itemDetails.StartValue }}</b></li>
                    <li>ModifierValue : <b>{{ itemDetails.ModifierValue }}</b></li>
                    <li>MaxBidAmount : <b>{{ itemDetails.MaxBidAmount }}</b></li>
                    <li>TotalNoOfBids : <b>{{ itemDetails.TotalNoOfBids }}</b></li>
                </ul>
            </Panel>
            <Panel header="Property Details" toggleable>
                <p>
                    <strong>{{ auctionStore.auctionObj.inventoryCategoryName }}</strong> :
                    {{ auctionStore.auctionObj.inventoryHirarchy }}
                </p>
                <ul>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>
                                    Property Name
                                </th>
                                <th>
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="property in properties" :key="property.pklAuctionItemsDetails">
                                <td> <strong>{{ property.vsInventoryName }}</strong> </td>
                                <td> {{ property.bInventorySold ? 'Sold' : 'Unsold' }} </td>
                            </tr>
                        </tbody>
                    </table>
                </ul>
            </Panel>
        </div>
        <div>
            <Dialog v-model:visible="visible1" modal header="Edit Profile" :style="{ width: '50rem' }">
            
                <div>
                    <strong class="text-center">
                    You are the highest bidder.
                    Click on the <kbd class="bg-primary">OPEN ITEM SELECTION</kbd>   button and select property of your interest
                    </strong>
                </div>
                <template #footer>
                    <Button label="Ok" text severity="secondary" @click="visible1 = false, isItemSelectionBtnDisable = false" autofocus />
                    <!-- <Button label="Save" outlined severity="secondary" @click=" " autofocus /> -->
                </template>
            </Dialog>     
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeMount, watch } from 'vue';
import Dialog from 'primevue/dialog';
import RadioButton from 'primevue/radiobutton';
import Dropdown from 'primevue/dropdown'
import DataTable from 'primevue/datatable';
import Panel from 'primevue/panel';
import { createToaster } from "@meforma/vue-toaster"
import { useAuctionStore } from "../../store/Auction.js";
import { login } from "../../store/modules/login.js";
import moment from 'moment';
import axios from 'axios';
import MQL from '../../plugins/mql.js';


const auctionStore = useAuctionStore()
const loginStore = login()
const auctionDetails = ref([{
    auctionNumber: 1076,
    roundNumber: 1,
    roundStartTime: null,
    roundEndTime: null,
    placeBid: "",
    timeLeft: ""
}])
const selectedCategory = ref('')
const toaster = createToaster({ position: "top-right", duration: 3000 })
const visible = ref(false);
const visible1 = ref(false);
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
    TotalNoOfBids: 0
})

const categories = ref([
    { name: 'Flat No 101', key: 'A' },
    { name: 'Flat No 102', key: 'M' },
    { name: 'Flat No 103', key: 'P' },
    { name: 'Flat No 104', key: 'R' }
]);

const latestTime = ref();
const bidHistory = ref([]);


onMounted(() => {
    connectionStatus.value = navigator.onLine
    websocketConn()
})
function leaveAuction() {
    //router.push("BidderCurrentAuctions")
    // window.close()
}

function checkH1(incomingBid) {
    console.log(incomingBid.bidderId,loginStore.loginId);
    if (incomingBid.bidderId == loginStore.loginId) {
        isHighestBidder.value = true
        // isItemSelectionBtnDisable.value = false
    } else {
        isHighestBidder.value = false
        // isItemSelectionBtnDisable.value = true
    }
}

function updateHistory(bidObject) {
    if (bidObject.bidderId == loginStore.loginId) {
        let bidHistoryObj = {
            roundNumber: auctionDetails.value[0].roundNumber,
            quoteAmount: bidObject.bidAmount,
            quoteTime: latestTime.value
        }
        bidHistory.value.unshift(bidHistoryObj)
    }
}

function websocketConn() {


    wsConnection.value = new WebSocket(`ws://${window.location.host}/bidding-server-ws/ws/admin-auction`)


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
                    // window.close()
                }
                break
            case message.typeCode === 400:
                // New Round has begun fetch auction details
                if (message.bidderId === self.loginId) {
                    alert(`Congratulations the selected property has been sold to you.`)
                }
                // self.getAuctionDetals()
                break
            case message.typeCode === 500:
                // Auction has ended redirect to dashboard
                // self.leaveAuction()
                alert('Auction Ended, Thank you for Participating!')
                // self.$router.push({ name: 'vendorDashboard' })
                // window.close()

                break
            case message.typeCode === 600:
                alert('The current auction has been cancelled abruptly by the department due to unavoidable circumstances. We regret for the inconvenience caused.')
                // self.$router.push({ name: 'vendorDashboard' })
                // window.close()

                break

            default:
            // self.checkH1(message)
            // self.updateHistory(message)
        }
    })
}

function submitProperty() {
    visible.value = false;
    if (selectedCategory.value !== '') {  
        wsConnection.value.send(
        JSON.stringify({
          auctionId: parseInt(auctionStore.auctionObj.pklAuctionId),
          bidderId: parseInt(loginStore.loginId),
          auctionUserId: parseInt(auctionStore.auctionObj.pklAuctionUserId),
          roundNumber: parseInt(auctionDetails.value[0].roundNumber),
          auctionItemId: parseInt(selectedCategory.value),
          typeCode: parseInt(300)
        })
      )  
    //   (${selectedCategory.value})
        toaster.success(`Selected Property is now allocated to you.`);

    }
}


watch(count, (newV) => {
    totalBid()
})



function totalBid() {
    bidFlag.value = true
    bidValue.value = parseInt(auctionDetails.value[0].modifierValue) * parseInt(count.value);
}

async function bidPlaced() {
    bidFlag.value = false
    console.log(bidValue.value);
    let totalvalue = bidValue.value + auctionDetails.value[0].currentHigh
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
            bidAmount: totalvalue,
            itemReservedPrice: 100,
            typeCode: parseInt(200),
            clientLoginIpAddress: clientLoginIpAddress.value
        })
    )
}


const openItemSelection = computed(() => {
    if (roundHasEnded.value == true && isHighestBidder.value == true && isItemSelectionBtnDisable.value == true && moment(latestTime.value,"DD/MM/YYYY hh:mm:ss A").isSameOrAfter(moment(auctionDetails.value[0].roundEndTime),'second')) {
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
        latestTime.value = moment(res.data.ServerTime).format('DD/MM/YYYY hh:mm:ss A')
    })
}

function fetchAuctionDetails() {
    return new Promise((resolve) => {
        // Automatically generated
        new MQL()
            .useCoreServer()
            .setActivity("r.[FetchDataForBidding]")
            .setData({ "auctionId": auctionStore.auctionObj.pklAuctionId, "userId": loginStore.loginId })
            .fetch()
            .then(async (rs) => {
                let res = rs.getActivity("FetchDataForBidding", true)
                if (rs.isValid("FetchDataForBidding")) {

                    properties.value = res.result.propertyDetails
                    bidHistory.value = res.result.auctionHistory

                    itemDetails.value.Description = res.result.inventoryDetails.auctionDescription
                    itemDetails.value.CurrentRound = res.result.inventoryDetails.currentRoundNumber
                    itemDetails.value.StartValue = res.result.inventoryDetails.auctionItemReservePrice
                    itemDetails.value.ModifierValue = res.result.inventoryDetails.modifierValue
                    itemDetails.value.MaxBidAmount = 100 * res.result.inventoryDetails.modifierValue
                    itemDetails.value.TotalNoOfBids = res.result.auctionHistory.length

                    auctionDetails.value[0].roundStartTime = res.result.inventoryDetails.currentRoundStartTime
                    auctionDetails.value[0].roundEndTime = res.result.inventoryDetails.currentRoundEndTime
                    auctionDetails.value[0].currentHigh = res.result.inventoryDetails.currentHigh
                    auctionDetails.value[0].modifierValue = res.result.inventoryDetails.modifierValue
                    auctionDetails.value[0].roundNumber = res.result.inventoryDetails.currentRoundNumber

                    clientLoginIpAddress.value = res.result.fetchIPAddress.clientLoginIpAddress


                    // ** New Rules 
                    let previousHRoundBid
                    if (auctionDetails.value[0].roundNumber == 1) {
                        // this.curr_highest = this.auctionDetails[0].currentHigh
                    } else if (auctionDetails.value[0].roundNumber >= 2) {
                        let RoundNumber = auctionDetails.value[0].roundNumber - 1
                        previousHRoundBid = await getPreviousRoundHBid(RoundNumber, auctionStore.auctionObj.pklAuctionId, 1)
                        if (previousHRoundBid.bidCount > 0) {
                            if (previousHRoundBid.hnBidAmount > 0) {
                                auctionDetails.value[0].currentHigh = previousHRoundBid.hnBidAmount
                            } else {
                                // auctionDetails.value[0].currentHigh = this.auctionDetails[0].currentHigh
                            }
                        } else {
                            let RoundNumber = auctionDetails.value[0].roundNumber - 2
                            previousHRoundBid = await getPreviousRoundHBid(RoundNumber, auctionStore.auctionObj.pklAuctionId, 2)
                            if (previousHRoundBid.bidCount > 0) {
                                if (previousHRoundBid.hnBidAmount > 0) {
                                    auctionDetails.value[0].currentHigh = previousHRoundBid.hnBidAmount
                                } else {
                                    // auctionDetails.value[0].currentHigh = this.auctionDetails[0].currentHigh
                                }
                            } else {
                                // auctionDetails.value[0].currentHigh = this.auctionDetails[0].currentHigh
                            }
                        }
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
            .setActivity("r.[GetPreviousRoundHBid]")
            .setData(data)
            .fetch()
            .then(rs => {
                let res = rs.getActivity("GetPreviousRoundHBid", true)
                if (rs.isValid("GetPreviousRoundHBid")) {
                    resolve(res)
                } else {
                    rs.showErrorToast("GetPreviousRoundHBid")
                }
            })

    })

}

function updateAuctionTimeLeft() {

    let remaningTime = roundHasStarted.value ? moment(auctionDetails.value[0].roundEndTime).diff(moment(latestTime.value, 'DD/MM/YYYY hh:mm:ss A')) : moment(auctionDetails.value[0].roundStartTime).diff(moment(latestTime.value, 'DD/MM/YYYY hh:mm:ss A'));
    auctionDetails.value[0].timeLeft = `${moment(remaningTime).minutes()}:${moment(remaningTime).seconds()}`;
    console.log();
    if (roundHasStarted.value && !roundHasEnded.value) {
        isbidDisabled.value = false; // Auction is ongoing, enable bidding
    } else {
        isbidDisabled.value = true; // Auction has not started yet or has ended, disable bidding
    }

}

onBeforeMount(async () => {
    await fetchAuctionDetails()
    setInterval(() => {
        syncTime()
        updateAuctionTimeLeft()
    }, 1000);

    for (var i = 1; i <= 100; i++) {
        multiplieries.value.push({
            'text': i,
           'value': i
        });
    }
    // setInterval(updateAuctionTimeLeft, 1000);
});

</script>

<style>
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
</style>
