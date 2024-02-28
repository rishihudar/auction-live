<template>
    <div class="p-grid">
        <div class="p-col-4">
            <Card class="p-card p-mb-3" v-for="(name, index) in distinctValues" :key="index">
                <template #title>{{ name }}</template>
                <template #content>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, 
                    culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
                </template>
                <template #footer>
                    <Button class="p-button" raised @click="navigateToDashboard(name)">
                        {{ name }} Dashboard
                    </Button>
                </template>
            </Card>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Button from 'primevue/button';
  import { useRouter } from 'vue-router';
  import MQL from '@/plugins/mql.js';

//   var responseData = ref([{}]);
  var roleData =ref([
    {
        "menuId": 3,
        "menuName": "Auction Approval",
        "roleId": "6",
        "roleName": "ROLE_MAKER"
    },
    {
        "menuId": 3,
        "menuName": "Auction Approval",
        "roleId": "6",
        "roleName": "ROLE_MAKER"
    }
])
//Automatically generated
// function login (){
// new MQL()
//             .setActivity("o.[UserLogin]")
//             .setData({"password":"test123","userName":"kedark@mkcl.org"})
//             .fetch()
//              .then(rs => {
//             let res = rs.getActivity("UserLogin",true)
//             responseData.value = res.result.rolesMenuData
//             //roleData.value = responseData
//             console.log("printingResult: ", res.result)
//             console.log("printing responseData: ", responseData.value)
//             if (rs.isValid("UserLogin")) {
//             } else
//              { 
//             rs.showErrorToast("UserLogin")
//             }
//             })
//         }



var cardName = roleData.value.map(item => item.roleName);
  
  //const cardName = ref(["ROLE_CHECKER", "ROLE_ADMIN", "ROLE_MAKER", "ROLE_BIDDER", "ROLE_SUPERADMIN", "ROLE_ORGANIZATION_ADMIN", "ROLE_APPROVER", "ROLE_PUBLISHER", "ROLE_SCHEDULER", "ROLE_WATCHER"]);
  console.log("printing cardName: ", cardName)

  const distinctValues = getDistinctValues(cardName);
  console.log("printing distinctValues: ", distinctValues)

    // Define the utility function
    function getDistinctValues(array) {
    return Array.from(new Set(array));
    }

    const router = useRouter();

    const navigateToDashboard = (name) => {
        console.log("printing from navigateToDashboard: " , name)
      router.push({ name });
    };

    onMounted(() => {
        // login(); 
        });

  </script>
  