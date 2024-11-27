
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
            <div class="bs-item col-span-6 2xl:col-span-4" >
                <div class="bs-buttons">
                    <button @click="fetchNonH1Details()" class="btn btn-sm btn-secondary">Refund Non-H1 Documents</button>
                </div>
            </div>
        </div>
    </div>
      <!-- Dialog for unavailable document message -->
      <Dialog v-model:visible="showUnavailableDialog" header="Notice" :modal="true" :closable="true" width="300px">
        <p>This document is not available</p>
    </Dialog>

    <Dialog v-model:visible="showNonH1Details" header="Non-H1 Documents" :modal="true" :closable="true" width="300px">
        <div class="table-custom">
        <DataTable @rowExpand="onRowExpand" v-model:expandedRows="expandedRows" :value="nonH1Email" showGridlines>
          <Column field="nonH1Email" header="Non-H1 Email"></Column>
          <Column expander header="Details"></Column>
          <template #expansion="row">

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
      
  </template>

        </DataTable>
    </div>
    </Dialog>

</template>

<script setup>
import faEye from '../../../assets/icons/eye.svg';
import downloadIcon from '../../../assets/icons/download.svg';
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
const showUnavailableDialog = ref(false); // Controls visibility of unavailable document dialog
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
    // Show dialog if the document path is exactly "/"
    if (path === "/") {
        showUnavailableDialog.value = true;
        return;
    }

    imagePath.value = path.startsWith("http") ? path : `${window.app.getCDNBaseURL()}/${path}`;
    fetchImage(imagePath.value);
}

function fetchImage(url) {
    const headers = new Headers({
        "Authorization": "Bearer " + sessionStorage.getItem("user-token"),
        "Accept": "application/json, text/plain, */*"
    });

    fetch(url, { method: "GET", headers, redirect: "follow" })
        .then(response => response.blob())
        .then(blob => {
            imagePath.value = URL.createObjectURL(blob);
            window.open(imagePath.value);
        })
        .catch(() => {
            showUnavailableDialog.value = true; // Show dialog if fetching the image fails
        });
}

let documentList=ref([])
let jointHolderDocument=ref([])
let registrationDocuments=ref([])

let showNonH1Details= ref(false)
let nonH1Email=ref()

function fetchNonH1Details() {
 
    new MQL()
        .useManagementServer()
        .setActivity("r.[FetchNonH1Details]")
        .setData({auctionId:auctionId.value})
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchNonH1Details", true)
            if (rs.isValid("FetchNonH1Details")) {
                nonH1Email.value = res.result

            // documentList.value = res.result.fetchNonH1AuctionDocuments.filter(doc => !doc.docName.includes('holder'));
            // jointHolderDocument.value = res.result.fetchNonH1AuctionDocuments.filter(doc => doc.docName.includes('holder'));
            // registrationDocuments.value = res.result.fetchNonH1RegistrationDocuments

                showNonH1Details.value=true
            } else {
                rs.showErrorToast("FetchNonH1Details")
            }
        })

}

function fetchNonH1BidderDocument(emailId) {
 
 new MQL()
     .useManagementServer()
     .setActivity("r.[FetchNonH1BidderDocuments]")
     .setData({auctionId:auctionId.value,emailId:emailId})
     .fetch()
     .then(rs => {
         let res = rs.getActivity("FetchNonH1BidderDocuments", true)
         if (rs.isValid("FetchNonH1BidderDocuments")) {
            //  nonH1Email.value = res.result

         documentList.value = res.result.fetchNonH1AuctionDocuments.filter(doc => !doc.docName.includes('holder'));
         jointHolderDocument.value = res.result.fetchNonH1AuctionDocuments.filter(doc => doc.docName.includes('holder'));
         registrationDocuments.value = res.result.fetchNonH1RegistrationDocuments

            //  showNonH1Details.value=true
         } else {
             rs.showErrorToast("FetchNonH1BidderDocuments")
         }
     })

}



const onRowExpand = (event) => {
  expandedRows.value = [event.data];
  console.log("event.data.nonH1Email is "+event.data.nonH1Email)
  fetchNonH1BidderDocument(event.data.nonH1Email)
};

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
