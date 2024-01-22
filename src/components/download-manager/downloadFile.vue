<template>
  <div id="downloadFileInner">
    <h2 class="text-xl font-bold flex gap-2 items-center justify-center">Download File</h2>
    <div class="grid gap-4 grid-cols-2">
        <div class="box-login mx-auto p-8 w-full rounded-xl bg-white shadow">
            <div class="field">
                <FormKit
                type="text"
                label="Enter Base Url"
                help="Enter Base Url”."
                placeholder="Enter Base Url"
                validation="required"
                v-model="download.cdnBaseUrl"
                />
            </div>
            <div class="field">
                <FormKit
                type="text"
                label="Enter Download File Url"
                help="Enter Download File Url”."
                placeholder="Enter Download File Url"
                validation="required"
                v-model="download.downloadFileUrl"
                />
            </div>
            <div class="field">
                <FormKit
                type="text"
                label="Enter Destination Url"
                help="Enter Destination Url”."
                placeholder="Enter Destination Url"
                validation="required"
                v-model="download.destinationFileUrl"
                />
            </div>
            <div class="btn-wrapper">
                <FormKit
                type="submit"
                label="Download File"
                @click="downloadFile"
                />
            </div>
        </div>
        <div class="box-login mx-auto p-8 w-full rounded-xl bg-white shadow">
            <h4>Testing Parameters</h4>
            <ul class="list">
                <li>
                Base URL
                <div>https://csdev.mkcl.org/</div>
                </li>
                <li>
                Download File URL
                <div>
                    server/sls/ProjectConfigBackup/1Mg6VkbM1MQhhKh8z2qGSa42HIY/02_04_2021/1Mg6VkbM1MQhhKh8z2qGSa42HIY_1617343458.json
                </div>
                </li>
                <li>
                Destination File URL
                <div>02_04_2021/</div>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script setup>
import MQL from "@/plugins/mql.js";
import { reactive, ref } from "vue";
let download = reactive({});
let downloadResult = ref({});

function downloadFile() {
  var a = [];
  a.push(download.downloadFileUrl);
  download.downloadFileUrl = a;
  new MQL()
    .setActivity("o.[DownloadFileUsingDM]")
    .setData(download)
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("DownloadFileUsingDM", true);
      if (rs.isValid("DownloadFileUsingDM")) {
        download = {};
        downloadResult.value = res.result;
        toast.success("File Downloaded Successfully");
      } else {
        rs.showErrorToast("DownloadFileUsingDM");
      }
    });
}
</script>

<style lang="scss" scoped>
h4 {
  margin-bottom: 1rem;
}

.list {
  padding: 0 1rem;

  li {
    font-weight: 600;

    div {
      font-weight: 400;
      word-break: break-word;
    }

    & + li {
      margin-top: 0.75rem;
    }
  }
}
</style>
