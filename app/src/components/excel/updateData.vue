<template>
  <div class="container-fluid" id="updateData">
    <h2 class="title alt">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Update Data
    </h2>
    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="box-login">
          <div class="p-card p-component">
            <div class="field">
              <label for="name">Enter name</label>
              <input
                type="text"
                class="p-inputtext p-component w-100 mt-2"
                id="name"
                v-model="excel.name"
                required
              />
            </div>
            <div class="field">
              <label for="mobile">Enter age</label>
              <input
                type="text"
                class="p-inputtext p-component w-100 mt-2"
                id="mobile"
                v-model="excel.age"
                required
              />
            </div>
            <div class="btn-wrapper">
              <button class="btn btn-submit" @click.prevent="updateData">
                <i class="isax isax-bold-tick-circle"></i>
                Submit
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
export default {
  data() {
    return {
      empList: [
        { name: "vikram", age: 27, address: "pune" },
        { name: "kunal", age: 28, address: "satara" },
        { name: "akshay", age: 29, address: "mumbai" },
      ],
      mobile: "",
      excel: {},
    };
  },
  components: {},
  methods: {
    updateData() {
      new MQL()
        .setActivity("o.[UpdateDataUsingExcel]")
        .setData([this.excel])
        .fetch()
        .then((rs) => {
          rs.getActivity("UpdateDataUsingExcel", true);
          if (rs.isValid("UpdateDataUsingExcel")) {
            // alert('Excel data updated successfully')
            this.$toast.success("Excel Data Updated Successfully");
            this.excel = {};
          } else {
            rs.showErrorToast("UpdateDataUsingExcel");
          }
        });
    },
  },
};
</script>
