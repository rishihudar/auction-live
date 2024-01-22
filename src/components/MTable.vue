<template>
  <div id="mTable">
    <div class="box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
        <h3 class="mb-4">
            {{ msg }}
        </h3>
        <div class="overflow-x-auto">
            <table class="table w-full">
            <thead>
                <tr>
                <th>id</th>
                <th>age</th>
                </tr>
            </thead>
            <tbody v-for="(item, index) in itemList" v-bind:key="index">
                <tr>
                <th>{{ item.id }}</th>
                <td>{{ item.age }}</td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script setup>
import MQL from "@/plugins/mql.js";
import { ref, toRefs, onMounted } from "vue";
const props = defineProps(["msg", "activity", "restriction", "params"]);
let itemList = ref([]);

onMounted(() => {
  getActivityData();
});
// call for activity specific mql
function getActivityData() {
  new MQL()
    .setActivity(props.restriction + ".[" + props.activity + "]")
    // In case params not provided it will go with empty object
    .setData(props.params || {})
    .fetch()
    .then((rs) => {
      let res = rs.getActivity(props.activity, false);
      if (rs.isValid(props.activity)) {
        // Check if the request is of query type
        if (props.activity.startsWith("query_")) {
          // Request is of query type
          itemList.value = res;
        } else {
          // Request is of activity type
          itemList.value = res.result[props.resultKey || []];
        }
      } else {
        // In case there is error from server side
        rs.showErrorToast(props.activity);
      }
    });
}
</script>
