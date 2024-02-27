<!-- src/components/ExcelViewer.vue -->
<template>
    <div class="card">
        <Toast />
        <FileUpload 
            name="demo[]" 
            url="http://localhost:8000/api/upload" 
            @upload="onAdvancedUpload($event)" 
            :multiple="true" 
            accept=".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" 
            :maxFileSize="1000000">

            <template #empty>
                <p>Drag and drop files to here to upload.</p>
            </template>
            
        </FileUpload>
    </div>
    <div>
      <DataTable :value="excelData">
        <Column
          v-for="field in fields"
          :key="field"
          :field="field"
          :header="field"
        />
      </DataTable>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import FileUpload from 'primevue/fileupload';
  import { useToast } from "primevue/usetoast";

//   import 'primevue/resources/themes/saga-blue/theme.css'; // Choose your theme
//   import 'primevue/resources/primevue.min.css';
//   import 'primeicons/primeicons.css';
  
  export default {
    components: {
      DataTable,
      FileUpload,
      Column,
    },
    setup() {
      const excelData = ref([]);
      const fields = ref([]);
      const toast = useToast();


      onMounted(async () => {
        try{
        // Fetch and set your Excel data and fields here
        // For simplicity, you can manually set some sample data

        const response = await fetch('http://localhost:8000/ExcelViewer');
            const data = await response.json();
  
        excelData.value = data;
  
        if (excelData.value.length > 0) {
          fields.value = Object.keys(excelData.value[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      })

      const onAdvancedUpload = () => {
            toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
        };
  
      return {
        excelData,
        onAdvancedUpload,
        fields,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles if needed */
  </style>
  