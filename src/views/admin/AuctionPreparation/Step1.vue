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
                    <!-- {{ $v.auctionTypeData.auctionType }} -->
                    <Dropdown v-model="auctionTypeData" variant="filled" :options="aucType" 
                    optionLabel="auctionType"  placeholder="Select Auction Type" class="w-full md:w-14rem" />
                    <span v-if="$v.auctionTypeData.auctionType.$error" class="text-red-500">{{ $v.auctionTypeData.auctionType.$errors[0].$message }}</span>
                </div>
            </div>
            <div class="w-1/2">
                <div class="fm-group">
                    <label for="step2">Auction Method<span class="text-danger">*</span></label>
                    <!-- {{ $v.auctionMethodData.auctionMethodName }} -->
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
import { ref, onMounted, computed } from "vue";
import MQL from '@/plugins/mql.js';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators'
import { useAuctionPreparation } from '@/store/auctionPreparation.js'
import { storeToRefs } from 'pinia'

// access the `store` variable anywhere in the component 
const store = useAuctionPreparation()
const { getLastInsertedAuctionId } = storeToRefs(store)
const auctionMethodData = ref({
    auctionMethodName: '',
    auctionMethodId: 0
});
// const auctionM = ref([]);
// const auctionT = ref([]);
const aucMethod = ref([]);
const statusData = ref([]);
const displayName = ref();
const statusId = ref();
const aucType = ref([]);
const auctionTypeData = ref({
    auctionType: '',
    auctionTypeId: 0
});
const lastInsertedId = ref('');
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
    },
    nextTab: null
})


// Fetch Auction Types from Auction Master
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

// Fetch Auction Methods from Method Master
function FetchAuctionMethods() {
    new MQL()
        .useCoreServer()
        .setActivity('o.[FetchAllAuctionMethods]')
        .setData()
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('FetchAllAuctionMethods', true);
            if (rs.isValid('FetchAllAuctionMethods')) {
                console.log("Auction Method Data", res.result);
                aucMethod.value = res.result;
            } else {
                rs.showErrorToast('ErrorFetchAllAuctionMethods');
            }
        });
}


// Fetch Auction Status from Status Master
function FetchAuctionStatus() {
    new MQL()
        .useCoreServer()
        .setActivity('o.[fetchStatusFromStatusMaster]')
        .setData({ statusCode: 'AUCTION_DRAFTED' })
        .fetch()
        .then((rs) => {
            let res = rs.getActivity('fetchStatusFromStatusMaster', true);
            if (rs.isValid('fetchStatusFromStatusMaster')) {
                console.log("Auction Status Data", res.result);
                statusData.value = res.result;
                statusData.value.forEach(item => {
                    statusId.value = item.statusId;
                    displayName.value = item.displayName;
                });
                console.log("Auction Status Data", statusData.value);
            } else {
                rs.showErrorToast('fetchStatusFromStatusMaster');
            }
        });
}

// Insert Auction Type and Method step 1 details 
const InsertAuctionTypeAndMethod = async() => {
    const result = await $v.value.$validate();
   // $v.value.$validate();
    // getLastInsertedAuctionId.value == null && result
    if(false){

    }else{
        if ( getLastInsertedAuctionId.value == "" && result){
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
                //  to emit the last inserted id to the parent component to be used in the next step
                emit('submit', lastInsertedId.value); 
                emit('nextTab')
            } else {
                rs.showErrorToast('InsertAuctionTypeAndAuctionMethod');
            }
        });}
        else{
            console.log("LastInsertedId is not null: ",getLastInsertedAuctionId.value);
            //alert("error, form not submitted");
			// Automatically generated
			new MQL()
            .useManagementServer()
			.setActivity("o.[UpdateStep1Details]")
			.setData({auctionTypeId: auctionTypeData.value.auctionTypeId, auctionMethodId: auctionMethodData.value.auctionMethodId, statusId: statusId.value, auctionId: getLastInsertedAuctionId.value})
			.fetch()
			 .then(rs => {
			let res = rs.getActivity("UpdateStep1Details",true)
			if (rs.isValid("UpdateStep1Details")) {  
                // lastInsertedId.value = res.result.objectId; 
                // emit('submit');
                emit('nextTab')
            console.log("UpdateStep1Details",res.result);
			} else
			 { 
			rs.showErrorToast("UpdateStep1Details")
			}
			})
			
        }
    }
}

// Fetch All Steps 1 Auction Preview
function FetchAllStepsAuctionPreview() {
    new MQL()
    .useManagementServer()
        .setActivity("o.[FetchAllStepsAuctionPreview]")
        .setData({"auctionId": getLastInsertedAuctionId.value})
        .fetch()
        .then(rs => {
            let res = rs.getActivity("FetchAllStepsAuctionPreview", true)
            if (rs.isValid("FetchAllStepsAuctionPreview")) {
                console.log("FetchAllStepsAuctionPreview", res.result);
                auctionMethodData.value.auctionMethodName= res.result.fetchStep1AuctionPreview.auctionMethodName;
                auctionMethodData.value.auctionMethodId= `${res.result.fetchStep1AuctionPreview.auctionMethodId}`;
                auctionTypeData.value.auctionType = res.result.fetchStep1AuctionPreview.auctionType;
                auctionTypeData.value.auctionTypeId = `${res.result.fetchStep1AuctionPreview.auctionTypeId}`;

            } else {
                rs.showErrorToast("FetchAllStepsAuctionPreview")
            }
        })
}


// Vuelidate Rules  
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

// Vuelidate 
const $v=useVuelidate(rules,{auctionMethodData,auctionTypeData});



//rest of the properties & methods are public
// defineExpose({
//     InsertAuctionTypeAndMethod,
//     FetchAuctionTypes,
//     FetchAuctionMethods,
//     FetchAuctionStatus,
//     FetchAllStepsAuctionPreview,
//     lastInsertedId,
//     auctionMethodData,
//     aucMethod,
//     statusData,
//     displayName,
//     statusId,
//     aucType,
//     auctionTypeData,
// });

// Fetch Auction Types, Methods, Status and All Steps 1 Auction Preview on Mounted
onMounted(() => {
    FetchAuctionTypes();
    FetchAuctionMethods();
    FetchAuctionStatus();
    FetchAllStepsAuctionPreview();


});

</script>

