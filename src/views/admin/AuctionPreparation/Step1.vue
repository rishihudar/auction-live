<template>
   <div class="gap-2  mx-auto">
        <div class="fm-row">
            <div class="w-full">
                <div class="fm-group">
                    <div class="w-subtitle">
                        <h1>Step 1 Details</h1>
                    </div>
                </div>
            </div>
        </div>

        <Divider />

        <div class="fm-row">
            <div class="w-1/2">
                <div class="fm-group">
                    <label for="step1">Auction Type<span class="text-danger">*</span></label>
                    <!-- {{ $v.auctionTypeData.auctionType }}
                    {{ auctionTypeData }} -->
                    <Dropdown v-model="auctionTypeData" variant="filled" :options="aucType" 
                    optionLabel="auctionType"  placeholder="Select Auction Type" class="w-full md:w-14rem" />
                    <span v-if="$v.auctionTypeData.auctionType.$error" class="text-red-500">{{ $v.auctionTypeData.auctionType.$errors[0].$message }}</span>
                </div>
            </div>
            <div class="w-1/2">
                <div class="fm-group">
                    <label for="step2">Auction Method<span class="text-danger">*</span></label>
                    <Dropdown v-model="auctionMethodData" variant="filled" :options="aucMethod"
                    optionLabel="auctionMethodName" placeholder="Select Auction Method" class="w-full md:w-14rem" />
                  <span v-if="$v.auctionMethodData.auctionMethodName.$error" class="text-red-500">{{ $v.auctionMethodData.auctionMethodName.$errors[0].$message }}</span>
                </div>
            </div>
        </div>

        <Divider />
        
        <div class="fm-row">
            <div class="w-full">
                <div class="fm-group">
                    <span class="p-buttonset">
                        <Button label="Save" @click="InsertAuctionTypeAndMethod" icon="pi pi-trash" />
                    </span> 
                </div>
            </div>
        </div>
    </div>
</template>

<!-- , $router.push({ name: 'step2' }) -->

<script setup>
import { ref, onMounted ,computed} from "vue";
import MQL from '@/plugins/mql.js';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators'
import { useAuctionPreparation } from '@/store/auctionPreparation.js'
import { storeToRefs } from 'pinia'

// access the `store` variable anywhere in the component ✨
const store = useAuctionPreparation()
const { getLastInsertedAuctionId  } = storeToRefs(store)
const auctionMethodData = ref({
    auctionMethodName: '',
    auctionMethodId: 0
});
const aucMethod = ref([]);
const statusData = ref([]);
const displayName = ref();
const statusId = ref();
const aucType = ref([]);
const auctionTypeData = ref({ 
    auctionType: '',
    auctionTypeId: 0
});
const lastInsertedId = ref(0);

const emit = defineEmits({
  // No validation
  click: null,

  // Validate submit event
  submit: ({ lastInsertedId }) => {
    if (lastInsertedId) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function FetchAuctionTypes() {
    new MQL()
        .useCoreServer()
        .setActivity('o.[FetchAllAuctionTypes]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllAuctionTypes', true);
            if (rs.isValid('FetchAllAuctionTypes')) {
                console.log("Auction Type Data", res.result);
                aucType.value = res.result;
            } else {
                rs.showErrorToast('ErrorFetchAllAuctionTypes');
            }
        });
}

function FetchAuctionMethods() {
    new MQL()
        .useCoreServer()
        .setActivity('o.[FetchAllAuctionMethods]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllAuctionMethods', true);
            if (rs.isValid('FetchAllAuctionMethods')) {
                console.log("Auction Method Data",res.result);
                aucMethod.value = res.result;
            } else {
                rs.showErrorToast('ErrorFetchAllAuctionMethods');
            }
        });
}



function FetchAuctionStatus() {
    new MQL()
        .useCoreServer()
        .setActivity('o.[fetchStatusFromStatusMaster]')
        .setData({statusCode: 'AUCTION_DRAFTED'})
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('fetchStatusFromStatusMaster', true);
            if (rs.isValid('fetchStatusFromStatusMaster')) {
                console.log("Auction Status Data",res.result);
                statusData.value = res.result;
                statusData.value.forEach(item => {
                    statusId.value = item.statusId;
                    displayName.value = item.displayName;
                });
                console.log("Auction Status Data",statusData.value);
            } else {
                rs.showErrorToast('fetchStatusFromStatusMaster');
            }
        });
}


const InsertAuctionTypeAndMethod = async() => {
    const result = await $v.value.$validate();
   // $v.value.$validate();
    // getLastInsertedAuctionId.value == null && result
    if ( result){
        alert("success, form submitted");
    new MQL()
        .useManagementServer()
        .setActivity('o.[InsertAuctionTypeAndAuctionMethod]')
        .setData({auctionTypeId: auctionTypeData.value.auctionTypeId, auctionMethodId: auctionMethodData.value.auctionMethodId, statusId: statusId.value})
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('InsertAuctionTypeAndAuctionMethod', true);
            if (rs.isValid('InsertAuctionTypeAndAuctionMethod')) {
                console.log("LastInsertedId from response",res.result);
                lastInsertedId.value = res.result.objectId;
                console.log("LastInsertedId from lastInsertedId variable",lastInsertedId.value);
                store.setLastInsertedAuctionId(lastInsertedId.value);
                console.log("LastInsertedId FROM GETTERS",getLastInsertedAuctionId.value);
                // how to emit the last inserted id to the parent component to be used in the next step
                emit('submit', lastInsertedId.value); 
            } else {
                rs.showErrorToast('InsertAuctionTypeAndAuctionMethod');
            }
        });}
        else{
            console.log("LastInsertedId is not null: ",getLastInsertedAuctionId.value);
            alert("error, form not submitted");
        }
}


const rules = computed(() => ({
        auctionTypeData: {
        auctionTypeId: { required: helpers.withMessage('Please Select Auction Type ID', required) },
        auctionType: { required: helpers.withMessage('Please Select Auction Type', required) }
        },
        auctionMethodData: {
        auctionMethodId: { required: helpers.withMessage('Please Select Auction Method ID', required) },
        auctionMethodName: { required: helpers.withMessage('Please Select Auction Method', required) }
        },

    }));


const $v=useVuelidate(rules,{auctionMethodData,auctionTypeData});

onMounted(() => {
    FetchAuctionTypes();
    FetchAuctionMethods();
    FetchAuctionStatus();
});

</script>

