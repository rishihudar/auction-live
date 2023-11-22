<template>
  <div class="container-fluid" id="saveData">
    <h2 class="title alt">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Save excel data
    </h2>
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="box-login">
          <div class="p-card p-component">
            <div class="field">
              <label for="text">Activity</label>
              <input
                type="text"
                class="p-inputtext p-component w-100 mt-2"
                id="activity"
              />
            </div>
            <div class="btn-wrapper">
              <button
                class="btn btn-submit"
                @click.prevent="saveExcelDataUsingActivity"
              >
                <i class="isax isax-bold-tick-circle"></i>
                Save excel data
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="box-login">
          <div class="p-card p-component">
            <h4>Testing CDN File</h4>
            <div class="mt-3">
              <a
                href="https://testcdncs.mkcl.org/1TxYD2KhMcczFlxXntsueOYN46J/demoFolder/Test.xlsx"
              >
                https://testcdncs.mkcl.org/1TxYD2KhMcczFlxXntsueOYN46J/demoFolder/Test.xlsx
              </a>
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
      url: "",
    };
  },
  components: {},
  methods: {
    saveExcelDataUsingActivity() {
      new MQL()
        .setActivity("o.[SaveActivityDataUsingExcel]")
        .setData({ excelURL: this.url })
        .fetch()
        .then((rs) => {
          rs.getActivity("SaveActivityDataUsingExcel", true);
          if (rs.isValid("SaveActivityDataUsingExcel")) {
            // alert('Excel data saved successfully using activity')
            this.$toast.success("Excel data saved successfully using activity");
            this.url = "";
          } else {
            rs.showErrorToast("SaveActivityDataUsingExcel");
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.subtext {
  margin-top: 0.75rem;
  margin-left: 3rem;
}

h4 + div {
  word-break: break-word;
}
</style>
