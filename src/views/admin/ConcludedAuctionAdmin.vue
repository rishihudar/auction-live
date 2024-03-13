<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Concluded Auction</h2>
            </div>
        </div>
        <!-- Sample Master tables-->
        <div class="table-custom">
            <DataTable v-model:expandedRows="expandedRows" :value="products" :filters="filters" sortMode="multiple"
                paginator paginatorPosition="both" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                <!-- <template #header>
                          <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                              <h4 class="m-0">Manage Products</h4>
                          </div>
                      </template> -->

                <template #paginatorstart>
                    <div class="fm-inner">
                        <InputText v-model="filters['global'].value" placeholder="Search..." />
                        <fa-magnifying-glass class="fm-icon fm-prefix"></fa-magnifying-glass>
                    </div>
                </template>
                <Column field="auctionId" header=" Auction Code"></Column>
                <Column field="auctionDescription" header="Auction Description"></Column>
                <Column field="auctionCategoryName" header="Auction Category"></Column>
                <Column field="auctionStartDate" header="Auction StartDate/Time"></Column>
                <Column field="auctionEndDate" header="Auction EndDate/Time"></Column>

                <Column expander style="width: 50rem" field="" header="Action">
                </Column>

                <template #expansion="slot">
                    <AuctionDetailsForConcludedAuction :auctionId="slot.data.auctionId">
                    </AuctionDetailsForConcludedAuction>
                </template>
                <Column expander style="width: 50rem" field="" header="Report">
                    <template #body="{ data }">
                        <Button @click=showModal(data.auctionId)>Auction Report</Button>
                        <Button @click="showModalForH1(data.auctionId)">H1Report</Button>
                    </template>
                </Column>
            </DataTable>
        </div>
        <div>

            <Dialog v-model:visible="displayModal" header="Auction Report">
                <div v-show="true" id="pdfDiv" ref="html2PdfRef">
                    <img src="../../../assets/images/logo_dulb.webp" />
                    <p>{{ auctionDetailsReport[0].entityName }}</p>
                    <h2> Auction Details Statement</h2>

                    <p>Auction Code: {{ auctionDetailsReport[0].auctionCode }}</p>
                    <!-- <div v-for="(item, index) in auctionDetailsReport" :key="index">
                        <p>Sr No:{{ index + 1 }}</p>
                        <p>Created On: {{ item.createdOn }}</p>
                        <p>Full Name: {{ item.fullName }}</p>
                        <p>Quoted Value: {{ item.quotedValue }}</p>
                        <p>Round Number: {{ item.roundNumber }}</p>
                    </div> -->
                    <DataTable :value="auctionDetailsReport">
                            <Column field="srNo" header="Sr No"></Column>
                            <Column field="quotedValue" header="Quoted Value"></Column>
                            <Column field="fullName" header="Full Name"></Column>
                            <Column field="createdOn" header="Created On"></Column>
                            <Column field="roundNumber" header="Round Number"></Column>

                          
                        </DataTable>
                </div>
                <Button @click="generatePdf">Generate PDF</Button>
            </Dialog>
        </div>
        <div>

            <Dialog v-model:visible="displayModal1" header="H1Report">
                <div v-show="true" id="pdfDiv" ref="html2PdfRef">
                    <img src="../../../assets/images/logo_dulb.webp" />
                    <p>{{ auctionH1Report[0].entityName }}</p>
                    <h2>Highest Bidder Auction Statement</h2>

                    <p>Auction Code: {{ auctionH1Report[0].auctionCode }}</p>
                    <p>Publishing Date:{{ auctionH1Report[0].startDate }}{{ auctionH1Report[0].endDate }}</p>
                    <p>Scheduling Date:{{ auctionH1Report[0].registrationStartDate }}{{
                auctionH1Report[0].registrationEndDate
            }}</p>
                    <p>Item Name:{{ auctionH1Report[0].inventoryHierarchy }}</p>
                    <!-- <div v-for="(item, index) in auctionH1Report" :key="index">  -->
                         <!-- <p> Sr. No{{ index+1 }}</p>
                        <p>Full Name: {{ item.fullName }}</p>
                        <p>Flat:{{ item.inventoryName }}</p>
                        <p>Email ID:{{ item.email }}</p>
                        <p>Bidder Name:{{ item.fullName }}</p>
                        <p>Round Number:{{ item.soldRoundNumber }}</p>
                        <p>Highest Quoted Value:{{ item.inventorySoldForPrice }}</p> -->
                         <DataTable :value="auctionH1Report">
                            <Column field="srNo" header="Sr No"></Column>
                            <Column field="fullName" header="Full Name"></Column>
                            <Column field="inventoryName" header="Flat"></Column>
                            <Column field="email" header="Email ID"></Column>
                            <Column field="soldRoundNumber" header="Round Number"></Column>
                            <Column field="inventorySoldForPrice" header="Highest Quoted Value"></Column>
                        </DataTable>
                     
                    <!-- </div>  -->
                 </div> 
                <Button @click="generatePdfH1">Generate PDF</Button>
            </Dialog>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { login } from "../../store/modules/login.js";
import MQL from "@/plugins/mql.js";
import { useRoute } from "vue-router";
import Dialog from 'primevue/dialog';

import AuctionDetailsForConcludedAuction from "./AuctionDetailsForConcludedAuction.vue";
// import Vue3Html2pdf from 'vue3-html2pdf'
//import teleport from 'vue-teleport';
import html2pdf from "html2pdf.js";
const expandedRows = ref([]);
const displayModal = ref(false);
const displayModal1 = ref(false);
const route = useRoute();
const html2PdfRef = ref(null);
const loginStore = login();
const products = ref();
const entityId = ref("");
let auctionId = ref([]);
const auctionDetails = ref({});
let auctionDetailsReport = ref({});
let auctionH1Report = ref({});
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
onMounted(() => {
    entityId.value = route.params.id;
    fetchConcludedAuctionsBidder();
});

function fetchConcludedAuctionsBidder() {
    console.log("Selected Entity Id", login().loginDetails);
    new MQL()
        .useManagementServer()
        .setActivity("r.[FetchConcludedAuctionsBidder]")
        .setData({
            entityId: login().loginDetails.entityId,
            organizationId: login().loginDetails.organizationId,
            userId: login().loginDetails.loginId,
            statusCode: "AUCTION_CONCLUDED",
            skip: "0",
            limit: "1",
            filter: "%%",
        })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity("FetchConcludedAuctionsBidder", true);
            if (rs.isValid("FetchConcludedAuctionsBidder")) {
                products.value = res.result.concludedAuctions;
                console.log(res.result, "concluded result**********");
            } else {
                rs.showErrorToast("FetchConcludedAuctionsBidder");
            }
        });
}



// Function to generate PDF
async function fetchAuctionDetailsReport(auctionId) {
    try {
        console.log("Selected Entity Id", login().loginDetails);
        const rs = await new MQL()
            .useManagementServer()
            .setActivity("r.[FetchAuctionDetailReportByAuctionId]")
            .setData({
                auctionId: auctionId,
            })
            .fetch();

        const res = rs.getActivity("FetchAuctionDetailReportByAuctionId", true);
        if (rs.isValid("FetchAuctionDetailReportByAuctionId")) {
            console.log(res.result, "auctionDetailsReport result**********");
            auctionDetailsReport.value = res.result; // Update the ref value
            for(var i=0;i<auctionDetailsReport.value.length;i++){
                auctionDetailsReport.value[i].srNo=i+1;
            }
            return res.result; // Return the result
        } else {
            rs.showErrorToast("FetchAuctionDetailReportByAuctionId");
            throw new Error("Error fetching auction details report");
        }
    } catch (error) {
        console.error("Error fetching auction details report:", error);
        throw error;
    }
}

async function fetchAuctionReportForH1(auctionId) {
    try {
        console.log("Selected Entity Id", login().loginDetails);
        const rs = await new MQL()
            .useManagementServer()
            .setActivity("r.[FetchAuctionReportForH1]")
            .setData({
                auctionId: auctionId,
            })
            .fetch();

        const res = rs.getActivity("FetchAuctionReportForH1", true);
        if (rs.isValid("FetchAuctionReportForH1")) {
            console.log(res.result, "auctionH1Report result!@!@!@!@!@");
            auctionH1Report.value = res.result; // Update the ref value
            for(var i=0;i<auctionH1Report.value.length;i++){
                auctionH1Report.value[i].srNo=i+1;
            }
            return res.result; // Return the result
        } else {
            rs.showErrorToast("FetchAuctionReportForH1");
            throw new Error("Error fetching auction h1  report");
        }
    } catch (error) {
        console.error("Error fetching auction details report:", error);
        throw error;
    }
}


async function generatePdf(auctionId) {
    try {
        // Fetch auction details report
        // const auctionDetailsReportData = await fetchAuctionDetailsReport(auctionId);

        // Generate the PDF
        var element = document.getElementById("pdfDiv");
        const options = {
            margin: 1,
            filename: "myfile.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },

        };

        html2pdf().set(options).from(element).save();
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
}
async function generatePdfH1(auctionId) {
    try {
        // Generate the PDF
        var element = document.getElementById("pdfDiv");
        const options = {
            margin: 1,
            filename: "myfile.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },

        };

        html2pdf().set(options).from(element).save();
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
}


async function showModal(auctionId) {
    console.log("#####", auctionId)
    await fetchAuctionDetailsReport(auctionId);
    displayModal.value = true;
}

async function showModalForH1(auctionId) {
    console.log("#####", auctionId)
    await fetchAuctionReportForH1(auctionId);
    displayModal1.value = true;
}



</script>