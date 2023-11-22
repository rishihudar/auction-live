<template>
  <div id="updateAndSave" class="container-fluid">
    <h2 class="title alt">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Updated and Save in Database
    </h2>
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="box-login">
          <div class="p-card p-conponent">
            <h3>Note</h3>
            <div class="mt-2">
              This feature updates the user age. Server can add 5 for given age
              and saves data in database.
            </div>
            <div class="field mt-4">
              <div class="p-float-label">
                <input
                  type="text"
                  class="p-inputtext p-component w-100"
                  :class="sobj.name ? 'p-filled' : ''"
                  v-model="sobj.name"
                  id="name"
                />
                <label for="name">Enter name</label>
              </div>
            </div>
            <div class="field">
              <div class="p-float-label">
                <input
                  type="text"
                  class="p-inputtext p-component w-100"
                  :class="sobj.age ? 'p-filled' : ''"
                  v-model="sobj.age"
                  id="age"
                />
                <label for="age">Enter age</label>
              </div>
            </div>
            <div class="field">
              <div class="p-float-label">
                <input
                  type="text"
                  class="p-inputtext p-component w-100"
                  :class="sobj.address ? 'p-filled' : ''"
                  v-model="sobj.address"
                  id="address"
                />
                <label for="address">Enter address</label>
              </div>
            </div>
            <div class="btn-wrapper">
              <button
                class="btn btn-submit"
                @click.prevent="updateObjectUsingBLAndSave"
              >
                <i class="isax isax-bold-document-upload"></i>
                Update and Save
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
      sobj: {},
    };
  },
  methods: {
    updateObjectUsingBLAndSave() {
      new MQL()
        .setActivity("o.[UpdateObjectUsingBLAndSave]")
        .setData(this.sobj)
        .fetch()
        .then((rs) => {
          rs.getActivity("UpdateObjectUsingBLAndSave", true);
          if (rs.isValid("UpdateObjectUsingBLAndSave")) {
            this.$toast.success("Update Object UsingBL And Save Successfully");
          } else {
            rs.showErrorToast("UpdateObjectUsingBLAndSave");
          }
        });
    },
  },
};
</script>
