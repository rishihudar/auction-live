<template>
    <h1>hello </h1>
    <div>
    <Button label="Add Custom Parameter"  @click="handleAdd()"   severity="secondary" />
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
        <Column field="gg" header="Action"> 
            <template #body="slotProps">
                <Button label="Action"  @click="handleAction(slotProps.data.pklCustomParamId,slotProps.data.vsCustomParamKey,slotProps.data.vsCustomParamValue,slotProps.data.vsDescription)"  severity="secondary" />

              </template>
        </Column>



        

        
      </DataTable>
    </div>

    



    <Dialog v-if="majorModal" v-model:visible="visible" modal header="Information" :style="{ width: '40rem' }">
      <template v-slot:default>
        <div class="tableCustom"  v-if="customdbid && customKey">
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
                <td><input v-model="customKey" /></td>
                <td><input v-model="customVal" /></td>
                <td><textarea v-model="customDes"></textarea></td>
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

</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import MQL from "@/plugins/mql.js";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import MultiSelect from "primevue/multiselect";
import router from "../../router";
import { useToast } from "primevue/usetoast";
import { login } from "../../store/modules/login";

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

const userID = ref(login().loginDetails.loginId);


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

function handleAddCustomPara( key,val,des){
  console.log("Add clicked key",key.value);
  console.log("Add clicked val",val);
  console.log("Add clicked des",des);

}
function handleAdd(){
  console.log("Add clicked");
  addModal.value =true;
  addvisible.value = true;


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
			.setData({})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchCustomParams",true)
			if (rs.isValid("FetchCustomParams")) {
                console.log("REsponse Custom Params:",res.result.CustomParameters);
                customParamsDetails.value = res.result.CustomParameters;
                console.log("REsponse Custom Params in client:",customParamsDetails.value);
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
.tableCustom table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.tableCustom th, .tableCustom td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}

.tableCustom th {
  background-color: #f9f9f9;
  font-weight: bold;
}

</style>