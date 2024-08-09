<template>

  <div>
    <div>
    <Button label="Add Custom Parameter" id="addCP" @click="handleAdd()"   severity="secondary" />
  </div>
    <div class="table-custom">

      <DataTable :value="customParamsDetails">
        <template #empty>
          <div class="box-watermark">No data found.</div>
        </template>
        <Column field="vsCustomParamKey" header="CustomParameter Key" > 
            
            
            
        </Column>
        <Column field="vsCustomParamValue" header="CustomParameter Value" > 
       </Column>
        <Column field="vsDescription" header="CustomParameter Description" > </Column>
        <Column field="gg" header="Action " > 
            <template #body="slotProps">
                <Button label="Action"  @click="handleAction(slotProps.data.pklCustomParamId,slotProps.data.vsCustomParamKey,slotProps.data.vsCustomParamValue,slotProps.data.vsDescription)"  severity="secondary" />

              </template>
        </Column>



        

      </DataTable>

      <Paginator class="pagination-down" :rows="perPage" :rowsPerPageOptions="[5, 10, 20]" :totalRecords="totalRows"
        template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" @page="handlePageChange" />
    </div>

    <Dialog v-if="addModal" v-model:visible="addvisible" modal header="ADD" :style="{ width: '40rem' }">
      <template v-slot:default>
        <div class="table-custom" >
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><InputText id="addKey" v-model="addKey"  placeholder="enter key "/> </td>
                <td><InputText id="addVal" v-model="addVal"  placeholder="enter value "/> </td>
                <td><Textarea v-model="addDes"  placeholder="enter description"  rows="5" cols="30" />   </td>

                
              </tr>
            </tbody>
          </table>
          <Button label="ADD"  @click="handleAddCustomPara(addKey,addVal,addDes)"  severity="secondary" />
        </div>
        </template>
    </Dialog>



    <Dialog v-if="majorModal" v-model:visible="visible" modal header="Information" :style="{ width: '50rem' }">
      <template v-slot:default>
        <div class="table-custom"  v-if="customdbid && customKey">
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{customKey}}</td>
                <td><Textarea id="customVal" v-model="customVal" rows="5" cols="30"/> </td>
                <td><Textarea v-model="customDes"  rows="5" cols="30" /> </td>
              </tr>
            </tbody>
          </table>
          <Button label="Edit"  @click="handleEdit(customdbid,customKey,customVal,customDes)" severity="secondary" />
          <Button label="Delete" @click="handleDelete(customdbid)" severity="danger" />


        </div>
        <div v-else>
          <p>No data available.</p>
        </div>
      </template>
    </Dialog>
    
    
    <Toast />
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import MQL from "@/plugins/mql.js";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import { login } from "../../store/modules/login";
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Paginator from 'primevue/paginator';
import faWebhook from "../../../assets/icons/webhook.svg";



const toast = useToast();
let editingItem =ref(null);
let majorModal = ref(true);
let addModal = ref(true);
let addKey = ref(null);
let addVal = ref(null);
let addDes = ref(null);
let visible = ref(false);
let addvisible = ref(false);
let customVal = ref(null);
let customKey = ref(null);
let customDes = ref(null);
let customdbid = ref(null);
const perPage = ref(5);
const totalRows = ref();
const currentPage = ref(0);
const userID = ref(login().loginDetails.loginId);

function handlePageChange(event) {
  currentPage.value = event.page;
  perPage.value = event.rows;
  console.log("event.page", event.page);
  fetchCustomParamsDetails();

}
function handleAction(id,key,value,decription){
  majorModal.value =true;
    console.log("Edit clicked id",id);
    console.log("Edit clicked key ",key);
    console.log("Edit clicked value",value);
    console.log("Edit clicked value",decription);
   
    visible.value = true;
    customdbid.value = id;
    customVal.value = value;
    customKey.value = key;
    customDes.value = decription;
  

    
}

function handleAddCustomPara( addkey,addval,adddes){
  console.log("Add clicked key",addkey);
  console.log("Add clicked val",addval);
  console.log("Add clicked des",adddes);
  if(addkey==null || addval==null || adddes==null){
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Please enter all the fields",
      life: 3000,
    });
    return;
  }
  addCustomParamsDetails(addkey,addval,adddes);


}
function handleAdd(){
  console.log("Add clicked");
  addModal.value =true;
  addvisible.value = true;
  

}
function addCustomParamsDetails(key,value,des){

					// Automatically generated
          new MQL()
          .useManagementServer()
			.setActivity("r.[AddCustomParams]")
			.setData({"description":des,"key":key,"userid":userID.value,"value":value})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("AddCustomParams",true)
			if (rs.isValid("AddCustomParams")) {
        showSuccess("Custom Parameter Added Successfully");
        fetchCustomParamsDetails();
        
        addModal.value =false;
        addDes.value = null;
        addKey.value = null;
        addVal.value = null;
			} else
			 { 
			rs.showErrorToast("AddCustomParams")
			}
			})
			
    
         
}
function handleDelete(customdbid){
  console.log("Delete clicked id",customdbid);
  deleteCustomParamsDetails(customdbid);
}
function handleEdit(id,key,value,des){
  console.log("LoginId :",userID.value);
    console.log(" DBID",id);
    console.log("New Key ",key);
    console.log("New Value",value);
    console.log("New Description",des  );
    updateCustomParamsDetails(id,key,value,des,userID.value)

}

function deleteCustomParamsDetails(id){
  console.log("delete");
  
					// Automatically generated
          new MQL()
        .useManagementServer()
			.setActivity("r.[DeleteCustomPara]")
			.setData({"id":id})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("DeleteCustomPara",true)
			if (rs.isValid("DeleteCustomPara")) {
        showSuccess("Custom Parameter Deleted Successfully");
        fetchCustomParamsDetails();
        majorModal.value =false;
			} else
			 { 
			rs.showErrorToast("DeleteCustomPara")
			}
			})
			
}
const customParamsDetails = ref([]);
function fetchCustomParamsDetails(){
    
					// Automatically generated
			new MQL()
            .useManagementServer()

			.setActivity("r.[FetchCustomParams]")
			.setData({
        skip: String(currentPage.value * perPage.value),
        limit: String(perPage.value),
      })
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchCustomParams",true)
			if (rs.isValid("FetchCustomParams")) {
        // totalRows.value=res.result.CustomParameters.length;
        totalRows.value = res.result.rowCount.totalRows;

        console.log("length:",totalRows.value);
                console.log("REsponse Custom Params:",res.result.CustomParameters);
                customParamsDetails.value = res.result.CustomParameters;
                console.log("REsponse Custom Params in client:",customParamsDetails.value);
                for (var i = 0; i < customParamsDetails.value.length; i++) {
                customParamsDetails.value[i].srNo = currentPage.value * perPage.value + i + 1;
                console.log("SrNo-", currentPage.value * perPage.value + i + 1);
                }
			} else
			 { 
			rs.showErrorToast("FetchCustomParams")
			}
			})
			

}
function updateCustomParamsDetails(id,key,value,des,userid){
    
         
					// Automatically generated
			new MQL()
      .useManagementServer()
			.setActivity("r.[UpdateCustomParams]")
			.setData({"description":des,"id":id,"key":key,"userid":userid,"value":value})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("UpdateCustomParams",true)
			if (rs.isValid("UpdateCustomParams")) {
        showSuccess("Custom Parameter Updated Successfully");
        fetchCustomParamsDetails();
        majorModal.value =false;
			} else
			 { 
			rs.showErrorToast("UpdateCustomParams")
			}
			})
			
     
}
onMounted(() => {
  fetchCustomParamsDetails();
  
});
const showSuccess = (msg) => {  // added toast if items deleted succesfully
  toast.add({
    severity: "success",
    summary: "Success",
    detail: msg,
    life: 3000,
  });
};


</script>

<style scoped>


</style>