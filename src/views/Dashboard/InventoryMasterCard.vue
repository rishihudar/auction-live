<template>
    <div>
        <div class="page-header">
            <div class="ph-text">
                <h2 class="title">Inventory Master</h2>
            </div>
        </div>
        <div class="form-grid">
            <div class="col-span-2">
                            <Button
                                label="Add Items"
                                severity="secondary"
                                @click="navigateInventotyUpload"
                                class="w-full"
                            />
            </div>
                        </div>
        <div class="table-custom">
            <DataTable :value="inventoryMasterDetails">
                <template #empty>
                    <div class="box-watermark">
                        No data found.
                    </div>
                </template>
                <Column field="Auction Category" header="Auction Category"></Column>
                <Column field="District" header="District"></Column>
                <Column field="MC" header="MC"></Column>
                <Column field="Location" header="Location"></Column>
                <Column field="Area" header="Area"></Column>
                <Column field="Total Properties" header="Total Properties"></Column>
                <Column field="Sold Properties" header="Sold Properties"></Column>
                <Column field="Remaining Properties" header="Remaining Properties"></Column>
            </DataTable>
        </div>

        <div class="box-grid mt-10">
            <div class="col-span-6">
                <div class="card">
                    <div class="card-header">
                        <div class="ch-title">Download Master</div>
                    </div>
                    <div class="form-grid">
                        <div class="col-span-9">
                            <div class="fm-group">
                                <div class="fm-inner">
                                    <MultiSelect
                                        v-model="selectedCategory"
                                        :options="categoryList"
                                        optionLabel="Auction Category"
                                        optionValue="Auction Category"
                                        placeholder="Select Category"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="col-span-3">
                            <Button
                                label="Apply filter"
                                severity="secondary"
                                @click="fetchFilteredData"
                                class="w-full"
                            />
                        </div>
                        <div class="fm-action">
                            <JsonExcel 
                                :data="json_data"
                                type="xlsx"
                                class="btn btn-primary cursor-pointer"
                                worksheet="My Worksheet"
                                name="filename.xlsx"
                            >
                                Download Data
                            </JsonExcel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import MQL from "@/plugins/mql.js";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { storeToRefs } from 'pinia';
import { login } from "../../store/modules/login"
import JsonExcel from "vue-json-excel3";
import Button from "primevue/button";
import MultiSelect from 'primevue/multiselect';
import router from "../../router";


let selectedCategory = ref([])
const categoryList = ref()

const loginStore = login();

const {organizationId, entityId, loginId } = storeToRefs(loginStore);
let inventoryMasterDetails = ref()

let json_data = ref([])
// let categoryListMql = ref()

function navigateInventotyUpload(){
    router.push({path:'/inventoryMaster'})
}

function fetchFilteredData() {
			
			new MQL()
            .useManagementServer()
			.setActivity("r.[DownloadInventoryList]")
			.setData({"entityId":entityId.value,"inventoryCategoryName":selectedCategory.value.join(",")})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("DownloadInventoryList",true)
			if (rs.isValid("DownloadInventoryList")) {
                json_data.value = res.result
                console.log("json_data ",json_data.value)
			} else
			 { 
			rs.showErrorToast("DownloadInventoryList")
			}
			})
			
}

function fetchInventoryMasterDetails() {
    
			new MQL()
            .useManagementServer()
			.setActivity("r.[InventoryMasterDetailList]")
			.setData({"entityId":entityId.value})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("InventoryMasterDetailList",true)
			if (rs.isValid("InventoryMasterDetailList")) {
                inventoryMasterDetails.value = res.result.fetchInventoryMasterDetailsList
                categoryList.value = res.result.fetchCategoryList
                console.log("inventoryMasterDetails.value is ",inventoryMasterDetails.value)
                console.log("entityId.value is ",entityId.value)
			} else
			 { 
			rs.showErrorToast("InventoryMasterDetailList")
			}
			})
			
}

onMounted(() => {
    fetchInventoryMasterDetails();
} )

</script>

<style>

</style>
