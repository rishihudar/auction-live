<template>
  <div class="container-fluid">
    <h2 class="title alt">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Hash Salt
    </h2>
    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="box-login">
          <div class="p-card p-component">
            <div class="field">
              <div class="p-float-label">
                <input
                  type="text"
                  class="p-inputtext p-component"
                  :class="sname ? 'active' : ''"
                  v-model="sname"
                  id="sname"
                />
                <label for="sname">Generate Salt</label>
              </div>
            </div>
            <div class="field">
              <div class="p-float-label">
                <input
                  type="text"
                  class="p-inputtext p-component"
                  :class="saltKey ? 'active' : ''"
                  v-model="saltKey"
                  id="saltKey"
                />
                <label for="saltKey">Enter Salt Key</label>
              </div>
            </div>
            <div class="btn-wrapper">
              <button class="btn btn-submit" @click.prevent="generateSalt">
                <i class="isax isax-bold-security-card"></i>
                Generate Salt
              </button>
            </div>
            <div class="field mt-4">
              <h3>Result</h3>
              <json-viewer
                :value="saltResult"
                boxed
                :expanded="true"
              ></json-viewer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MQL from "@/plugins/mql.js";
import jsonViewer from "vue-json-viewer";
export default {
  data() {
    return {
      sname: "",
      saltKey: "",
      name: "",
      saltResult: {},
    };
  },
  components: {
    jsonViewer,
  },
  methods: {
    generateSalt() {
      new MQL()
        .setActivity("o.[GenerateSalt]")
        .setData({ name: this.sname, saltKey: this.saltKey })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("GenerateSalt", true);
          if (rs.isValid("GenerateSalt")) {
            this.saltResult = res.result;
            this.sname = "";
            this.saltKey = "";
          } else {
            rs.showErrorToast("GenerateSalt");
          }
        });
    },
  },
};
</script>
