<template>
  <div id="updateUser">
    <h2 class="text-xl font-bold flex gap-2 items-center justify-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Update User
    </h2>
    <div class="grid gap-4 grid-cols-2">
        <div class="box-login mx-auto p-8 w-full rounded-xl bg-white shadow">
            <div class="field">
              <div class="p-float-label">
                <input type="text" required v-model="obj.name" id="name" class="p-inputtext p-component w-100" :class="obj.name ? 'p-filled': ''">
                <label for="name">Enter name</label>
              </div>
            </div>
            <div class="field">
              <div class="p-float-label">
                <input type="text" required v-model="obj.age" id="age" class="p-inputtext p-component w-100" :class="obj.age ? 'p-filled': ''">
                <label for="age">Enter age</label>
              </div>
            </div>
            <div class="field">
              <div class="p-float-label">
                <input type="text" required v-model="obj.address" id="address" class="p-inputtext p-component w-100" :class="obj.address ? 'p-filled': ''">
                <label for="address">Enter address</label>
              </div>
            </div>
            <div class="btn-wrapper">
              <button class="btn btn-submit" @click.prevent="updateObjectUsingBL">
                <i class="isax isax-bold-tick-circle"></i>
                Update Data
              </button>
            </div>
        </div>
        <div class="box-login mx-auto p-8 w-full rounded-xl bg-white shadow">
            <h3>
              Note
            </h3>
            <div class="mt-2">
              This feature update the user age, Server can add 5 in given age & save data in database.
            </div>
            <h3 class="mt-5">
              Result
            </h3>
            <div class="mt-2">
              <json-viewer :value="result" boxed :expanded="true"></json-viewer>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import MQL from '@/plugins/mql.js'
import jsonViewer from 'vue-json-viewer'
export default {
  data () {
    return {
      obj: {},
      result: ''
    }
  },
  components: {
    jsonViewer
  },
  methods: {
    updateObjectUsingBL () {
      new MQL()
        .setActivity('o.[UpdateObjectUsingBL]')
        .setData(this.obj)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('UpdateObjectUsingBL', true)
          if (rs.isValid('UpdateObjectUsingBL')) {
            alert('Data update success')
            this.result = res.result
          } else {
            rs.showErrorToast('UpdateObjectUsingBL')
          }
        })
    }
  }
}
</script>
