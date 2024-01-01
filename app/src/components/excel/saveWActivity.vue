<template>
  <div id="saveData">
    <h2 class="text-xl font-bold flex gap-2 items-center justify-center">
      Save excel data
    </h2>
    <div class="grid gap-4 grid-cols-2">
        <div class="box-login mx-auto p-8 w-full rounded-xl bg-white shadow">
            <div class="field">
              <label for="text">Activity</label>
              <input
                type="text"
                class="p-inputtext p-component w-100 mt-2"
                id="activity"
              />
            </div>
            <div class="btn-wrapper mt-4">
              <button
                class="btn btn-submit"
                @click.prevent="saveExcelDataUsingActivity"
              >
                <i class="isax isax-bold-tick-circle"></i>
                Save excel data
              </button>
            </div>
        </div>
        <div class="box-login mx-auto p-8 rounded-xl bg-white shadow">
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
h4 + div {
  word-break: break-word;
}
</style>
