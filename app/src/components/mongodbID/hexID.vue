<template>
  <div id="hexID" class="container-fluid">
    <h2 class="title alt">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Insert Custom Hex MongoDB ID
    </h2>
    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="box-login">
          <div class="p-card p-component">
            <div class="field">
              <div class="p-float-label">
                <input type="text" v-model="hobj._id" class="p-inputtext p-component" :class="hobj._id ? 'p-filled' : ''" id="hexObject">
                <label for="hexObject">Enter Hex Object ID</label>
              </div>
            </div>
            <div class="field">
              <div class="p-float-label">
                <input type="text" v-model="hobj.name" class="p-inputtext p-component" :class="hobj.name ? 'p-filled' : ''" id="name">
                <label for="name">Enter name</label>
              </div>
            </div>
            <div class="field">
              <div class="p-float-label">
                <input type="text" v-model="hobj.address" class="p-inputtext p-component" :class="hobj.address ? 'p-filled' : ''" id="address">
                <label for="address">Enter address</label>
              </div>
            </div>
            <div class="btn-wrapper">
              <button class="btn btn-submit" @click.prevent="saveCustomHexId">
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
import MQL from '@/plugins/mql.js'
export default {
  data () {
    return {
      hobj: {}
    }
  },
  methods: {
    saveCustomHexId () {
      new MQL()
        .setActivity('o.[SaveCustomHexObjectID]')
        .setData(this.hobj)
        .fetch()
        .then((rs) => {
          rs.getActivity('SaveCustomHexObjectID', true)
          if (rs.isValid('SaveCustomHexObjectID')) {
            this.hobj = {}
            alert('Custom hex objectId saved successfully')
          } else {
            rs.showErrorToast('SaveCustomHexObjectID')
          }
        })
    }
  }
}
</script>