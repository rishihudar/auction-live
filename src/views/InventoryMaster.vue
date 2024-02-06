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

    <!-- Category Dropdown -->
    <Dropdown
      v-model="selectedCategory"
      :options="inventoryCategories"
      placeholder="Select Category"
      class="w-full md:w-14rem"
      optionLabel="propertyCategoryName"
      optionValue="propertyCategoryId"
    ></Dropdown>

    <a
      v-if="['2', '3', '4', '7'].includes(selectedCategory)"
      :href="`assets/Files/Residential_SCO_SCF_Institute_Inventory_Master_Template.xlsx`"
      download
      ><br />
      <Button label="DOWNLOAD TEMPLATE HERE" link /></a
    >
    <a
      v-if="['1', '5', '6', '8'].includes(selectedCategory)"
      :href="`assets/Files/Residential_SCO_SCF_Institute_Inventory_Master_Template.xlsx`"
      download
      ><br />
      <Button label="DOWNLOAD TEMPLATE HERE" link /></a
    >

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
    <br>
    <Button  label="Upload"  v-if="isFileSelected" @click="handleUpload"> Upload </Button>

    <DataTable :value="sheet" tableStyle="min-width: 50rem">
      <Column
        v-for="col of transformedColumns"
        :key="col.field"
        :field="col.field"
        :header="col.field"
      >
      </Column>
    </DataTable>
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

const inventoryCategories = ref();
const selectedCategory = ref();
const isFileSelected = ref(false);

function fetchInventonryCategories() {
  new MQL()
    .setActivity("o.[FetchInventoryCategories]")
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchInventoryCategories", true);
      if (rs.isValid("FetchInventoryCategories")) {
        console.log("fetchInventonryCategories result", res.result);
        inventoryCategories.value = res.result;
        console.log("Inventory Categories", inventoryCategories.value);
      } else {
        rs.showErrorToast("FetchInventoryCategories");
      }
    });
}
onBeforeMount(() => {
  fetchInventonryCategories();
});

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
      // console.log('WorksheetData in Array Format', workSheetDataArray)
      const workSheetDataJson = XLSX.utils.sheet_to_json(ws, { header: 0 });
      // console.log('WorksheeetData in Json Key:Value Format', workSheetDataJson)
      sheet.value = workSheetDataJson;
      columns.value = workSheetDataArray[0];
      /*Use the map function to transform each element in the array 
           cNames represents each element (column name) in the original array (columns)
           Return an object with the 'field' property set to the current column name */
      transformedColumns.value = columns.value.map((cNames) => {
        return { field: cNames };
      });
      //console.log('transformedColumns',transformedColumns.value)
    };
    reader.readAsBinaryString(file.value);
  }
}

function handleUpload() {
  const formData = new FormData();
  formData.append("myFile", myFile.value); // Assuming you only allow one file to be uploaded
  formData.append("categoryId", selectedCategory.value);
  formData.append("organizationId",1);
  formData.append("entityId",2)
  axios
    .post("http://localhost:8000/upload", formData, {
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
</script>
