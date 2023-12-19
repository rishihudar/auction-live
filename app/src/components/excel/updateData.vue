<template>
  <div id="updateData">
    <h2 class="text-xl font-bold flex gap-2 items-center justify-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Update Data
    </h2>
    <div class="box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
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
