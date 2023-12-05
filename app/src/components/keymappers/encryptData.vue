<template>
  <div class="container-fluid">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Encrypt Data
    </h2>
    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="box-login">
          <div class="p-card p-component">
            <div class="field">
              <div class="p-float-label">
                <input type="text" class="p-inputtext p-component" id="ename"  v-model="ename" :class="ename ? 'p-filled': ''"
                >
                <label for="ename">Data to Encrypt</label>
              </div>
            </div>
            <div class="btn-wrapper">
              <button class="btn btn-submit" @click.prevent="encryptData">
                <i class="isax isax-bold-security-safe"></i>
                Encrypt Data
              </button>
            </div>
            <div class="field mt-4">
              <h3>Result</h3>
              <json-viewer :value="encryptResult" boxed :expanded="true"></json-viewer>
            </div>
          </div>
        </div>
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
      ename: '',
      name: '',
      encryptResult: ''
    }
  },
  components: {
    jsonViewer
  },
  methods: {
    encryptData() {
      new MQL()
        .setActivity('o.[EncryptData]')
        .setData({ name: this.ename })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('EncryptData', true)
          if (rs.isValid('EncryptData')) {
            this.encryptResult = res.result
            this.ename = ''
          } else {
            rs.showErrorToast('EncryptData')
          }
        })
    }
  }
}
</script>

<style>

</style>
