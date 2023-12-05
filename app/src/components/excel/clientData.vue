<template>
  <div class="container-fluid" id="clientData">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Save Client Data
    </h2>
    <div class="subtext">
      This client data is saved in "Employee" collection of "cs playground"
      database.
    </div>
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="box-login">
          <div class="p-card p-component">
            <DataTable :value="empList" v-if="empList && empList.length > 0">
              <Column field="name" header="name"></Column>
              <Column field="age" header="age"></Column>
              <Column field="address" header="address"></Column>
            </DataTable>
            <div class="empty-state" v-else>Records not found</div>
            <div class="btn-wrapper">
              <button class="btn btn-submit" @click="saveClientDataUsingExcel">
                <i class="isax isax-bold-tick-circle"></i>
                Save Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MQL from "@/plugins/mql.js";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
export default {
  data() {
    return {
      empList: [
        { name: "vikram", age: 27, address: "pune" },
        { name: "kunal", age: 28, address: "satara" },
        { name: "akshay", age: 29, address: "mumbai" },
      ],
      url: "",
      excel: {},
    };
  },
  components: {
    DataTable,
    Column,
  },
  methods: {
    saveClientDataUsingExcel() {
      new MQL()
        .setActivity("o.[SaveClientDataUsingExcel]")
        .setData(this.empList)
        .fetch()
        .then((rs) => {
          rs.getActivity("SaveClientDataUsingExcel", true);
          if (rs.isValid("SaveClientDataUsingExcel")) {
            // alert('Employees saved successfully')
            this.$toast.success("Data saved successfully");
          } else {
            // rs.showErrorToast('SaveClientDataUsingExcel')
            this.$toast.error("SaveClientDataUsingExcel");
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.subtext {
  margin-top: 0.25rem;
  margin-left: 48px;
}
</style>
