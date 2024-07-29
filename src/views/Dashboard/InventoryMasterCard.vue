<template>
  <div>
    
    <div class="page-header">
      <div class="ph-text">
        <h2 class="title">Inventory Master</h2>
      </div>
      <div class="ph-action" v-if="showAddItemBtn">
        <Button label="Add Items" severity="secondary" @click="navigateInventotyUpload" class="w-full" />
      </div>
    </div>

    <div class="table-custom">
      <DataTable :value="inventoryMasterDetails">
        <template #empty>
          <div class="box-watermark">No data found.</div>
        </template>
        <Column field="Auction Category" header="Auction Category"> </Column>
        <Column field="District" header="District"></Column>
        <Column field="MC" header="MC"></Column>
        <Column field="Location" header="Location"></Column>
        <Column field="Area" header="Area"></Column>
        <Column field="Total Properties" header="Total Properties">
          <template #body="slotProps">
            <Button :label="slotProps.data['Total Properties']"
              @click="handleAction(slotProps.data, 'Total Properties')" /> </template>
        </Column>
        <Column field="Sold Properties" header="Sold Properties">
          <template #body="slotProps">
            <Button :label="slotProps.data['Sold Properties']"
              @click="handleAction(slotProps.data, 'Sold Properties')" />
          </template>
        </Column>
        <Column field="Remaining Properties" header="Remaining Properties">
          <template #body="slotProps">
            <Button :label="slotProps.data['Remaining Properties']"
              @click="handleAction(slotProps.data, 'Remaining Properties')" /> </template>
        </Column>
      </DataTable>


      <Dialog  v-if="majorModal" v-model:visible="visible" modal header="Information" :style="{ width: '25rem' }">
        <p class="m-0">
          {{ dialogContent }}
        </p>

        <!-- dialogHeader.value=='Sold Properties' -->
        <!-- dialogHeader.value=='Remaining Properties'
        dialogHeader.value=='Total Properties' -->
        <div class="table-custom" v-if="dialogHeader == 'Total Properties'">
          <DataTable :value="allProperties">

            <Column field="vsInventoryName" header="Total Properties"></Column>

          </DataTable>

        </div>


        


        <div class="table-custom" v-if="dialogHeader == 'Remaining Properties'">
          <DataTable :value="unsoldProperties">

            <Column field="vsInventoryName" header="Unsold Properties"></Column>
            <Column header="Status">


              <template #body="slotProps">
                <Checkbox v-model="slotProps.data.accepted" @change="handleAddtoArray(slotProps.data.pklInventoryId,slotProps.data.vsInventoryName)"
                  :binary="true" :value="slotProps.data.pklInventoryId" v-if="slotProps.data.checkboxchecked"/>
              </template>
            </Column>


          </DataTable>
          <Button label="Mark As Disable" @click="handleEmptyId"  severity="danger" />
        </div>

          <div class="table-custom" v-if="dialogHeader == 'Sold Properties'">
            <DataTable :value="soldProperties">

              <Column field="vsInventoryName" header="Sold Properties"></Column>

            </DataTable>

          </div>
  
      </Dialog>
    </div>



    <div class="content-holder">
      <div class="fm-action">
        <JsonExcel
    :data="softDeletedItemsDb"
    type="xlsx"
    class="btn btn-primary cursor-pointer"
    worksheet="My Worksheet"
    name="ProcessingDeleteReport.xlsx"
  >
    Deleted Items Report
  </JsonExcel>
      </div>
    </div>

    <Dialog v-if="showPrompt"  :visible=showPrompt modal header="Are You Sure?" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8"><p> 	<ul>
        <li v-for="item in DataNames_to_delete" :key="item.Name">{{ item.Name }}    </li>
      </ul> will be deleted from Master Tab</p></span>
            
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="showPrompt = false , majorModal =false"></Button>
                <Button type="button" label="Ok" @click="handleSoftDelete"></Button>
            </div>
        </Dialog>






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
                  <MultiSelect v-model="selectedCategory" :options="categoryList" optionLabel="Auction Category"
                    optionValue="Auction Category" placeholder="Select Category" />
                </div>
              </div>
            </div>
            <div class="col-span-3">
              <Button label="Apply filter" severity="secondary" @click="fetchFilteredData" class="w-full" />
            </div>
            <div class="fm-action">
              <JsonExcel :data="json_data" type="xlsx" class="btn btn-primary cursor-pointer" worksheet="My Worksheet"
                name="filename.xlsx">
                Download Data
              </JsonExcel>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Toast />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import MQL from "@/plugins/mql.js";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { storeToRefs } from "pinia";
import { login } from "../../store/modules/login";
import JsonExcel from "vue-json-excel3";
import Button from "primevue/button";
import MultiSelect from "primevue/multiselect";
import router from "../../router";
import Checkbox from "primevue/checkbox";
import { useToast } from "primevue/usetoast";
const toast = useToast();
let selectedCategory = ref([]);
let softDeletedItemsDb = ref([]);
let itemInCurrentAuction = ref()
let showPrompt = ref(false);
const categoryList = ref();
let visible = ref(false);
let AuctionCodes = ref([])
let dialogContent = ref("");
let dialogHeader = ref("");
let EntityId = ref();
const loginStore = login();
let unsoldProperties = ref([]);
let soldProperties = ref([]);
const { organizationId, entityId, loginId } = storeToRefs(loginStore);
let inventoryMasterDetails = ref();
let InventoryLevelId = ref();
let allProperties = ref([]);
let json_data = ref([]);
let data_to_delete = ref([]);
let DataNames_to_delete = ref([]);
const accepted = ref(true);
// let categoryListMql = ref()
let majorModal = ref(true);
function navigateInventotyUpload() {
  router.push({ path: "/inventoryMaster" });
}

function fetchFilteredData() {
  new MQL()
    .useManagementServer()
    .setActivity("r.[DownloadInventoryList]")
    .setData({
      entityId: entityId.value,
      inventoryCategoryName: selectedCategory.value.join(","),
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("DownloadInventoryList", true);
      if (rs.isValid("DownloadInventoryList")) {
        json_data.value = res.result;
        console.log("json_data ", json_data.value);
      } else {
        rs.showErrorToast("DownloadInventoryList");
      }
    });
}

const showAddItemBtn = ref(false);

function checkRole() {
  //console.log('add item btn',showAddItemBtn.value)
  //console.log('curr role',login().role.roleCode)
  //console.log('####',login().role.roleCode === "ROLE_SUPERADMIN")
  if (login().role.roleCode === "ROLE_SUPERADMIN") {
    showAddItemBtn.value = true;
    // console.log('add item btn after true',showAddItemBtn.value)
  }
}

function fetchInventoryMasterDetails() {
  new MQL()
    .useManagementServer()
    .setActivity("r.[InventoryMasterDetailList]")
    .setData({ entityId: entityId.value })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("InventoryMasterDetailList", true);
      if (rs.isValid("InventoryMasterDetailList")) {
        inventoryMasterDetails.value =
          res.result.fetchInventoryMasterDetailsList;
        categoryList.value = res.result.fetchCategoryList;
        console.log(
          "inventoryMasterDetails.value is ",
          inventoryMasterDetails.value
        );

        // console.log(
        //   "fklInventoryLevelId",
        //   res.result.fetchInventoryMasterDetailsList[4].fklInventoryLevelId
        // );

        console.log("entityId.value is ", entityId.value);
      } else {
        rs.showErrorToast("InventoryMasterDetailList");
      }
    });
}


function fetchingSoftDeletedItems() {//seting softDeletedItemsDb for downloaing excel sheet
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("r.[FetchSoftDeletedItems]")
    .setData({})

    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchSoftDeletedItems", true);
      if (rs.isValid("FetchSoftDeletedItems")) {
        softDeletedItemsDb.value = res.result.Softdeleteitems;
        // console.log(
        //   "softDeletedItemsDb:Soft Deleted items are:",
        //   softDeletedItemsDb.value
        // );
      } else {
        rs.showErrorToast("FetchSoftDeletedItems");
      }
    });
}



function AllItemsbyInventoryLevelId(hierarchy, InventoryLevelId, EntityId) { //cs function for fetching all items details 
  console.log(
    "Function AllItemsbyInventoryLevelId started for ID",
    InventoryLevelId
  );
  return new Promise((resolve, reject) => {
    new MQL()
      .useManagementServer()
      .setActivity("r.[FetchAllItemsbyInventoryLevelId]")
      .setData({
        InventoryLevelId: InventoryLevelId,
        hierarchy: hierarchy,
        EntityId: EntityId,
      })
      .fetch()
      .then((rs) => {
        let res = rs.getActivity("FetchAllItemsbyInventoryLevelId", true);
        if (rs.isValid("FetchAllItemsbyInventoryLevelId")) {
          // console.log("Result from DB:", res);
          allProperties.value = res.result.items;
          unsoldProperties.value = res.result.UnsoldItems;
          unsoldProperties.value.forEach(item => {
          item.checkboxchecked = true;
          });
          soldProperties.value = res.result.SoldItems;
          resolve(res); // Resolve the promise with the result
        } else {
          rs.showErrorToast("FetchAllItemsbyInventoryLevelId");
          reject(
            new Error("Invalid response from FetchAllItemsbyInventoryLevelId")
          );
        }
      })
      .catch((error) => {
        console.error("Error in fetch:", error);
        reject(error); // Reject the promise if there's an error
      });
  });
}

async function handleAction(rowData, Header) {
  try {
    majorModal.value = true;
    dialogHeader.value = Header; //for setting modal header
    let hierarchy = ref();
    // console.log(
    //   "Button clicked for::fklInventoryLevelId",
    //   rowData.fklInventoryLevelId
    // ); //for passing fklinventry to show all item for particular category

    // console.log("dialogHeader:", dialogHeader.value);
    InventoryLevelId.value = rowData.fklInventoryLevelId;
    EntityId.value = rowData.fklEntityId;
    // console.log("EntityId", EntityId.value);
    // console.log("inventoryMasterDetails", inventoryMasterDetails.value);
    // console.log("rowData", rowData);
    // console.log("rowData.District", rowData.District);
    // console.log("rowData.Mc", rowData.MC);
    // console.log("rowData.Location", rowData.Location);
    // console.log("rowData.Area", rowData.Area);
    dialogContent.value = `Details for ${rowData[`${dialogHeader.value}`]} ${
      dialogHeader.value   //header to be set accorning user clicks 
    } in ${rowData["District"]}.`;
    visible.value = true;
    hierarchy = `%${rowData.District}<>${rowData.MC}<>${rowData.Location}<>${rowData.Area}%`;
    console.log("hirarchy", hierarchy);
    let res = await AllItemsbyInventoryLevelId( //calling cs for fetching details of items 
      hierarchy,
      InventoryLevelId.value,
      EntityId.value
    );
    DataNames_to_delete.value = [];  //empty array if already value present in it 
    data_to_delete.value = []; //empty array if already value present in it
    // console.log("await res");
    console.log("Items from db", allProperties.value);
    if (dialogHeader.value == "Remaining Properties") { // checking header
      // console.log("Dealing with Unsold Properties");
      console.log("UnSold Properties:", unsoldProperties.value);
    } else if (dialogHeader.value == "Sold Properties") { // checking header
      // console.log("Dealing with Sold Properties");
      //call CS for sold Properties
      console.log("Sold Properties:", soldProperties.value);
    } else {
      // console.log("Dealing with Total Properties");
      //call CS for Total Properties
      console.log("Total PRoperties:", allProperties.value);
    }
  } catch (error) {
    console.log("error:", error);
  }
}

async function handleSoftDelete() {  
  showPrompt.value = false;
  majorModal.value = false;
  console.log("All ids to be deleted", data_to_delete);
  //call MQL here
  let res = await forLoopforSoftDelete(data_to_delete.value);  //calling here CS 
  console.log("Awaited Res:", res);
  
  if (res.result == "SUCCESS") { // means soft delete items succesful
    fetchingSoftDeletedItems()
    showSuccess(); //showing success toast

    fetchInventoryMasterDetails(); //fetching latest details
  }
}

function forLoopforSoftDelete(ids) {  // calling CS loop for 1. insert items details in table and after updating inventorysoldid=2
  return new Promise((resolve, reject) => {
    new MQL()
      .useManagementServer()
      .setActivity("r.[InsertAndSoftDeleteUsingForLoop]")
      .setData({ data_to_delete: ids })
      .fetch()
      .then((rs) => {
        let res = rs.getActivity("InsertAndSoftDeleteUsingForLoop", true);
        if (rs.isValid("InsertAndSoftDeleteUsingForLoop")) {
          resolve(res);
        } else {
          rs.showErrorToast("InsertAndSoftDeleteUsingForLoop");
          reject(
            new Error("Invalid response for InsertAndSoftDeleteUsingForLoop")
          );
        }
      })
      .catch((error) => {
        console.error("Error in Deleted Data:", error);
        reject(error); // Reject the promise if there's an error
      });
  });
}

function handleEmptyId() { // if array empty then shows warning after cliking delete button 
  if (
    data_to_delete.value.length == 0 &&
    DataNames_to_delete.value.length == 0
  ) {
    showWarn();
  } else {
    showPrompt.value = true;
  }
}

function CheckItemPresentInCurrent(id){  // calling core service to check items present in current/upcoming auctions return 0 if not present otherwise 1
  return new Promise((resolve, reject) => {
  
  // Automatically generated
			new MQL()
      .useManagementServer()
			.setActivity("r.[CheckItemExistInCurrentAuction]")
			.setData({"id":id})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("CheckItemExistInCurrentAuction",true)
			if (rs.isValid("CheckItemExistInCurrentAuction")) {
        itemInCurrentAuction.value=res.result.match_exists
        
        resolve(res); 
       
			} else
			 { 
			rs.showErrorToast("CheckItemExistInCurrentAuction")
      reject(new Error("Invalid response from CheckItemExistInCurrentAuction")); // Reject with an error
			}
			})
    });
}



async function AuctionCodesbyID(id){ // calling core service for fetching auctions codes
  return new Promise((resolve, reject) => {
					// Automatically generated
          new MQL()
          .useManagementServer()
			.setActivity("r.[CurrentAuctionsbyId]")
			.setData({"id":id})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("CurrentAuctionsbyId",true)
			if (rs.isValid("CurrentAuctionsbyId")) {
        AuctionCodes.value=res.result
        resolve(res); 
			} else
			 { 
			rs.showErrorToast("CurrentAuctionsbyId")
      reject(new Error("Invalid response from CurrentAuctionsbyId"));
			}
			})
    });
			
}
const showWarn = () => { //added toast if user click without selecting single item to be deleted
  toast.add({
    severity: "warn",
    summary: "Warning",
    detail: "Please Select items",
    life: 3000,
  });
};

const showWarnforItemPresentInCurrentAuction = (Name,str) => {  // added toast for //warning if items are associated with current/upcoming auctions with Auctions code 
  toast.add({
    severity: "error",
    summary: "Warning",
    detail: `Property cannot be disabled/deleted. Selected property ${Name} associated with current/upcoming auction ${str}`,
    life: 5000,
    position :"top-center"
  });
};
async function handleAddtoArray(id, Name) { //to add one by one id to array 

 await  CheckItemPresentInCurrent(id) //checking item is associated with current/upcoming auctions if yes then return 1 ,if no then return 0
 
 
  if( itemInCurrentAuction.value==0 ) { // meaning item is not  associated with current/upcoming auctions
    const index = data_to_delete.value.findIndex((item) => item.id === id); //cheking if itemid present already in array
      if (index === -1 ){
      // If the id is not found in data_to_delete, add it and set accepted to false
      // console.log("Item Does not present in curent auction/upcomin auction")
      // console.log("result for curent item in curent auction:", itemInCurrentAuction.value)
      // console.log("for id:",id)
      // console.log("Soft Delete started of id:", id);
      data_to_delete.value.push({ id });
      DataNames_to_delete.value.push({ Name }); //added items for soft deleting to array
      accepted.value = false; // Set accepted to false for the current row
      // console.log("All id after added to array:", data_to_delete.value);
      }else {
    
    
        
      // console.log("Soft Delete removed of id:", id);
      // If the id is found, remove it from data_to_delete and set accepted to true
      data_to_delete.value.splice(index, 1);
       
       
    // Remove item from DataNames_to_delete
      const nameIndex = DataNames_to_delete.value.findIndex(
        (item) => item.Name === Name
      );
      if (nameIndex !== -1) {
        DataNames_to_delete.value.splice(nameIndex, 1); //removed items name from Array if user unticked checkbox
      }
      // console.log("All id after removed to array:", data_to_delete.value);
      // console.log("result for curent item in curent auction:", itemInCurrentAuction.value)
      // console.log("for id:",id)
  }
    
   
    

    
    // Set accepted to true for the current row
  }else{

    // console.log("result for curent item in curent auction:", itemInCurrentAuction.value)
    // console.log("for id:",id)
    // console.log("Item present in curent auction/upcomin auction .Hence Cannot be delete")
    await AuctionCodesbyID(id) //fetching auctions codes from db if items are associated with current/upcoming auctions
    let auctioncodeString =AuctionCodes.value.AuctionCodes.map(item => item.vsAuctionCode).join(', '); //joining all acutions code by comma separted
    // console.log("AuctionCode strin:",auctioncodeString)
    const item = unsoldProperties.value.find(item => item.pklInventoryId == id);
    console.log("After set item",item)
    if (item) {
      item.checkboxchecked = false; // set to false for disable checkbox so that user further cannot select items twice if it is already associated with current/upcoming auctions
      // console.log("After set checkboxchecked:false",item)
    }
    //if by mistake item present in deleted_array then it should be removed
    const index = data_to_delete.value.findIndex((item) => item.id === id);
    if (index != -1){
      //it is present so remove
      data_to_delete.value.splice(index, 1);
      // console.log("All id after remove to array:", data_to_delete.value);

    }
    console.log("All ids for soft delete :", data_to_delete.value);
    accepted.value = true; //for toggling of checkbox
    showWarnforItemPresentInCurrentAuction(Name,auctioncodeString) //warning if items are associated with current/upcoming auctions with Auctions code 

  }
  
 


  
      
}

onMounted(() => {
  checkRole();
  fetchInventoryMasterDetails();
  fetchingSoftDeletedItems(); //fetching soft deleted items from db for downloading excelsheet
});

const showSuccess = () => {  // added toast if items deleted succesfully
  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Items Deleted!",
    life: 3000,
  });
};
</script>

<style>
</style>
