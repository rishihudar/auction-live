
<template>
    <div class="box-section">
        <div class="bs-header">
            Auction Details
        </div>
        <div class="bs-item-holder">
            <div class="bs-item col-span-6 2xl:col-span-4">
                <div class="bs-label">Auction Type:</div>
                <div class="bs-value">{{ auctionDetails.auctionType }}</div>
            </div>
            <div class="bs-item col-span-6 2xl:col-span-4">
                <div class="bs-label">Auction Method:</div>
                <div class="bs-value">{{ auctionDetails.auctionMethodName }}</div>
            </div>
            <div class="bs-item col-span-6 2xl:col-span-4">
                <div class="bs-label">Auction Process:</div>
                <div class="bs-value">{{ auctionDetails.auctionProcessName }}</div>
            </div>
            <div class="bs-item col-span-6 2xl:col-span-4">
                <div class="bs-label">Bid Placement:</div>
                <div class="bs-value">{{ auctionDetails.bidPlacementName }}</div>
            </div>
            <div class="bs-item col-span-6 2xl:col-span-4">
                <div class="bs-label">District:</div>
                <div class="bs-value">{{ auctionDetails.district }}</div>
            </div>
            <div class="bs-item col-span-6 2xl:col-span-4">
                <div class="bs-label">MC:</div>
                <div class="bs-value">{{ auctionDetails.mcName }}</div>
            </div>
            <div class="bs-item col-span-6 2xl:col-span-4">
                <div class="bs-label">Location:</div>
                <div class="bs-value">{{ auctionDetails.location }}</div>
            </div>
            <div class="bs-item col-span-6 2xl:col-span-4">
                <div class="bs-label">Area:</div>
                <div class="bs-value">{{ auctionDetails.area }}</div>
            </div>
            <div class="bs-item col-span-6 2xl:col-span-4">
                <div class="bs-label">EMD:</div>
                <div class="bs-value">{{ auctionDetails.eventEmdProcessingFees }}</div>
            </div>
            <div class="bs-item col-span-6 2xl:col-span-4">
                <div class="bs-label">Reserve Price:</div>
                <div class="bs-value">{{ auctionDetails.reservePrice }}</div>
            </div>
            <div class="bs-item col-span-6 2xl:col-span-4">
                <div class="bs-label">Number Of Rounds:</div>
                <div class="bs-value">{{ auctionDetails.numberOfRounds }}</div>
            </div>
            <div class="bs-item col-span-6 2xl:col-span-4">
                <div class="bs-label">Modifier Value:</div>
                <div class="bs-value">{{ auctionDetails.modifierValue }}</div>
            </div>
            <div class="bs-item col-span-6 2xl:col-span-4" v-for="(doc, index) in auctionDetails.auctionDocuments" :key="index">
                <div class="bs-buttons">
                    <!-- <a :href="doc.documentPath" class="btn btn-sm btn-secondary">{{ doc.documentTypeName }}</a> -->
                    <button @click="viewImage(doc.documentPath)" class="btn btn-sm btn-secondary">{{
                    doc.documentTypeName }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Listbox from 'primevue/listbox';
import MQL from "@/plugins/mql.js";
import Dialog from 'primevue/dialog';
import MQLCdn from '@/plugins/mqlCdn.js';
const visible6 = ref(false);
const expandedRows = ref([]);
const auctionDetails = ref([]);

const props = defineProps({
    auctionId: Number
});

let auctionId = ref(props.auctionId)

function FetchAuctionDetailsByAuctionId() {
   
    new MQL()
        .useManagementServer()
        .setActivity("o.[FetchAuctionDetailsByAuctionId]")
        .setData({auctionId:auctionId.value})
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAuctionDetailsByAuctionId", true)
            if (rs.isValid("FetchAuctionDetailsByAuctionId")) {
                //console.log(res)
                res.result.fetchAuctionDetails['auctionDocuments'] = res.result.fetchDocuments
                res.result.fetchAuctionDetails.item = JSON.parse("[" + res.result.fetchAuctionDetails.item + "]");
                const auctionDetailObj = res.result.fetchAuctionDetails;
            
                //console.log(auctionDetailObj,"auctionDetails")

                // Map documents to an object with documentTypeName as key and documentPath as value
                const documentsMap = {};
                auctionDetailObj.auctionDocuments.forEach(doc => {
                    documentsMap[doc.documentTypeName] = doc.documentPath;
                });

                // Assign documentsMap to auctionDetailObj
                auctionDetailObj.documentsMap = documentsMap;

                auctionDetails.value = auctionDetailObj;
                //console.log(auctionDetails.value, "auctionDetails.value********");
                //console.log(auctionDetails.value, "auctionDetails.value********");
            } else {
                rs.showErrorToast("FetchAuctionDetailsByAuctionId")
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
        }else{
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


onMounted(() => {
    FetchAuctionDetailsByAuctionId()
});
</script>

<!-- <style scoped>
.document-link {
    color: blue;
    text-decoration: underline;
}
.profile-field label {
    display: inline-block;
    width: 120px; /* Adjust width as needed */
    margin-right: 10px; /* Example margin between label and span */
}
.profile-field {
    margin-bottom: 10px; /* Example margin */
    border-bottom: 1px solid #ccc; /* Add border to separate fields */
}
</style> -->
