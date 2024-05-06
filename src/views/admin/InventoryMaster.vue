<template>
  <div id="inventoryMaster">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i
        class="isax isax-bold-arrow-left-2 cursor-pointer"
        @click="$router.go(-1)"
      ></i>
      Inventory Master
    </h2>

    <form></form>
    
    <!-- Entity Dropdown -->
    <Dropdown
      v-model="selectedEntity"
      :options="mcNames"
      placeholder="Select Entity"
      optionLabel="mcEntityName"
      optionValue="mcEntityId"
      @change="showSelectedMC"
    ></Dropdown>

    <!-- Category Dropdown -->
    <Dropdown
    v-if="selectedEntity"
      v-model="selectedCategory"
      :options="inventoryCategories"
      placeholder="Select Category"
      class="w-full md:w-14rem"
      optionLabel="propertyCategoryName"
      optionValue="propertyCategoryId"
      @change="fetchInventoryTempColumns"
    ></Dropdown>

    <a
      v-if="['2', '3', '4', '7'].includes(selectedCategory)"
      :href="`https://testcdncs.mkcl.org/22Jbn9juCuMfJ4fNA1Sp8AAVERE/InventoryTemplates/InventoryTemp.xlsx`"
      download
      ><br />
      <Button label="DOWNLOAD TEMPLATE HERE" link
    /></a>
    <a
      v-if="['1', '5', '6', '8'].includes(selectedCategory)"
      :href="`https://testcdncs.mkcl.org/22Jbn9juCuMfJ4fNA1Sp8AAVERE/InventoryTemplates/InventoryTemp_Booth_VacantLand_Industrial.xlsx`"
      download
      ><br />
      <Button label="DOWNLOAD TEMPLATE HERE" link
    /></a>

    <FileUpload
      name="excelFile"
      label="Choose Excel File"
      accept=".xlsx,"
      v-if="selectedCategory"
      v-model="isFileSelected"
      mode="basic"
      :auto="true"
      :custom-upload="true"
      @uploader="onChange"
    ></FileUpload>
    <br />

    <Button label="Upload" v-if="isFileSelected" @click="handleUpload">
      Upload
    </Button>

    <DataTable :value="sheet" tableStyle="min-width: 50rem">
      <Column
        v-for="col of transformedColumns"
        :key="col.field"
        :field="col.field"
        :header="col.field"
      >
      </Column>
    </DataTable>

    <!-- Upload Inventory Templates CDN  -->
    <!-- <FileUpload 
    v-model="fileUploadTemp" 
    mode="basic" 
    name="fileUploadTemp" 
    :auto="true" 
    :custom-upload="true"
     @uploader="cdnProfileUpload" 
     class="w-full md:w-14rem"
     /> -->
  </div>
</template>
<script setup>
import { ref, onBeforeMount, computed } from "vue";
import Dropdown from "primevue/dropdown";
import FileUpload from "primevue/fileupload";
import * as XLSX from "xlsx";
import MQL from "@/plugins/mql.js";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import axios from "axios";
import MQLCdn from "@/plugins/mqlCdn.js";
import { login } from "../../store/modules/login"

const loginStore = login();
const inventoryCategories = ref();
const selectedCategory = ref();
const isFileSelected = ref(false);
const organizationId = ref(login().loginDetails.organizationId);
const entityId = ref(login().loginDetails.entityId);

function fetchInventonryCategories() {
  new MQL()
  .useCoreServer()
    .setActivity("o.[FetchInventoryCategories]")
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchInventoryCategories", true);
      if (rs.isValid("FetchInventoryCategories")) {
        // console.log("fetchInventonryCategories result", res.result);
        inventoryCategories.value = res.result;
        // console.log("Inventory Categories", inventoryCategories.value);
      } else {
        rs.showErrorToast("FetchInventoryCategories");
      }
    });
}
onBeforeMount(() => {
  fetchInventonryCategories();
  fetchEntitiesList();
});

function showSelectedMC(){
console.log('selected ',selectedEntity.value)
}

const sheet = ref();
const file = ref();
const columns = ref();
const transformedColumns = ref();
const myFile = ref();

function onChange(event) {
  isFileSelected.value = true;
  myFile.value = event.files[0];
  console.log(event.files[0]);
  sheet.value = null;
  // errortemp = false
  file.value = event.files ? myFile.value : null;
  if (file.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      console.log(wb, "NewWorkBook");
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const workSheetDataArray = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log("WorksheetData in Array Format", workSheetDataArray);
      const workSheetDataJson = XLSX.utils.sheet_to_json(ws, { header: 0 });
      // console.log('WorksheeetData in Json Key:Value Format', workSheetDataJson)
      sheet.value = workSheetDataJson;
      columns.value = workSheetDataArray[0];

      /* Validation of Column Names from Sheet Matches the Column Names of Selected Category
      if they match the excel template is valid and then using the map function to transform each element in the array, 
      cNames represents each element (column name) in the original array (columns)
      Return an object with the 'field' property set to the current column name. 
      else throws alert Invalid Template  */

      var arraysMatch = columns.value.every((item) =>
        columnTempNames.value.includes(item)
      );
      console.log("columns.value",columns.value)
      console.log("ColumnTempNames.value",columnTempNames.value)
      if (arraysMatch) {
        console.log("The arrays match.");
        transformedColumns.value = columns.value.map((cNames) => {
          return { field: cNames };
          //console.log('transformedColumns',transformedColumns.value)
        });
      } else {
        console.log("The arrays do not match.");
        alert("Invalid Template");
        window.location.reload();
      }
    };
    reader.readAsBinaryString(file.value);
  }
}

function handleUpload() {
  const formData = new FormData();
  formData.append("myFile", myFile.value); // Assuming you only allow one file to be uploaded
  formData.append("categoryId", selectedCategory.value);
  formData.append("organizationId", organizationId.value);
  formData.append("entityId", selectedEntity.value);
  axios
    .post("/upload-server/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // Handle successful upload response
      console.log(response.data);
      alert(response.data);
      window.location.reload();
    })
    .catch((error) => {
      // Handle upload error
      console.error("Error uploading file:", error);
    });
}

const fileUploadTemp = ref();
function cdnProfileUpload(event) {
  let formData = new FormData();
  // console.log(event.files[0])
  formData.append("file", event.files[0]); // append your file as 'file' in formdata.
  new MQLCdn()
    .enablePageLoader(true)
    // FIXED: change this to directory path
    .setDirectoryPath("/InventoryTemplates") // (optional field) if you want to save  file to specific directory path
    .setFormData(formData) // (required) sets file data
    .setFileName("InventoryTemp_Booth_VacantLand_Industrial") // (optional field) if you want to set name to file that is being uploaded
    // FIXED: pass buckeyKey instead of name
    .setBucketKey("22Jbn9juCuMfJ4fNA1Sp8AAVERE") // (required) valid bucket key need to set in which file will be uploaded.
    .setPurposeId("1TxY9TS4uzp8Ivyo0eKPpo1g2Og") // (required) valid purposeId need to set in which file will be uploaded.
    .setClientId("1TxY9TS4uzp8Ivyo0eKPpo1g2Og") // (required) valid purposeId need to set in which file will be uploaded.
    .uploadFile("uploadtBtn")
    .then((res) => {
      // (required) this will upload file takes element id (optional param) which will be blocked while file upload..
      if (res.isValid()) {
        // returns uploaded file url..
        // console.log("Uploaded File URL", res.uploadedFileURL())
        toaster.success("file uploaded.");
      } else {
        res.showErrorToast();
      }
    });
}

const columnTempNames = ref();
function fetchInventoryTempColumns() {
  new MQL()
  .useCoreServer()
    .setActivity("o.[FetchInventoryTemplateColumns]")
    .setData({ inventoryCategoryId: selectedCategory.value })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchInventoryTemplateColumns", true);
      if (rs.isValid("FetchInventoryTemplateColumns")) {
        console.log("FetchInventoryTemplateColumns", res.result);
        columnTempNames.value = res.result[0].columnNames;
      } else {
        rs.showErrorToast("FetchInventoryTemplateColumns");
      }
    });
}


const mcNames = ref();
const selectedEntity = ref();
function fetchEntitiesList(){
   console.log('orgId',organizationId.value)
			new MQL()
      .useCoreServer()
			.setActivity("o.[FetchEntitiesForInventoryMaster]")
			.setData({orgId:organizationId.value,organizationId:organizationId.value,entId:entityId.value,entityId:entityId.value,isParent:0})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("FetchEntitiesForInventoryMaster",true)
			if (rs.isValid("FetchEntitiesForInventoryMaster")) {
        console.log('Entities List',res.result)
        mcNames.value = res.result
			} else
			 { 
			rs.showErrorToast("FetchEntitiesForInventoryMaster")
			}
			})
			
}

</script>
