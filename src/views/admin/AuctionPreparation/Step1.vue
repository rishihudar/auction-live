<!-- <template>
    <div>
        <div class="w-subtitle">
            Step 1 Details
        </div>
        <div class="fm-row">
            <div class="w-1/4">
                <div class="fm-group">
                    <label for="step1">Auction Type <span class="text-danger">*</span></label>

                    <Dropdown v-model="auctionTypeData" variant="filled" :options="auctionType" optionLabel="auctionType"
                        placeholder="Select Auction Type" class="w-full md:w-14rem" />


                </div>
            </div>

        </div>
        <div class="fm-row">
            <div class="w-1/4">
                <div class="fm-group">
                    <label for="step2">Auction Method <span class="text-danger">*</span></label>

                    <Dropdown v-model="auctionMethodData" variant="filled" :options="auctionMethod"
                        optionLabel="auctionMethod" placeholder="Select Auction Method" class="w-full md:w-14rem" />


                </div>
            </div>

        </div>
        <div class="ml-auto">
            <span class="p-buttonset">
                <Button label="Back" @click="" icon="pi pi-trash" />
            </span>
        </div>
        <div class="ml-auto">
            <span class="p-buttonset">
                <Button label="Next" @click="" icon="pi pi-trash" />
            </span>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import MQL from '@/plugins/mql.js';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { useVuelidate } from '@vuelidate/core';

import { required } from '@vuelidate/validators'

const auctionType = ref([

]);
const auctionTypeData = ref({
    auctionType: '',

    auctionTypeId: '',

});
const auctionMethodData = ref({
    auctionMethod: '',

    auctionMethodId: '',

});
const auctionMethod = ref([]);

function FetchAuctionTypes() {
    new MQL()
        .setActivity('o.[FetchAllAuctionTypes]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllAuctionTypes', true);
            if (rs.isValid('FetchAllAuctionTypes')) {
                console.log(res.result);
                auctionType.value = res.result;

            } else {
                rs.showErrorToast('ErrorFetchAllAuctionTypes');
            }
            // loading.value = false; // Move loading to here
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
                console.log(res.result);
                auctionMethod.value = res.result;

            } else {
                rs.showErrorToast('ErrorFetchAllAuctionMethods');
            }
            // loading.value = false; // Move loading to here
        });
}
const $v=useVuelidate(rules,{auctionType,auctionMethod})

const rules = computed(() => (
    {
        auctionType: {
            required
        },
        auctionMethod: {
            required
        },
    }
));


onMounted(() => {
    FetchAuctionTypes();
    FetchAuctionMethods();
});

</script>  -->
<template>
    <div>
        <div class="w-subtitle">
            Step 1 Details
        </div>
        <div class="fm-row">
            <div class="w-1/4">
                <div class="fm-group">
                    <label for="step1">Auction Type <span class="text-danger">*</span></label>

                    <Dropdown v-model="auctionTypeData" variant="filled" :options="auctionType" optionLabel="auctionType"
                        placeholder="Select Auction Type" class="w-full md:w-14rem" />
                    <span v-if="!$v.auctionType.required" class="text-danger">Please Select Auction Type</span>

                </div>
            </div>

        </div>
        <div class="fm-row">
            <div class="w-1/4">
                <div class="fm-group">
                    <label for="step2">Auction Method <span class="text-danger">*</span></label>

                    <Dropdown v-model="auctionMethodData" variant="filled" :options="auctionMethod"
                        optionLabel="auctionMethodName" placeholder="Select Auction Method" class="w-full md:w-14rem" />
                    <span v-if="!$v.auctionMethod.required" class="text-danger">Please Select Auction Method</span>

                </div>
            </div>

        </div>
       
        <div class="ml-auto">
            <span class="p-buttonset">
                <Button label="Next" @click="validateForm, $router.push({ name: 'step2' })" icon="pi pi-trash" />
            </span>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted ,computed} from "vue";
import MQL from '@/plugins/mql.js';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators'

const auctionType = ref([]);
const auctionTypeData = ref({
});
const auctionMethodData = ref({
});
const auctionMethod = ref([]);


function FetchAuctionTypes() {
    new MQL()
        .setActivity('o.[FetchAllAuctionTypes]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllAuctionTypes', true);
            if (rs.isValid('FetchAllAuctionTypes')) {
                console.log(res.result);
                auctionType.value = res.result;
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
                console.log(res.result);
                auctionMethod.value = res.result;
            } else {
                rs.showErrorToast('ErrorFetchAllAuctionMethods');
            }
        });
}



const rules = computed(() => (
    {
        auctionType: {
            required
        },
        auctionMethod: {
            required
        },
    }
));
const $v=useVuelidate(rules,{auctionType,auctionMethod})
onMounted(() => {
    FetchAuctionTypes();
    FetchAuctionMethods();
});

</script>

