<template>
  <div class="container-fluid">
    <h2 class="text-xl font-bold flex gap-2 items-center justify-center">
      Hash Data
    </h2>
    <div class="box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
        <div class="field">
            <div class="p-float-label">
                <InputText v-model="name" id="hashName" :class="name ? 'p-filled': ''" />
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
