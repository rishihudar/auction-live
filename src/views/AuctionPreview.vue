<template>
  <div>
    <div class="page-header">
      <div class="ph-text">
        <h5 class="title">Auction {{ vsAuctionCode }} Summary Page</h5>
        <!-- <Breadcrumb :model="crumbs">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a :href="href" v-bind="props.action" @click="navigate">
                                <span :class="[item.icon, 'text-color']" />
                                <span class="bi-label">{{ item.label }}</span>
                            </a>
                        </router-link>
                        <span v-else v-bind="props.action">
                            <span class="bi-label">{{ item.label }}</span>
                        </span>
                    </template>
                </Breadcrumb> -->
      </div>
    </div>
    <div class="box-preview-wrapper">
      <div class="box-section box-section-light">
        <div class="bs-header">
          Step1 Details
          <div class="bs-action">
            <Button
              v-if="config?.step1.editable"
              severity="secondary"
              class="btn-sm"
              @click="visible1 = true"
            >
              <fa-pen-to-square></fa-pen-to-square> Edit
            </Button>
            <Dialog
              v-model:visible="visible1"
              :draggable="false"
              modal
              :style="{ width: '50rem' }"
            >
              <Step1
                :auction-id="auctionId"
                :config="config?.step1.fieldConfig"
                @next-tab="step1Save()"
                @previous-tab="step1Save()"
              />
            </Dialog>
          </div>
        </div>
        <div class="bs-item-holder">
          <div class="bs-item col-span-6">
            <div class="bs-label">Auction Type:</div>
            <div class="bs-value">
              {{ auctionSummary[0].auctionType }}
            </div>
          </div>
          <div class="bs-item col-span-6">
            <div class="bs-label">Auction Method:</div>
            <div class="bs-value">
              {{ auctionSummary[0].auctionMethodName }}
            </div>
          </div>
        </div>
      </div>
      <div class="box-section box-section-light">
        <div class="bs-header">
          Step2 Details
          <div class="bs-action">
            <Button
              v-if="config?.step2.editable"
              severity="secondary"
              class="btn-sm"
              @click="visible2 = true"
            >
              <fa-pen-to-square></fa-pen-to-square> Edit
            </Button>
            <Dialog
              v-model:visible="visible2"
              modal
              :style="{ width: '75rem' }"
            >
              <Step2
                :auction-id="auctionId"
                :config="config?.step2.fieldConfig"
                @next-tab="step2Save"
                @previous-tab="step2Save"
              />
            </Dialog>
          </div>
        </div>
        <div class="bs-item-holder">
          <div class="bs-item col-span-4">
            <div class="bs-label">Reference Number:</div>
            <div class="bs-value">
              {{ auctionSummary[0].auctionType }}
            </div>
          </div>
          <div class="bs-item col-span-4">
            <div class="bs-label">Auction Category:</div>
            <div class="bs-value">
              {{ auctionSummary[0].inventoryCategoryName }}
            </div>
          </div>
          <div class="bs-item col-span-4">
            <div class="bs-label">Auction Description:</div>
            <div class="bs-value">
              {{ auctionSummary[0].auctionDescription }}
            </div>
          </div>
          <div class="bs-item col-span-4">
            <div class="bs-label">Auction Process:</div>
            <div class="bs-value">
              {{ auctionSummary[0].auctionProcessName }}
            </div>
          </div>
          <!-- <div class="bs-item col-span-4">
                        <div class="bs-label">Department:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].departmentName }}
                        </div>
                    </div> -->
          <div class="bs-item col-span-4">
            <div class="bs-label">Bid Submission/Placement:</div>
            <div class="bs-value">
              {{ auctionSummary[0].bidPlacementName }}
            </div>
          </div>
          <!-- <div class="bs-item col-span-3">
                        <div class="bs-label">Event Processing Fee Mode:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].eventProcessingFeeMode }}
                        </div>
                    </div> -->
          <div class="bs-item col-span-3">
            <div class="bs-label">Event Processing Fee Amount:</div>
            <div class="bs-value">
              {{ auctionSummary[0].eventProcessingFees }}
            </div>
          </div>
          <!-- <div class="bs-item col-span-3">
                        <div class="bs-label">EMD Fee Payment Mode:</div>
                        <div class="bs-value">
                            {{ auctionSummary[0].eventProcessingFeeMode }}
                        </div>
                    </div> -->
          <div class="bs-item col-span-3">
            <div class="bs-label">EMD Applied For:</div>
            <div class="bs-value">
              {{ auctionSummary[0].emdAppliedFor }}
            </div>
          </div>
        </div>
      </div>
      <div class="box-section box-section-light">
        <div class="bs-header">
          Step3 Details
          <div class="bs-action">
            <Button
              v-if="config?.step3.editable"
              severity="secondary"
              class="btn-sm"
              @click="visible3 = true"
            >
              <fa-pen-to-square></fa-pen-to-square> Edit
            </Button>
            <Dialog
              v-model:visible="visible3"
              modal
              :style="{ width: '60rem' }"
            >
              <Step3
                :auction-id="auctionId"
                :config="config?.step3.fieldConfig"
                @next-tab="step3Save"
                @previous-tab="step3Save"
              />
            </Dialog>
          </div>
        </div>
        <div class="bs-item-holder">
          <div class="bs-item col-span-4">
            <div class="bs-label">Item Id:</div>
            <div class="bs-value">
              {{ auctionSummary[0].inventoryId }}
            </div>
          </div>
          <div class="bs-item col-span-4">
            <div class="bs-label">Item Name:</div>
            <div class="bs-value">
              {{ auctionSummary[0].inventoryHierarchy }}
            </div>
          </div>
          <div class="bs-item col-span-4">
            <div class="bs-label">Reserve Price:</div>
            <div class="bs-value">
              {{ auctionSummary[0].reservePrice }}
            </div>
          </div>
          <div class="bs-item col-span-4">
            <div class="bs-label">Modifier Value:</div>
            <div class="bs-value">
              {{ auctionSummary[0].modifierValue }}
            </div>
          </div>
          <div class="bs-item col-span-4">
            <div class="bs-label">Modifier Value Change After:</div>
            <div class="bs-value">
              {{ auctionSummary[0].modifierValueChangeName }}
            </div>
          </div>
          <div class="bs-item col-span-4">
            <div class="bs-buttons bs-buttons-left">
              <!-- If document path is valid -->
              <button
                v-if="auctionItemDocumentPath != '/'"
                class="btn btn-sm btn-secondary"
                @click="viewImage(auctionItemDocumentPath)"
              >
                Auction Item Document
              </button>
              <!-- If document path is not valid -->
              <button
                v-else
                class="btn btn-sm btn-secondary"
                v-tooltip.top="'Document Not Available'"
              >
              Auction Item Document
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="box-section box-section-light">
        <div class="bs-header">
          Step4 Details
          <div class="bs-action">
            <Button
              v-if="config?.step4.editable"
              severity="secondary"
              class="btn-sm"
              @click="visible4 = true"
            >
              <fa-pen-to-square></fa-pen-to-square> Edit
            </Button>
            <Dialog
              v-model:visible="visible4"
              modal
              :style="{ width: '60rem' }"
            >
              <Step4
                :auction-id="auctionId"
                :config="config?.step4.fieldConfig"
                @next-tab="step4Save"
                @previous-tab="step4Save"
              />
            </Dialog>
          </div>
        </div>
        <div class="bs-item-holder">
          <div class="bs-item col-span-6">
            <div class="bs-label">
              Processing Fee and EMD Payment Start date:
            </div>
            <div class="bs-value">
              {{ auctionSummary[0].startDate }}
            </div>
          </div>
          <div class="bs-item col-span-6">
            <div class="bs-label">Processing Fee and EMD Payment End date:</div>
            <div class="bs-value">
              {{ auctionSummary[0].endDate }}
            </div>
          </div>
          <div class="bs-item col-span-full">
            <div class="bs-buttons">
              <!-- <a class="btn btn-sm btn-secondary" :href="auctionDocumentPath" target="_blank"> Auction -->
              <!-- Item</a> -->
              <button
                class="btn btn-sm btn-secondary"
                @click="viewImage(auctionDocumentPath)"
              >
                Auction Document
              </button>
              <!-- <a class="btn btn-sm btn-secondary" :href="auctionNoticeDocumentPath" target="_blank">
                                Notice
                                Document</a> -->
              <button
                class="btn btn-sm btn-secondary"
                @click="viewImage(auctionNoticeDocumentPath)"
              >
                Notice Document
              </button>
            </div>
          </div>
        </div>
      </div>

      <History
        v-if="workflowStepDetailsId"
        :workflow-step-details-id="workflowStepDetailsId"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MQL from "@/plugins/mql.js";
import History from "./History.vue";
import Step1 from "./admin/AuctionPreparation/Step1.vue";
import Step2 from "./admin/AuctionPreparation/Step2.vue";
import Step3 from "./admin/AuctionPreparation/Step3.vue";
import Step4 from "./admin/AuctionPreparation/Step4.vue";
import Dialog from "primevue/dialog";
import MQLCdn from "@/plugins/mqlCdn.js";

import faPenToSquare from "../../assets/icons/pen-to-square.svg";

const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const crumbs = ref([
  { label: "Home", route: "/home" },
  { label: "Auction", route: "/home" },
  { label: "Aution Preview" },
]);

const { auctionId, workflowStepDetailsId, config, vsAuctionCode } = defineProps(
  {
    auctionId: {
      type: [Number, String],
      default: null,
      required: true,
    },
    workflowStepDetailsId: {
      type: [Number, String],
      default: null,
    },
    config: {
      type: Object,
      default: null,
    },
    vsAuctionCode: {
      type: String,
      default: null,
    },
  }
);

const auctionNoticeDocumentPath = ref("");
const auctionItemDocumentPath = ref("");
const auctionDocumentPath = ref("");

function step1Save() {
  visible1.value = false;
  FetchAuctionSummaryByAuctionId();
}
function step2Save() {
  visible2.value = false;
  FetchAuctionSummaryByAuctionId();
}
function step3Save() {
  visible3.value = false;
  FetchAuctionSummaryByAuctionId();
}
function step4Save() {
  visible4.value = false;
  FetchAuctionSummaryByAuctionId();
}

const auctionSummary = ref([{}]);

function FetchAuctionSummaryByAuctionId() {
  new MQL()
    .useManagementServer()
    .setActivity("o.[FetchAuctionSummaryByAuctionId]")
    .setData({ auctionId: auctionId })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchAuctionSummaryByAuctionId", true);
      //console.log(res, "res")
      if (rs.isValid("FetchAuctionSummaryByAuctionId")) {
        auctionSummary.value = res.result;
        //console.log(auctionSummary.value, "auctionSummary")

        let updatedAuctionSummary = auctionSummary.value[0];
        //console.log(auctionSummary.value.length, "auctionSummary.value.length")
        for (let i = 1; i < auctionSummary.value.length; i++) {
          let index = i;
          let refKey = `ref${index}`;
          updatedAuctionSummary[refKey] = {
            documentPath: auctionSummary.value[i].documentPath,
            documentTypeName: auctionSummary.value[i].documentTypeName,
          };
        }
        //console.log(updatedAuctionSummary, "updatedAuctionSummary")

        auctionSummary.value.forEach((item) => {
          if (item.documentTypeName == "AUCTION_ITEM_DOCUMENT") {
            auctionItemDocumentPath.value = item.documentPath;
            //console.log(auctionItemDocumentPath.value, "auctionItemDocumentPath")
          }
          if (item.documentTypeName == "AUCTION_DOCUMENT") {
            auctionDocumentPath.value = item.documentPath;
            //console.log(auctionDocumentPath.value, "auctionDocumentPath")
          }
          if (item.documentTypeName == "NOTICE_DOCUMENT") {
            auctionNoticeDocumentPath.value = item.documentPath;
            //console.log(auctionNoticeDocumentPath.value, "auctionNoticeDocumentPath")
          }
        });
      } else {
        rs.showErrorToast("FetchAuctionSummaryByAuctionId");
      }
    });
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
    toaster.error("File can'nt be downloaded!");
  }
}
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
const Vue = window.app;
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

onMounted(() => {
  FetchAuctionSummaryByAuctionId();
});
</script>