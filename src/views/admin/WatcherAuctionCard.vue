<template>
  <div>
    <!-- Leave Auction dialog -->
    <Dialog
      v-model:visible="leaveAuctionVisible"
      modal
      header="Are you sure you want to leave?"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #default>
        Are you sure you want to leave
        <strong>{{ auctionDetails.auctionCode }}</strong
        >?
        <Button @click="leaveAuctionVisible = false">Cancel</Button>
        <Button @click="leaveAuctionFinal">Leave</Button>
      </template>
    </Dialog>

    <!-- Highest Bidder Dialog 1 -->
    <Dialog
      v-model:visible="highestBidderVisible"
      modal
      header="Highest Bidder"
      :style="{ width: '50rem' }"
    >
      <div>
        <strong class="text-center">
          You are the highest bidder. For Auction
          {{ auctionDetails.auctionCode }} Click on the
          <kbd class="bg-primary">OPEN ITEM SELECTION</kbd> button and select
          property of your interest
        </strong>
      </div>
      <template #footer>
        <Button
          label="Ok"
          text
          severity="secondary"
          @click="function1"
          autofocus
        />
      </template>
    </Dialog>

    <!-- Selection Property Dialog -->
    <Dialog
      v-model:visible="propertyVisible"
      maximizable
      modal
      header="Item Selection"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <h2>{{ auctionDetails.auctionCode }}</h2>
      <h4>
        You have been highest quoted bidder for this round. Please select the
        property of your interest.
      </h4>
      <br />

      Item Details:
      <b
        >{{ auctionStore.auctionObj.inventoryCategoryName }} :
        {{ auctionStore.auctionObj.inventoryHirarchy }}</b
      >
      <br />
      <b class="float-right">
        Select property in: <span style="color: red">{{ time }} </span>
      </b>
      <br />
      <div
        v-for="property in propertiesToBeSold"
        :key="property.pklAuctionItemsDetails"
      >
        <RadioButton
          v-model="selectedCategory"
          name="dynamic"
          :value="property.pklAuctionItemsDetails"
          :disabled="property.bInventorySold"
        />
        <label :for="property.pklAuctionItemsDetails" class="ml-2">{{
          property.vsInventoryName
        }}</label>
      </div>
      <Button label="Submit" @click="submitProperty()"></Button>
    </Dialog>

    <table
      class="table table-auction bg-white"
      :class="{ 'show-details': showDetails }"
    >
      <thead>
        <tr>
          <th colspan="5">
            <div class="ta-header flex items-center">
              <div
                class="ta-header-title text-2xl font-bold text-[var(--neutral-600)]"
              >
                Auction Code: {{ auctionDetails.auctionCode }}
              </div>
              <div class="ta-header-action ml-auto">
                <Button>Total: {{ totalCount }}</Button>
                <Button>Joined:{{ totalJoined }}</Button>
                <!-- <span class="mr-4 font-normal">{{ auctionDetails.auctionId }}</span> -->
                <Button severity="danger" class="btn-sm" @click="leaveAuction">
                  <fa-arrow-right-from-bracker></fa-arrow-right-from-bracker>
                  Leave
                </Button>
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th colspan="5">
            <div class="ta-subtitle flex items-center">
              <div
                class="ta-subtitle-title text-base font-semibold text-[var(--neutral-600)]"
              >
                {{ properties[0]?.vsInventoryCategoryName }}:
                {{ properties[0]?.inventoryHierarchy }}
              </div>
              <div
                class="ta-subtitle-info ml-auto text-base text-[var(--neutral-600)]"
              >
                Round: {{ auctionDetails.currentRound }} of
                {{ auctionDetails.numberOfRounds }}
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th>Current High</th>
          <th>Modifier Value</th>
          <!-- <th>Place Bid</th> -->
          <th>Time Left</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ currencyFormat(auctionDetails.currentHigh) }}</td>
          <td>{{ auctionDetails.modifierValue }}</td>

          <td><span class="time-holder" ref="timeLeft"></span></td>
          <td>
            <div
              class="flex flex-wrap flex-col gap-1 items-center justify-center"
            >
              <!-- <Button
                label="Item Selection"
                :disabled="isItemSelectionBtnDisable"
                @click="openItem()"
                class="btn-sm"
              ></Button> -->
              <Button
                :label="showDetails ? 'Hide Details' : 'View Details'"
                severity="secondary"
                class="btn-sm"
                @click="showDetails = !showDetails"
              ></Button>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="5" class="p-0">
            <div class="details-holder grid grid-cols-3">
              <div class="dh-item bid-history">
                <div class="dh-title">Bid History</div>
                <div class="dh-content">
                  <ul>
                    <li v-for="(copyData, index) in bidHistory" :key="index">
                      Round : <strong>{{ copyData.roundNumber }}</strong> Amt:
                      <strong class="my-2">{{
                        currencyFormat(copyData.quoteAmount)
                      }}</strong>
                      @ <strong>{{ copyData.quoteTime }}</strong> ,<strong>{{
                        copyData.clientIPAddress
                      }}</strong>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="dh-item item-details">
                <div class="dh-title">Item Details</div>
                <div class="dh-content">
                  <ul>
                    <li>
                      Description : <b>{{ auctionDetails.description }}</b>
                    </li>
                    <li>
                      CurrentRound : <b>{{ auctionDetails.currentRound }}</b>
                    </li>
                    <li>
                      StartValue : <b>{{ auctionDetails.startValue }}</b>
                    </li>
                    <li>
                      ModifierValue : <b>{{ auctionDetails.modifierValue }}</b>
                    </li>
                    <li>
                      MaxBidAmount : <b>{{ auctionDetails.maxBidAmount }}</b>
                    </li>
                    <li>
                      TotalNoOfBids : <b>{{ bidHistory.length }}</b>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="dh-item property-details">
                <div class="dh-title flex gap-2 items-center justify-between">
                  Property Details
                  <div class="dh-title-info flex gap-2.5 items-center">
                    <div class="dh-ti-item flex gap-1 items-center">
                      <div
                        class="dh-ti-shape w-4 h-4 border border-emerald-700 rounded-[3px] bg-emerald-700 bg-opacity-40"
                      ></div>
                      <div
                        class="dh-ti-text text-sm font-normal text-[var(--neutral-200)]"
                      >
                        Sold
                      </div>
                    </div>
                    <div class="dh-ti-item flex gap-1 items-center">
                      <div
                        class="dh-ti-shape w-4 h-4 border border-rose-700 rounded-[3px] bg-rose-700 bg-opacity-40"
                      ></div>
                      <div
                        class="dh-ti-text text-sm font-normal text-[var(--neutral-200)]"
                      >
                        Unsold
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dh-content">
                  <div class="dh-tags flex flex-wrap gap-1 items-center">
                    <span
                      v-for="item in properties"
                      :key="item.fklInventoryId"
                      class="px-2 py-1 rounded text-sm font-medium bg-opacity-20"
                      :class="{
                        'text-emerald-700 bg-emerald-700': item.bInventorySold,
                        'text-rose-700 bg-rose-700': !item.bInventorySold,
                      }"
                      >{{ item.vsInventoryName }}</span
                    >
                  </div>
                  <!-- <DataTable showGridlines :value="properties">
                                        <Column field="vsInventoryName" header="Property Name"></Column>
                                        <Column field="bInventorySold" header="Status">
                                            <template #body="row">
                                                <span :class="{ 'font-bold text-green-600': row.data.bInventorySold, 'font-bold text-red-600': !row.data.bInventorySold }">{{ row.data.bInventorySold ? 'Sold' : 'Unsold' }}</span>
                                            </template>
                                        </Column>
                                    </DataTable> -->
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <Card class="mt-5 min-w-min max-w-full hidden">
      <template #header>
        <div class="pt-4 flex justify-evenly">
          <p class="text-xs font-bold">
            Auction Code: {{ auctionDetails.auctionCode }}
          </p>
          <p class="text-xs font-bold">
            Auction Id: {{ auctionDetails.auctionId }}
          </p>
          <p class="text-xs font-bold">
            Round: {{ auctionDetails.currentRound }} of
            {{ auctionDetails.numberOfRounds }}
          </p>
          <Button
            label="Leave Auction"
            class="max-w-min"
            @click="leaveAuction"
          ></Button>
        </div>
      </template>
      <template #content>
        <!-- Table -->
        <DataTable showGridlines :value="[{}]">
          <Column header="Current High">
            <template #body="">
              <div class="flex align-items-center gap-2">
                <span>{{ currencyFormat(auctionDetails.currentHigh) }}</span>
              </div>
            </template>
          </Column>
          <Column header="Time Left">
            <template #body="">
              <div class="flex align-items-center gap-2">
                <!-- <span ref="timeLeft"></span> -->
              </div>
            </template>
          </Column>
        </DataTable>

        <!-- Item Selection Button -->
        <div class="my-3 text-center">
          <Button
            label="Open item selection"
            :disabled="isItemSelectionBtnDisable"
            @click="openItem()"
          ></Button>
        </div>

        <!-- Accordian for Bidding -->
        <Accordion
          @update:activeIndex="activeIndexOpen"
          :activeIndex="isAuctionActive"
        >
          <AccordionTab header="Place Bid">
            <template #default>
              <div class="flex align-items-center gap-2">
                <div class="flex flex-col">
                  <span>
                    Modifier value : {{ auctionDetails.modifierValue }}
                  </span>
                  <span
                    class="font-black"
                    v-if="bidFlag && !roundHasEnded && count"
                  >
                    {{ currencyFormat(bidValue) }}
                  </span>
                </div>
                <span v-if="bidFlag && !roundHasEnded">
                  <Dropdown
                    v-model="count"
                    :options="multiplieries"
                    optionLabel="text"
                    optionValue="value"
                    placeholder="Multiplier"
                    class="w-full md:w-14rem"
                  />
                </span>
                <Button
                  v-if="!bidFlag || roundHasEnded"
                  :disabled="isbidDisabled"
                  @click="bidFlag = true"
                  >Bid</Button
                >
                <!-- <Button
                  v-if="bidFlag && !roundHasEnded"
                  :disabled="!count"
                  @click="bidPlaced()"
                >
                  Place Bid
                </Button> -->
              </div>

              <!-- Other details -->
              <TabView>
                <!-- Bid History -->
                <TabPanel header="Bid History">
                  <template #default>
                    <div class="max-h-36 overflow-y-scroll">
                      <ul>
                        <li
                          v-for="(copyData, index) in bidHistory"
                          :key="index"
                        >
                          Round :
                          <strong>{{ copyData.roundNumber }}</strong> Amt:
                          <strong class="my-2">{{
                            currencyFormat(copyData.quoteAmount)
                          }}</strong>
                          @ <strong>{{ copyData.quoteTime }}</strong>
                        </li>
                      </ul>
                    </div>
                  </template>
                </TabPanel>
                <TabPanel header="Item Details">
                  <template #default>
                    <div class="max-h-36 overflow-y-scroll">
                      <ul>
                        <li>
                          Description : <b>{{ auctionDetails.description }}</b>
                        </li>
                        <li>
                          CurrentRound :
                          <b>{{ auctionDetails.currentRound }}</b>
                        </li>
                        <li>
                          StartValue : <b>{{ auctionDetails.startValue }}</b>
                        </li>
                        <li>
                          ModifierValue :
                          <b>{{ auctionDetails.modifierValue }}</b>
                        </li>
                        <li>
                          MaxBidAmount :
                          <b>{{ auctionDetails.maxBidAmount }}</b>
                        </li>
                        <li>
                          TotalNoOfBids :
                          <b>{{ auctionDetails.totalNoOfBids }}</b>
                        </li>
                      </ul>
                    </div>
                  </template>
                </TabPanel>
                <TabPanel header="Property Details">
                  <template #default>
                    <div class="max-h-36 overflow-y-scroll">
                      <p>
                        {{ properties[0]?.vsInventoryCategoryName }}:{{
                          properties[0]?.inventoryHierarchy
                        }}
                      </p>
                      <DataTable showGridlines :value="properties">
                        <Column
                          field="vsInventoryName"
                          header="Property Name"
                        ></Column>
                        <Column field="bInventorySold" header="Status">
                          <template #body="row">
                            <p
                              :class="{
                                'font-bold text-green-600':
                                  row.data.bInventorySold,
                                'font-bold text-red-600':
                                  !row.data.bInventorySold,
                              }"
                            >
                              {{ row.data.bInventorySold ? "Sold" : "Unsold" }}
                            </p>
                          </template>
                        </Column>
                      </DataTable>
                    </div>
                  </template>
                </TabPanel>
              </TabView>
            </template>
          </AccordionTab>
        </Accordion>
      </template>
    </Card>
  </div>
</template>
<script setup>
import Card from "primevue/card";
import { onMounted, ref, computed, watch } from "vue";
import { login } from "../../store/modules/login";
import MQL from "../../plugins/mql";
import moment from "moment";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Dropdown from "primevue/dropdown";
import Dialog from "primevue/dialog";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { useAuctionStore } from "../../store/Auction";
import { useToast } from "primevue/usetoast";
import RadioButton from "primevue/radiobutton";

import faArrowRightFromBracker from "../../../assets/icons/arrow-right-from-bracket.svg";

const loginStore = login();
const toast = useToast();

const showDetails = ref(false);

const auctionStore = useAuctionStore();

const props = defineProps({
  auction: {
    type: Object,
    required: true,
  },
  activeIndex: {
    type: [Number, null],
    required: true,
  },
  latestTime: {
    type: String,
    required: true,
  },
  clientLoginIpAddress: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["activeTab"]);

const bidHistory = ref([]);

const properties = ref([]);

const isHighestBidder = ref(false);

const selectedCategory = ref("");

const leaveAuctionVisible = ref(false);

const multiplieries = ref([]);

const bidValue = ref(0);

let isPropertySelected = ref(false);

const isAuctionActive = computed(() => {
  console.log(auctionDetails.value.auctionId, props.activeIndex);
  if (auctionDetails.value.auctionId == props.activeIndex) {
    return 0;
  } else {
    return null;
  }
});

// function bidPlaced() {
//   bidFlag.value = false;
//   let totalvalue =
//     parseInt(bidValue.value) + parseInt(auctionDetails.value.currentHigh);

//   wsConnection.value.send(
//     JSON.stringify({
//       auctionId: parseInt(auctionDetails.value.auctionId),
//       bidderId: parseInt(loginStore.loginId),
//       auctionUserId: parseInt(props.auction.auctionUserId),
//       roundNumber: parseInt(auctionDetails.value.roundNumber),
//       currentPrice: parseInt(auctionDetails.value.currentHigh),
//       roundEndTime: moment(auctionDetails.value.roundEndTime),
//       roundStartTime: moment(auctionDetails.value.roundStartTime),
//       bidAmount: parseInt(totalvalue),
//       bidValue: parseInt(bidValue.value),
//       bidFactor: parseInt(count.value),
//       typeCode: parseInt(200),
//       clientLoginIpAddress: props.clientLoginIpAddress,
//     })
//   );
//   count.value = "";
//   console.log("Bid Placed");
//   console.log("Bid Value", bidValue.value);
//   console.log("roundNumber", roundNumber);
//   console.log("roundNumber for round", roundNumber);
// }

function activeIndexOpen(e) {
  console.log(e);
  emit("activeTab", auctionDetails.value.auctionId, e);
}

const makeMultiplieries = () => {
  for (var i = 1; i <= 100; i++) {
    multiplieries.value.push({
      text: i,
      value: i,
    });
  }
};

const count = ref(0);

const auctionDetails = ref({
  auctionCode: null,
  auctionId: props.auction.auctionId,
  roundStartTime: null,
  roundEndTime: null,
  currentHigh: null,
  modifierValue: null,
  roundNumber: null,
  description: null,
  currentRound: null,
  startValue: null,
  maxBidAmount: null,
  totalNoOfBids: null,
  numberOfRounds: null,
  itemSelectionTime: null,
  clientIPAddress: null,
});

const timeLeft = ref(null);
const propertyVisible = ref(false);
const time = ref(null);
const remaningTime = ref(null);
const itemSelectionTimeLeft = ref(null);
const isbidDisabled = ref(null);
const bidFlag = ref(null);

const timeleftInterval = ref(null);
const wsConnection = ref(null);

const roundHasStarted = computed(() =>
  moment(auctionDetails.value.roundStartTime).isSameOrBefore(
    moment(props.latestTime, "DD/MM/YYYY hh:mm:ss A"),
    "second"
  )
);
const roundHasEnded = computed(() =>
  moment(auctionDetails.value.roundEndTime).isSameOrBefore(
    moment(props.latestTime, "DD/MM/YYYY hh:mm:ss A"),
    "second"
  )
);

function leaveAuction() {
  leaveAuctionVisible.value = true;
}
//let manuallyLeave = ref(false)
function leaveAuctionFinal() {
//  manuallyLeave.value=true;
  console.log(`Final leave auction ${auctionDetails.value.auctionId}`);
  toast.add({
    severity: "success",
    summary: "Auction Left",
    detail: `Left Auction ${auctionDetails.value.auctionCode} Successfully`,
    life: 3000,
  });
  auctionLeavingFunctionality();
}

function auctionLeavingFunctionality() {
  wsConnection.value.close(1000);
  clearInterval(timeleftInterval.value);
  console.log(
    "aucId auctionLeavingFunctionality",
    auctionDetails.value.auctionId
  );
  auctionStore.removeAuction(auctionDetails.value.auctionId);
}

// function updateHistory(bidObject) {
//   if (bidObject.bidderId == loginStore.loginId) {
//     let bidHistoryObj = {
//       roundNumber: auctionDetails.value.roundNumber,
//       quoteAmount: bidObject.bidAmount,
//       quoteTime: props.latestTime,
//     };
//     bidHistory.value.unshift(bidHistoryObj);
//   }
// }

function updateHistory(bidObject) {
  console.log("Bid Object", bidObject);
  if (bidObject.bidderId) {
    let bidHistoryObj = {
      roundNumber: auctionDetails.value.roundNumber,
      quoteAmount: bidObject.bidAmount,
      quoteTime: props.latestTime,
      clientIPAddress:bidObject.clientLoginIpAddress
    };
    bidHistory.value.unshift(bidHistoryObj);
    console.log("Bid History new", bidHistory.value);
    // console.log("Bid Obj", bidHistoryObj);
  }
}

const highestBidderVisible = ref(false);

const isItemSelectionBtnDisable = ref(false);

const openItemSelection = computed(() => {
  if (
    roundHasEnded.value == true &&
    isHighestBidder.value == true &&
    isItemSelectionBtnDisable.value == true &&
    moment(props.latestTime, "DD/MM/YYYY hh:mm:ss A").isSameOrAfter(
      moment(auctionDetails.value.roundEndTime),
      "second"
    )
  ) {
    return true;
  } else {
    return false;
  }
});

watch(openItemSelection, (val) => {
  if (val) {
    highestBidderVisible.value = true;
  }
});

function function1() {
  highestBidderVisible.value = false;
  if ((isHighestBidder.value = true)) {
    isItemSelectionBtnDisable.value = false;
  }
}

const propertiesToBeSold = computed(() =>
  properties.value.filter((p) => !p.bInventorySold)
);

function openItem() {
  propertyVisible.value = true;
  selectedCategory.value = "";
}

function submitProperty() {
  isPropertySelected.value = true;
  propertyVisible.value = false;
  isHighestBidder.value = false;
  isItemSelectionBtnDisable.value = true;
  if (selectedCategory.value !== "") {
    wsConnection.value.send(
      JSON.stringify({
        auctionId: parseInt(auctionDetails.value.auctionId),
        bidderId: parseInt(loginStore.loginId),
        auctionUserId: parseInt(props.auction.auctionUserId),
        roundNumber: parseInt(auctionDetails.value.roundNumber),
        auctionItemId: parseInt(selectedCategory.value),
        typeCode: parseInt(300),
      })
    );
    let propertyName = properties.value.find(
      (p) => p.pklAuctionItemsDetails == selectedCategory.value
    );
    toast.add({
      severity: "success",
      summary: "Congratulation",
      detail: `Selected Property ${propertyName.vsInventoryName} is now allocated to you.`,
      life: 3000,
    });
    fetchPropertyDetails();
  }
}

function checkH1(incomingBid) {
  // console.log(incomingBid.bidderId, loginStore.loginId);
  if (incomingBid.bidderId == loginStore.loginId) {
    isHighestBidder.value = true;
    // isItemSelectionBtnDisable.value = false
  } else {
    isHighestBidder.value = false;
    // isItemSelectionBtnDisable.value = true
  }
}

function webSocketConn() {
  wsConnection.value = new WebSocket(
    `wss://${window.location.host}/bidding-server-ws/ws/admin-auction`
  );


  // OnOpen Event Listener
  wsConnection.value.onopen = function (e) {
    wsConnection.value.send(
      JSON.stringify({
        token: "Bearer " + sessionStorage.getItem("user-token"),
        loginId: parseInt(loginStore.loginId),
        auctionId: parseInt(props.auction.auctionId),
        auctionPassword: props.auction.password,
      })
    );
  };

  wsConnection.value.addEventListener("message", function (e) {
    var message;
    message = JSON.parse(e.data);
    console.log("Message", message);

    switch (
      true // Change this to status based code
    ) {
      case message.typeCode === 200:
        console.log("Message", message);
        auctionDetails.value.currentHigh = message.bidAmount;

        auctionDetails.value.modifierValue = message.modifierValue;

        auctionDetails.value.roundEndTime = message.roundEndTime;

        auctionDetails.value.roundStartTime = message.roundStartTime;

        checkH1(message);
        updateHistory(message);
        break;

      case message.typeCode === 100:
        message.error;
        // hot fix
        if (
          message.error ===
            "You don't have enough EMD left to bid for a new property" ||
          message.error ===
            "You have already joined this auction, If you have already left previous auction then please try again after 20 seconds"
        ) {
          alert(message.error);
          // window.close()
          auctionLeavingFunctionality();
        }
        break;

      case message.typeCode === 400:
        // New Round has begun fetch auction details
        if (
          message.bidderId == loginStore.loginId &&
          isPropertySelected.value == true
        ) {
          isPropertySelected.value = false;
          // alert(`Congratulations the selected property has been sold to you.`)
        } else if (
          message.bidderId == loginStore.loginId &&
          isPropertySelected.value == false
        ) {
          alert(`Random property has been sold to you.`);
        }
        // self.getAuctionDetals()
        break;
      case message.typeCode === 500:
        // Auction has ended redirect to dashboard
        // self.leaveAuction()
        // alert(
        //   `${auctionDetails.value.auctionCode} Auction Ended, Thank you for Participating!`
        // );
       // manuallyLeave.value=true
        toast.add({ severity: 'success', detail: `${auctionDetails.value.auctionCode} Auction Ended, Thank you for Participating!`, life: 3000 })
        // self.$router.push({ name: 'vendorDashboard' })
        // window.close()
        auctionLeavingFunctionality();

        break;
      case message.typeCode === 600:
        alert(
          `The current ${auctionDetails.value.auctionCode} auction has been cancelled abruptly by the department due to unavoidable circumstances. We regret for the inconvenience caused.`
        );
        // self.$router.push({ name: 'vendorDashboard' })
        // window.close()
        auctionLeavingFunctionality();
        break;
      case message.typeCode === 700:
        alert(
          ` ${auctionDetails.value.auctionCode} Auction Ended, As all items for the auction is sold. Thank you for Participating!`
        );
        // self.$router.push({ name: 'vendorDashboard' })
        // window.close()
        auctionLeavingFunctionality();
        break;
      default:
        checkH1(message);
        updateHistory(message);
    }
  });

    // adding error listener
    wsConnection.value.addEventListener('error', function (e) {
       
       location.reload();
   console.log(
     `ERROR: ${e} REASON ${e.reason} CODE ${e.code} WASCLEAN ${e.wasClean} MESSAGE ${e.message}`
   );
       //console.log(`ERROR: ${e} REASON ${e.reason} CODE ${e.code} WASCLEAN ${e.wasClean} MESSAGE ${e.message}`);
   })

   // adding close listener
  //  wsConnection.value.addEventListener('close', function (e) {
  //      if (!manuallyLeave.value) {
  //    location.reload();
  //  }
  //  console.log(
  //    `CLOSE: ${e} REASON ${e.reason} CODE ${e.code} WASCLEAN ${e.wasClean} MESSAGE ${e.message}`
  //  );
  //      //console.log(`CLOSE: ${e} REASON ${e.reason} CODE ${e.code} WASCLEAN ${e.wasClean} MESSAGE ${e.message}`);
  //  })
}



function currencyFormat(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumSignificantDigits: 15,
  }).format(value);
}

async function updateAuctionTimeLeft() {
  var msg;
  var finalMsg;
  remaningTime.value = roundHasStarted.value
    ? moment(auctionDetails.value.roundEndTime).diff(
        moment(props.latestTime, "DD/MM/YYYY hh:mm:ss A")
      )
    : moment(auctionDetails.value.roundStartTime).diff(
        moment(props.latestTime, "DD/MM/YYYY hh:mm:ss A")
      );

  itemSelectionTimeLeft.value = moment(auctionDetails.value.roundEndTime)
    .add(auctionDetails.value.itemSelectionTime, "m")
    .diff(moment(props.latestTime, "DD/MM/YYYY hh:mm:ss A"));
  // console.log("TL", itemSelectionTimeLeft);

  time.value = `${moment.duration(itemSelectionTimeLeft.value).hours()}:${moment
    .duration(itemSelectionTimeLeft.value)
    .minutes()}:${moment.duration(itemSelectionTimeLeft.value).seconds()}`;
  // console.log("Time", time);

  // auction start or next round start
  if (!roundHasStarted.value && !roundHasEnded.value) {
    if (auctionDetails.value.currentRound == 1) {
      msg = "The auction will start in";
    } else {
      msg = "Next round will start in";
    }
    if (moment.duration(remaningTime.value).hours()) {
      finalMsg = `${msg} <b class='text-red-600 font-bold'>${moment
        .duration(remaningTime.value)
        .hours()} hrs:${moment
        .duration(remaningTime.value)
        .minutes()} mins:${moment
        .duration(remaningTime.value)
        .seconds()} secs</b>`;
    } else {
      finalMsg = `${msg} <b class='text-red-600 font-bold'>${moment
        .duration(remaningTime.value)
        .minutes()} mins:${moment
        .duration(remaningTime.value)
        .seconds()} secs </b>`;
    }
    timeLeft.value.innerHTML = finalMsg;
    // round has started
  } else if (roundHasStarted.value && !roundHasEnded.value) {
    msg = "The round will end in";
    if (moment.duration(remaningTime.value).hours()) {
      finalMsg = `${msg} <b class='text-red-600 font-bold'>${moment
        .duration(remaningTime.value)
        .hours()} hrs:${moment
        .duration(remaningTime.value)
        .minutes()} mins:${moment
        .duration(remaningTime.value)
        .seconds()} secs</b>`;
    } else {
      finalMsg = `${msg} <b class='text-red-600 font-bold'>${moment
        .duration(remaningTime.value)
        .minutes()} mins:${moment
        .duration(remaningTime.value)
        .seconds()} secs </b>`;
    }
    timeLeft.value.innerHTML = finalMsg;
    // last round has ended or some round has ended in item selection time
  } else if (roundHasEnded.value && roundHasStarted.value) {
    if (
      auctionDetails.value.currentRound == auctionDetails.value.numberOfRounds
    ) {
      msg = "The auction will end in";
    } else {
      msg = "Next round will start in";
    }
    if (moment.duration(itemSelectionTimeLeft.value).hours()) {
      finalMsg = `${msg} <b  class='text-red-400 font-bold'>${moment
        .duration(itemSelectionTimeLeft.value)
        .hours()} hrs:${moment
        .duration(itemSelectionTimeLeft.value)
        .minutes()} mins:${moment
        .duration(itemSelectionTimeLeft.value)
        .seconds()} secs</b>`;
    } else {
      finalMsg = `${msg} <b  class='text-red-400 font-bold'>${moment
        .duration(itemSelectionTimeLeft.value)
        .minutes()} mins:${moment
        .duration(itemSelectionTimeLeft.value)
        .seconds()} secs </b>`;
    }
    timeLeft.value.innerHTML = finalMsg;
  }
  if (roundHasStarted.value && !roundHasEnded.value) {
    isbidDisabled.value = false; // Auction is ongoing, enable bidding
  } else {
    isbidDisabled.value = true; // Auction has not started yet or has ended, disable bidding
  }

  if (itemSelectionTimeLeft.value < 0) {
    // bidFlag.value = false;
    await fetchAuctionDetails();
  }
}

function totalBid() {
  // bidFlag.value = true
  bidValue.value =
    parseInt(auctionDetails.value.modifierValue) * parseInt(count.value);
}

watch(count, (newV) => {
  totalBid();
});

function getPreviousRoundHBid(roundNumber, auctionId, offset) {
  return new Promise((resolve) => {
    let data = {
      roundNumber: String(roundNumber),
      auctionId: String(auctionId),
      offset: String(offset),
    };

    // Automatically generated
    new MQL()
      .useCoreServer()
      .setActivity("o.[GetPreviousRoundHBid]")
      .setData(data)
      .fetch()
      .then((rs) => {
        let res = rs.getActivity("GetPreviousRoundHBid", true);
        if (rs.isValid("GetPreviousRoundHBid")) {
          console.log(res.result);
          resolve(res.result);
        } else {
          rs.showErrorToast("GetPreviousRoundHBid");
        }
      });
  });
}



function nextRoundReservePrice() {
  return new Promise(async (resolve) => {
    // ** New Rules
    let previousHRoundBid, RoundNumber;
    if (auctionDetails.value.roundNumber == 1) {
      auctionDetails.value.currentHigh = auctionDetails.value.currentHigh;
    } else if (auctionDetails.value.roundNumber >= 2) {
      RoundNumber = auctionDetails.value.roundNumber - 1;
      previousHRoundBid = await getPreviousRoundHBid(
        RoundNumber,
        auctionStore.auctionObj.pklAuctionId,
        1
      );
      if (previousHRoundBid.bidCount > 0) {
        if (previousHRoundBid.hnBidAmount > 0) {
          auctionDetails.value.currentHigh = previousHRoundBid.hnBidAmount;
        } else {
          auctionDetails.value.currentHigh = auctionDetails.value.currentHigh;
        }
      } else {
        RoundNumber = auctionDetails.value.roundNumber - 2;
        previousHRoundBid = await getPreviousRoundHBid(
          RoundNumber,
          auctionStore.auctionObj.pklAuctionId,
          2
        );
        if (previousHRoundBid.bidCount > 0) {
          if (previousHRoundBid.hnBidAmount > 0) {
            auctionDetails.value.currentHigh = previousHRoundBid.hnBidAmount;
          } else {
            auctionDetails.value.currentHigh = auctionDetails.value.currentHigh;
          }
        } else {
          auctionDetails.value.currentHigh = auctionDetails.value.currentHigh;
        }
      }
    }
    resolve();
  });
}


function fetchAuctionDetails() {
  count.value = "";
  return new Promise((resolve) => {
    // Automatically generated
    new MQL()
      .useCoreServer()
      .setActivity("r.[FetchDataForBidding]")
      .setData({
        auctionId: props.auction.auctionId,
        userId: loginStore.loginId,
      })
      .enablePageLoader(true)
      .fetch()
      .then(async (rs) => {
        let res = rs.getActivity("FetchDataForBidding", true);
        if (rs.isValid("FetchDataForBidding")) {
          console.log(res);
          console.log("Result of auctiondetails", res.result);
          properties.value = res.result.propertyDetails;
          bidHistory.value = res.result.auctionHistoryAdmin;
          console.log("Bid History123", bidHistory.value);
         

          isItemSelectionBtnDisable.value = true;
          isHighestBidder.value = false;
          propertyVisible.value = false;
          highestBidderVisible.value = false;

          auctionDetails.value.auctionCode =
            res.result.inventoryDetails.auctionCode;
          auctionDetails.value.description =
            res.result.inventoryDetails.auctionDescription;
          auctionDetails.value.currentRound =
            res.result.inventoryDetails.currentRoundNumber;
          console.log("Current Round", auctionDetails.value.currentRound);

          auctionDetails.value.startValue =
            res.result.inventoryDetails.startValue;
          auctionDetails.value.maxBidAmount =
            100 * res.result.inventoryDetails.modifierValue;
          auctionDetails.value.totalNoOfBids = res.result.auctionHistoryAdmin.length;
          console.log("Total No of Bids", auctionDetails.value.totalNoOfBids);
          auctionDetails.value.clientIPAddress= res.result.auctionHistoryAdmin.clientIPAddress
          auctionDetails.value.numberOfRounds =
            res.result.inventoryDetails.numberOfRounds;
          auctionDetails.value.itemSelectionTime = parseInt(
            res.result.inventoryDetails.itemSelectionTime
          );
          auctionDetails.value.roundStartTime =
            res.result.inventoryDetails.currentRoundStartTime;
          auctionDetails.value.roundEndTime =
            res.result.inventoryDetails.currentRoundEndTime;
          auctionDetails.value.currentHigh =
            res.result.inventoryDetails.currentHigh;
          auctionDetails.value.modifierValue =
            res.result.inventoryDetails.modifierValue;
          auctionDetails.value.roundNumber =
            res.result.inventoryDetails.currentRoundNumber;

          // clientLoginIpAddress.value = res.result.fetchIPAddress.clientLoginIpAddress

          if (
            res.result.inventoryDetails.currentHighestBidderId ==
            loginStore.loginId
          ) {
            isHighestBidder.value = true;
          }

          if (res.result.inventoryDetails.BidCount == "NO_BID") {
            // await nextRoundReservePrice()
            auctionDetails.value.currentHigh =
              res.result.inventoryDetails.startValue;
          }

          resolve();
        } else {
          rs.showErrorToast("FetchDataForBidding");
        }
      });
  });
}

function fetchPropertyDetails() {
  return new Promise((resolve) => {
    // Automatically generated
    new MQL()
      .useCoreServer()
      .setActivity("r.[FetchDataForBidding]")
      .setData({
        auctionId: props.auction.auctionId,
        userId: loginStore.loginId,
      })
      .enablePageLoader(true)
      .fetch()
      .then(async (rs) => {
        let res = rs.getActivity("FetchDataForBidding", true);
        if (rs.isValid("FetchDataForBidding")) {
          console.log(res);
          properties.value = res.result.propertyDetails;
          resolve();
        } else {
          rs.showErrorToast("FetchDataForBidding");
        }
      });
  });
}
const totalCount = ref();
const totalJoined = ref(0);

function fetchBiddersData() {
  new MQL()
    .useCoreServer()
    .enablePageLoader(false)
    .setActivity("r.[FetchCountAndIPofBidder]")
    .setData({ auctionId: props.auction.auctionId, userId: loginStore.loginId })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchCountAndIPofBidder", true);
      if (rs.isValid("FetchCountAndIPofBidder")) {
        console.log(res);
        totalCount.value =
          res.result.fetchParticipatedBidderCount.ParticipatedBidderCount;
        console.log("totalCount", totalCount.value);
        totalJoined.value = res.result.fetchJoinedBidderCount.JoinedBidderCount;
        console.log("totalJoined", totalJoined.value);
      } else {
        rs.showErrorToast("FetchCountAndIPofBidder");
      }
    });
}

onMounted(async () => {
  webSocketConn();
  await fetchAuctionDetails();
  timeleftInterval.value = setInterval(() => {
    updateAuctionTimeLeft();
   fetchBiddersData();
  }, 1000);
  makeMultiplieries();
  totalBid();
});
import { onBeforeUnmount } from "vue";

onBeforeUnmount(() => {
  //   clearInterval(timeleftInterval.value);
  //   auctionStore.removeAuction(auctionDetails.value.auctionId);
  auctionLeavingFunctionality();
});
</script>
