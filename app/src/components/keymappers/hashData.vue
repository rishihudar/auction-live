<template>
  <div class="container-fluid">
    <h2 class="title alt">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Hash Data
    </h2>
    <div class="row justify-content-center">
      <div class="col-auto">
        <div class="box-login">
          <div class="p-card p-component">
            <div class="field">
              <div class="p-float-label">
                <input type="text" class="p-inputtext p-component" v-model="name" id="hashName" :class="name ? 'p-filled': ''">
                <label for="hashName">Enter data to hash</label>
              </div>
            </div>
            <div class="btn-wrapper">
              <button class="btn btn-submit" @click.prevent="hashData">
                <i class="isax isax-bold-shield-tick"></i>
                Hash
              </button>
            </div>
            <div class="field mt-4">
              <h3>Result</h3>
              <json-viewer :value="hashResult" boxed :expanded="true"></json-viewer>
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
      hashResult: '',
      name: ''
    }
  },
  components: {
    jsonViewer
  },
  methods: {
    hashData() {
      new MQL()
        .setActivity('o.[GenerateHash]')
        .setData({ name: this.name })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('GenerateHash', true)
          if (rs.isValid('GenerateHash')) {
            this.hashResult = res.result
            this.name = ''
          } else {
            rs.showErrorToast('GenerateHash')
          }
        })
    }
  }
}
</script>

<style>

</style>