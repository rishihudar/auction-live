<template>
  <div id="decryptData">
    <h2 class="text-xl font-bold flex gap-2 items-center justify-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Decrypt Data
    </h2>
    <div class="box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
        <div class="field">
            <div class="p-float-label">
            <input type="text"  v-model="dname" class="p-inputtext p-component" id="dname" :class="dname ? 'p-filled': ''"
            >
                <label for="dname">Decrypt Data</label>
            </div>
        </div>
        <div class="btn-wrapper">
            <button class="btn btn-submit" @click.prevent="decryptData">
            <i class="isax isax-bold-shield-slash"></i>
            Decrypt
            </button>
        </div>
        <div class="field mt-4">
            <h3>Result</h3>
            <json-viewer :value="decryptResult" boxed :expanded="true"></json-viewer>
        </div>
    </div>
  </div>
</template>
<script>
import MQL from '@/plugins/mql.js'
import jsonViewer from 'vue-json-viewer'
export default {
  data() {
    return {
      name: '',
      decryptResult: '',
      dname: ''
    }
  },
  components: {
    jsonViewer
  },
  methods: {
    decryptData() {
      new MQL()
        .setActivity('o.[DecryptData]')
        .setData({ name: this.dname })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('DecryptData', true)
          if (rs.isValid('DecryptData')) {
            this.decryptResult = res.result
            this.dname = ''
          } else {
            rs.showErrorToast('DecryptData')
          }
        })
    }
  }
}
</script>
