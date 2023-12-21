<template>
  <div id="hexID">
    <h2 class="text-xl font-bold flex gap-2 items-center justify-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Insert Custom Hex MongoDB ID
    </h2>
    <div class="box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
        <div class="field">
            <div class="p-float-label">
                <InputText v-model="hobj._id" :class="hobj._id ? 'p-filled' : ''" id="hexObject" />
                <label for="hexObject">Enter Hex Object ID</label>
            </div>
        </div>
        <div class="field">
            <div class="p-float-label">
                <InputText v-model="hobj.name" :class="hobj.name ? 'p-filled' : ''" id="name" />
                <label for="name">Enter name</label>
            </div>
        </div>
        <div class="field">
            <div class="p-float-label">
                <InputText v-model="hobj.address" :class="hobj.address ? 'p-filled' : ''" id="address" />
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
