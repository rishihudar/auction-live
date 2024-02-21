<template>
    <div>
        <div class="w-subtitle">
            <h1>Step 1 Details</h1>
        </div>
    </div>

    <br>

    <div class="fm-row">
        <div class="w-1/2">
            <div class="fm-group">
                <label for="step1">Auction Type {{ auctionTypeData }} <span class="text-danger">*</span></label>

                <Dropdown v-model="auctionTypeData" variant="filled" :options="aucType" optionLabel="auctionType"
                    placeholder="Select Auction Type" class="w-full md:w-14rem" />
                <span v-if="!$v.aucType.required" class="text-danger">Please Select Auction Type</span>

            </div>
        </div>
        <div class="w-1/2">
            <div class="fm-group">
                <label for="step2">Auction Method {{ auctionMethodData }} <span class="text-danger">*</span></label>

                <Dropdown v-model="auctionMethodData" variant="filled" :options="aucMethod"
                    optionLabel="auctionMethodName" placeholder="Select Auction Method" class="w-full md:w-14rem" />
                <span v-if="!$v.aucMethod.required" class="text-danger">Please Select Auction Method</span>
            </div>
        </div>
    </div>
    
    <div class="w-1/4">
        <span class="p-buttonset">
            <Button label="Next" @click="validateForm,InsertAuctionTypeAndMethod()" icon="pi pi-trash" />
            {{ lastInsertedId }}
        </span> 
    </div>
</template>

<!-- , $router.push({ name: 'step2' }) -->

<script setup>
import { ref, onMounted ,computed} from "vue";
import MQL from '@/plugins/mql.js';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators'
import { useAuctionPreparation } from '@/store/auctionPreparation.js'
import { storeToRefs } from 'pinia'

// access the `store` variable anywhere in the component ✨
const store = useAuctionPreparation()
const { getLastInsertedAuctionId  } = storeToRefs(store)
const auctionMethodData = ref({
    auctionMethodId: 0,
    auctionMethodName: ''
});
const aucMethod = ref([]);
const aucType = ref([]);
const auctionTypeData = ref({ auctionType: '',
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



function InsertAuctionTypeAndMethod() {
    new MQL()
        .setActivity('o.[InsertAuctionTypeAndAuctionMethod]')
        .setData({auctionTypeId: auctionTypeData.value.auctionTypeId, auctionMethodId: auctionMethodData.value.auctionMethodId})
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
        });
}


const rules = computed(() => (
    {
        aucType: {
            required
        },
        aucMethod: {
            required
        },
    }
));
const $v=useVuelidate(rules,{aucType,aucMethod})
onMounted(() => {
    FetchAuctionTypes();
    FetchAuctionMethods();
});

</script>

