<template>
  <div id="customID">
    <h2 class="text-xl font-bold flex gap-2 items-center justify-center">
      <i class="isax isax-bold-arrow-left-2 cursor-pointer" @click="$router.go(-1)"></i>
      Custom ID
    </h2>
    <div class="box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
        <div class="field">
            <div class="p-float-label">
                <InputText v-model="obj.objectId" :class="obj.objectId ? 'p-filled' : ''" id="objectID" />
                <label for="objectID">Enter object ID</label>
            </div>
        </div>
        <div class="field">
            <div class="p-float-label">
                <InputText v-model="obj.name" :class="obj.name ? 'p-filled' : ''" id="name" />
                <label for="name">Enter name</label>
            </div>
        </div>
        <div class="field">
            <div class="p-float-label">
                <InputText v-model="obj.address" :class="obj.address ? 'p-filled' : ''" id="address" />
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
