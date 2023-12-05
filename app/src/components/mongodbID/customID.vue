<template>
  <div id="customID" class="container-fluid">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Custom ID
    </h2>
    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="box-login">
          <div class="p-card p-component">
            <div class="field">
              <div class="p-float-label">
                <input type="text" v-model="obj.objectId" class="p-inputtext p-component" :class="obj.objectId ? 'p-filled' : ''" id="objectID">
                <label for="objectID">Enter object ID</label>
              </div>
            </div>
            <div class="field">
              <div class="p-float-label">
                <input type="text" v-model="obj.name" class="p-inputtext p-component" :class="obj.name ? 'p-filled' : ''" id="name">
                <label for="name">Enter name</label>
              </div>
            </div>
            <div class="field">
              <div class="p-float-label">
                <input type="text" v-model="obj.address" class="p-inputtext p-component" :class="obj.address ? 'p-filled' : ''" id="address">
                <label for="address">Enter address</label>
              </div>
            </div>
            <div class="btn-wrapper">
              <button class="btn btn-submit" @click="saveCustomId">
                <i class="isax isax-bold-tick-circle"></i>
                Save
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MQL from '@/plugins/mql.js'
export default {
  data () {
    return {
      obj: {}
    }
  },
  methods: {
    saveCustomId () {
      new MQL()
        .setActivity('o.[SaveCustomObjectID]')
        .setData(this.obj)
        .fetch()
        .then((rs) => {
          rs.getActivity('SaveCustomObjectID', true)
          if (rs.isValid('SaveCustomObjectID')) {
            this.obj = {}
          } else {
            rs.showErrorToast('SaveCustomObjectID')
          }
        })
    }
  }
}
</script>
