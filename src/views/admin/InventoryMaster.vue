<template>
  <div id="inventoryMaster">
    <div class="page-header">
      <div class="ph-text">
        <h2 class="title">Inventory Master</h2>
      </div>
    </div>

    <form></form>
    <div class="card">
      <div class="form-grid">
        <div class="col-span-4">
          <div class="fm-group">
            <label for="selectOrganization" class="fm-label">Select Organization</label>
            <div class="fm-inner">
              <!-- Organization Dropdown -->
              <Dropdown
                v-model="OrganizationId"
                :options="organizations"
                placeholder="Select Organization"
                optionLabel="organizationName"
                optionValue="OrganizationId"
                @change="onChangeEntityList"
              ></Dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="form-grid">
        <div class="col-span-4">
          <div class="fm-group">
            <label for="selectEntity" class="fm-label">Select Entity</label>
            <div class="fm-inner">
              <!-- Entity Dropdown -->
              <Dropdown
                v-model="selectedEntity"
                :options="mcNames"
                placeholder="Select Entity"
                optionLabel="mcEntityName"
                optionValue="mcEntityId"
                @change="showSelectedMC"
              ></Dropdown>
            </div>
          </div>
        </div>
        <div class="col-span-4" v-if="selectedEntity">
          <div class="fm-group">
            <label for="selectCategory" class="fm-label">Select Category</label>
            <div class="fm-inner">
              <!-- Category Dropdown -->
              <Dropdown
                v-model="selectedCategory"
                :options="inventoryCategories"
                placeholder="Select Category"
                optionLabel="propertyCategoryName"
                optionValue="propertyCategoryId"
                @change="fetchInventoryTempColumns"
              ></Dropdown>
            </div>
          </div>
        </div>
        <div class="col-span-4" v-if="selectedCategory">
          <div class="fm-group">
            <div class="fm-label-holder">
              <label for="chooseExcel" class="fm-label"
                >Choose Excel File</label
              >

              <a
                v-if="[2, 3, 4, 7].includes(selectedCategory)"
                :href="templateURL + '/InventoryTemplates/InventoryTemp.xlsx'"
                download
                >DOWNLOAD TEMPLATE</a
              >
              <a
                v-if="[1, 5, 6, 8].includes(selectedCategory)"
                :href="
                  templateURL +
                  '/InventoryTemplates/InventoryTemp_Booth_VacantLand_Industrial.xlsx'
                "
                download
                >DOWNLOAD TEMPLATE</a
              >
            </div>
            <FileUpload
              name="excelFile"
              label="Choose Excel File"
              v-model="isFileSelected"
              :accept="docType"
              :multiple="false"
              :max-file-size="docSize * multiplyingFactor"
              mode="basic"
              :auto="true"
              :custom-upload="true"
              @uploader="onChange"
            ></FileUpload>
          </div>
        </div>
        <div class="fm-action">
          <Button label="Upload" v-if="isFileSelected" @click="handleUpload"
            >Upload</Button
          >
        </div>
      </div>
    </div>

    <div class="block-header" v-if="isFileSelected">
      <div class="sh-text">
        <h3 class="title">Uploaded Excel List</h3>
      </div>
    </div>
    <div class="table-custom" v-if="isFileSelected">
      <DataTable :value="sheet">
        <Column
          v-for="col of transformedColumns"
          :key="col.field"
          :field="col.field"
          :header="col.field"
        >
        </Column>
      </DataTable>
    </div>

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
import { login } from "../../store/modules/login";
import router from "../../router";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right", duration: 3000 });
let docValidation = ref([]);
let docName = ref();
let docTypeId = ref();
let docType = ref();
let docSize = ref();

let multiplyingFactor = ref();
const loginStore = login();
const inventoryCategories = ref();
const selectedCategory = ref();
const isFileSelected = ref(false);
const organizationId = ref(login().loginDetails.organizationId);
const entityId = ref(login().loginDetails.entityId);
const userID = ref(login().loginDetails.loginId);

function fetchInventonryCategories() {
  new MQL()
    .useCoreServer()
    .setActivity("o.[FetchInventoryCategories]")
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchInventoryCategories", true);
      if (rs.isValid("FetchInventoryCategories")) {
        // //console.log("fetchInventonryCategories result", res.result);
        inventoryCategories.value = res.result;
        // //console.log("Inventory Categories", inventoryCategories.value);
      } else {
        rs.showErrorToast("FetchInventoryCategories");
      }
    });
}

const templateURL = ref();
const organizations = ref();
const OrganizationId= ref();
function fetchInventonryTemplates() {
  new MQL()
    .useCoreServer()
    .setActivity("o.[FetchInventoryTemplatesURL]")
    .setData({ assetName: "INVENTORY_TEMPLATE_URL" })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchInventoryTemplatesURL", true);
      if (rs.isValid("FetchInventoryTemplatesURL")) {
        templateURL.value = res.result.cdnURL;
        console.log(templateURL.value);
      } else {
        rs.showErrorToast("FetchInventoryTemplatesURL");
      }
    });
}

function fetchOrganizations() {
  console.log('orgId',organizationId.value)
  new MQL()
    .useCoreServer()
    .setActivity("o.[FetchOrganizations]")
    .setData({ parentOrganizationId: organizationId.value })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchOrganizations", true);
      if (rs.isValid("FetchOrganizations")) {
        console.log('Organizations List',res.result)
        organizations.value = res.result;
        // OrganizationId.value = res.result[0].OrganizationId;
      } else {
        rs.showErrorToast("FetchOrganizations");
      }
    });
}
onBeforeMount(() => {
  fetchInventonryCategories();
 // fetchEntitiesList();
  fetchInventonryTemplates();
  fetchOrganizations();
});

function showSelectedMC() {
  console.log("selectedEntity", selectedEntity.value);
  console.log("selectedCategory", selectedCategory.value);
}

const onChangeEntityList = (event) =>  {
  console.log('event',event)
  console.log(OrganizationId.value,"OrganizationId for Entity")
  fetchEntitiesList();
}

const sheet = ref();
const file = ref();
const columns = ref();
const transformedColumns = ref();
const myFile = ref();

function onChange(event) {
  isFileSelected.value = true;
  myFile.value = event.files[0];
  //console.log(event.files[0]);
  sheet.value = null;
  // errortemp = false
  file.value = event.files ? myFile.value : null;
  if (file.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      //console.log(wb, "NewWorkBook");
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const workSheetDataArray = XLSX.utils.sheet_to_json(ws, { header: 1 });
      //console.log("WorksheetData in Array Format", workSheetDataArray);
      const workSheetDataJson = XLSX.utils.sheet_to_json(ws, { header: 0 });
      // //console.log('WorksheeetData in Json Key:Value Format', workSheetDataJson)
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
      //console.log("columns.value",columns.value)
      //console.log("ColumnTempNames.value",columnTempNames.value)
      if (arraysMatch) {
        //console.log("The arrays match.");
        transformedColumns.value = columns.value.map((cNames) => {
          return { field: cNames };
          ////console.log('transformedColumns',transformedColumns.value)
        });
      } else {
        //console.log("The arrays do not match.");
        alert("Invalid Template");
        isFileSelected.value = false;
        // router.push({path:'/inventoryMasterCard'})
        // window.location.reload();
      }
    };
    reader.readAsBinaryString(file.value);
  }
}

async function handleUpload() {
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
      //console.log(response.data);
      // Handle successful upload response
      //console.log("Count of rows inserted into db:",response.data);
      if (response.data == 0) {
        alert(
          "Data Already Exists in Inventory and" +
            response.data +
            " Data Inserted!"
        );
      } else if (response.data > 0) {
        alert(
          "Data Successfully Inserted and " + response.data + "Data Inserted!"
        );
        cdnProfileUpload(myFile.value); // returning promise
      } else {
        alert("Server Down! Data Insertion Failed!");
      }
    })
    .catch((error) => {
      // Handle upload error
      console.error("Error uploading file:", error);
    });
}

const fileUploadTemp = ref();
const filePath3 = ref();
async function cdnProfileUpload(filetoupload) {
  let formData = new FormData();
  // //console.log(event.files[0])
  formData.append("file", filetoupload); // append your file as 'file' in formdata.
  new MQLCdn()
    .enablePageLoader(true)
    // FIXED: change this to directory path
    .setDirectoryPath("/UploadedDocuments/Inventory/" + selectedEntity.value) // (optional field) if you want to save  file to specific directory path
    .setFormData(formData) // (required) sets file data
    .setFileName("ExcelItemUpload") // (optional field) if you want to set name to file that is being uploaded
    // FIXED: pass buckeyKey instead of name
    .setBucketKey("2jShKtD7AYRkXfHBNkGjTGCIy6c") // (required) valid bucket key need to set in which file will be uploaded.
    .setPurposeId("2jShIbFBT6McJiVCRzQVo52WOqq") // (required) valid purposeId need to set in which file will be uploaded.
    .setClientId("2jShIbFBT6McJiVCRzQVo52WOqq") // (required) valid purposeId need to set in which file will be uploaded.
    .uploadFile("uploadtBtn")
    .then((res) => {
      // (required) this will upload file takes element id (optional param) which will be blocked while file upload..
      if (res.isValid()) {
        // returns uploaded file url..
        //console.log("Uploaded File URL", res.uploadedFileURL())
        let path = res.uploadedFileURL();
        let pathcdn = path.cdnServer;
        let actual = path.filePath;
        filePath3.value = `${pathcdn}/${actual}`;

        //console.log("path",filePath3.value)
        //console.log("filename",filetoupload.name)
        //console.log("userid",userID.value)
        InsertUploadedFileInDB(
          filetoupload.name,
          filePath3.value,
          filePath3.value,
          userID.value
        );
      } else {
        res.showErrorToast();
      }
    });
}

function InsertUploadedFileInDB(Filename, Filepath1, Filepath2, Userid) {
  // Automatically generated
  new MQL()
    .useCoreServer()
    .setActivity("o.[InsertUploadFileData]")
    .setData({
      fileName: Filename,
      filePath1: Filepath1,
      filePath2: Filepath2,
      userId: Userid,
      userID: Userid,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("InsertUploadFileData", true);
      if (rs.isValid("InsertUploadFileData")) {
        toaster.success("file uploaded.");
        //console.log("RESULT:" , res.result)
        router.push({ path: "/inventoryMasterCard" });
        // window.location.reload();
      } else {
        rs.showErrorToast("InsertUploadFileData");
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
        //console.log("FetchInventoryTemplateColumns", res.result);
        columnTempNames.value = res.result[0].columnNames;
      } else {
        rs.showErrorToast("FetchInventoryTemplateColumns");
      }
    });
}



const mcNames = ref();
const selectedEntity = ref();
function fetchEntitiesList() {
  console.log('orgId',OrganizationId.value)
  console.log("function called")
  new MQL()
    .useCoreServer()
    .setActivity("o.[FetchEntitiesForInventoryMaster]")
    .setData({
      orgId: OrganizationId.value,
      organizationId: OrganizationId.value,
      entId: entityId.value,
      entityId: entityId.value,
      isParent: 0,
    })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchEntitiesForInventoryMaster", true);
      if (rs.isValid("FetchEntitiesForInventoryMaster")) {
        //console.log('Entities List',res.result)
        mcNames.value = res.result;
      } else {
        rs.showErrorToast("FetchEntitiesForInventoryMaster");
      }
    });
}

function fetchDocumentsValidationDetails() {
  // Automatically generated
  new MQL()
    .useCoreServer()
    .setActivity("o.[fetchDocumentsValidationDetails]")

    .fetch()
    .then((rs) => {
      let res = rs.getActivity("fetchDocumentsValidationDetails", true);
      docValidation.value = res.result.validation;
      docValidation.value.forEach((item) => {
        if (item.typeName == "INVENTORY_UPLOAD_TEMPLATE") {
          //MATCH WITH DB DOCUMENT TYPE NAME
          docName.value = item.typeName;
          docSize.value = item.fileSize;
          docType.value = item.fileType;
          docTypeId.value = item.typeId;
          //console.log("docName.value", docName.value);
        }
      });
    });
}

function fetchMultiplyingFactor() {
  // Automatically generated
  new MQL()
    .useManagementServer()
    .setActivity("o.[FetchCustomParam]")
    .setData({ customParam: "MULTIPLYING_FACTOR" })

    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchCustomParam", true);
      if (rs.isValid("FetchCustomParam")) {
        multiplyingFactor.value = res.result.customParam;
        console.log("#########", multiplyingFactor.value);
      } else {
        rs.showErrorToast("FetchCustomParam");
      }
    });
}
</script>
