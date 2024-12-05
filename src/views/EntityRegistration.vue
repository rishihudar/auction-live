<template>
  <div>
    <div class="page-header">
      <div class="ph-text">
        <h2 class="title">Entity Registration</h2>
      </div>
      <div class="ph-action" v-if="flag == 0">
        <Button @click="changeFlag(1)" class="btn btn-primary btn-add">
          <fa-plus></fa-plus>
          Add New Entity
        </Button>
      </div>
    </div>
    <Toast />
    <template v-if="flag == 0">
      <div class="table-custom">
        <Paginator
          class="pagination-up"
          :rows="perPage"
          :rowsPerPageOptions="[10, 20, 30]"
          :totalRecords="totalRows"
          template="RowsPerPageDropdown"
          @page="handlePageChange"
        >
          <template #start>
            <div class="fm-inner">
              <InputText
                v-model="filters['global'].value"
                placeholder="Keyword Search"
              />
              <fa-magnifying-glass
                class="fm-icon fm-prefix"
              ></fa-magnifying-glass>
            </div>
          </template>
        </Paginator>
        <DataTable
          responsiveLayout="scroll"
          v-model:filters="filters"
          :value="entities"
          paginator
          :rows="10"
          dataKey="id"
          filterDisplay="row"
          :loading="loading"
          :globalFilterFields="[
            'entityId',
            'entityName',
            'entityShortName',
            'entityAddress',
            'entityContactNumber',
          ]"
        >
          <template #empty>No data found.</template>
          <Column field="entityId" header="Id">
            <template #body="{ data }">
              {{ data.entityId }}
            </template>
          </Column>

          <Column field="entityName" header="Entity Name">
            <template #body="{ data }">
              {{ data.entityName }}
            </template>
          </Column>
          <Column field="entityShortName" header="Entity Short Name">
            <template #body="{ data }">
              {{ data.entityShortName }}
            </template>
          </Column>
          <Column field="entityAddress" header="Entity Address">
            <template #body="{ data }">
              {{ data.entityAddress }}
            </template>
          </Column>
          <Column field="districtName" header="Entity District Name">
            <template #body="{ data }">
              {{ data.districtName }}
            </template>
          </Column>
          <Column field=" entityContactNumber" header="Entity Contact Number">
            <template #body="{ data }">
              {{ data.entityContactNumber }}
            </template>
          </Column>
          <Column field="roundRule" header="Round Rule">
            <template #body="{ data }">
              {{ data.roundRule }}
            </template>
          </Column>
          <Column
            field=" eventProcessingFees"
            header="Entity Event Processing Fees"
          >
            <template #body="{ data }">
              {{ data.eventProcessingFees }}
            </template>
          </Column>
          <Column
            field=" emiPaymentPercentage"
            header="Entity EMI Payment Percentage"
          >
            <template #body="{ data }">
              {{ data.emiPaymentPercentage }}
            </template>
          </Column>
          <Column field="isParent" header="Entity Parent">
            <template #body="{ data }">
              {{ data.isParent }}
            </template>
          </Column>
          <Column field="userCode" header="WT-Code For H1 10 Percent Payment">
            <template #body="{ data }">
              {{ data.userCode }}
            </template>
          </Column>
          <Column field="emdPaymentUserCode" header="WT-Code For EMD Payment">
            <template #body="{ data }">
              {{ data.emdPaymentUserCode }}
            </template>
          </Column>

          <Column field="accountLockTime" header="Account Lock Time">
            <template #body="{ data }">
              {{ data.accountLockTime }}
            </template>
          </Column>
          <Column field="passwordAttemptLimit" header="Password Attempt Limit">
            <template #body="{ data }">
              {{ data.passwordAttemptLimit }}
            </template>
          </Column>
          <Column field="paymentPeriod" header="Payment Period">
            <template #body="{ data }">
              {{ data.paymentPeriod }}
            </template>
          </Column>
          <Column field="watcherPasscode" header="Watcher Passcode Required">
            <template #body="{ data }">
              {{ data.watcherPasscode }}
            </template>
          </Column>
          <Column field="refundClientCode" header="Refund Client Code">
            <template #body="{ data }">
              {{ data.refundClientCode }}
            </template>
          </Column>
        <Column field="refundFCName" header="Refund FC Name">
          <template #body="{ data }">
            {{ data.refundFCName }}
          </template>
        </Column>
        <Column field="settlementClientCode" header="Settlement Client Code">
          <template #body="{ data }">
            {{ data.settlementClientCode }}
          </template>
        </Column>
        <Column field="settlementFCName" header="Settlement FC Name">
          <template #body="{ data }">
            {{ data.settlementFCName }}
          </template>
        </Column>
        <Column field="settlementAccountName" header="Settlement Account Name">
          <template #body="{ data }">
            {{ data.settlementAccountName }}
          </template>
        </Column>
        <Column field="vsBankAccountNumber" header="Settlement Account Number">
          <template #body="{ data }">
            {{ data.vsBankAccountNumber }}
          </template>
        </Column>
        <Column field="settlementAccountIFSCCode" header="Settlement Account IFSC Code">
          <template #body="{ data }">
            {{ data.settlementIFSCCode }}
          </template>
        </Column>
          <!-- <Column field="watcherPasscode" header="Watcher Passcode Required">
            <template #body="{ data }">
              {{ data.watcherPasscode }}
            </template>
          </Column> -->
          <Column header="Actions">
            <template #body="{ data }">
              <div class="btn-wrapper-table">
                <Button
                  @click="editEntity(data), changeFlag(2)"
                  severity="secondary"
                  class="btn-sm"
                >
                  <fa-pen-to-square></fa-pen-to-square>
                  Edit
                </Button>
                <!-- <Button label="Delete" @click="deleteEntity(data),reloadPage()" /> -->
                <Button
                  @click="confirmDelete(data)"
                  severity="danger"
                  class="btn-sm"
                >
                  <fa-trash-can></fa-trash-can>
                  Delete
                </Button>
              </div>
            </template>
          </Column>
        </DataTable>
        <Paginator
          class="pagination-down"
          :rows="perPage"
          :rowsPerPageOptions="[5, 10, 20]"
          :totalRecords="totalRows"
          template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          @page="handlePageChange"
        />
      </div>
      <ConfirmDialog></ConfirmDialog>
    </template>
    <template v-else-if="flag == 1">
      <div class="card">
        <div class="card-header">
          <div class="ch-title">Add Entity</div>
        </div>
        <div class="form-grid">
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="organization"
                >Select Organization</label
              >
              <div class="fm-inner">
                <Dropdown
                  v-model="entityData.organizationId"
                  optionValue="organizationId"
                  :options="organization"
                  optionLabel="organizationName"
                  placeholder="Select a Organization"
                />
              </div>
              <div v-if="$v.entityData.organizationId.$error" class="fm-error">
                {{ $v.entityData.organizationId.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <!-- Bind the selected country to entityData.fklENtityTypeId -->
              <label class="fm-label" for="entityName">Entity Type</label>
              <div class="fm-inner">
                <Dropdown
                  v-model="entityData.entityTypeId"
                  optionValue="entityTypeId"
                  :options="entitytype"
                  optionLabel="entityTypeName"
                  placeholder="Select a Entity Type"
                />
              </div>
              <div v-if="$v.entityData.entityTypeId.$error" class="fm-error">
                {{ $v.entityData.entityTypeId.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="entityName">Entity Name</label>
              <div class="fm-inner">
                <!-- <InputText id="entityName" v-model="entityData.entityName" /> -->
                <InputText
                  id="entityName"
                  v-model="entityData.entityName"
                  placeholder="Enter Entity Name"
                />
              </div>
              <div v-if="$v.entityData.entityName.$error" class="fm-error">
                {{ $v.entityData.entityName.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="entityShortName"
                >Entity Short Name</label
              >
              <div class="fm-inner">
                <InputText
                  id="entityShortName"
                  v-model="entityData.entityShortName"
                  placeholder="Enter Entity Short Name"
                  @input="checkEntityShortName"
                />
              </div>
              <!-- <div v-if="$v.entityData.entityShortName.$error" class="fm-error">
                                {{ $v.entityData.entityShortName.$errors[0].$message }}
                            </div> -->
              <div v-if="$v.entityData.entityShortName.$error" class="fm-error">
                {{ $v.entityData.entityShortName.$errors[0]?.$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="countryName"
                >Entity District Name</label
              >
              <div class="fm-inner">
                <!-- Bind the selected country to stateData.fklCountryId -->
                <Dropdown
                  v-model="entityData.districtId"
                  optionValue="districtId"
                  :options="districts"
                  optionLabel="districtName"
                  placeholder="Select a district"
                />
              </div>
              <div v-if="$v.entityData.districtId.$error" class="fm-error">
                {{ $v.entityData.districtId.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="entityAddress">Entity Address</label>
              <div class="fm-inner">
                <InputText
                  id="entityAddress"
                  v-model="entityData.entityAddress"
                  placeholder="Enter Entity Address"
                />
              </div>
              <div v-if="$v.entityData.entityAddress.$error" class="fm-error">
                {{ $v.entityData.entityAddress.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="entityContactNumber"
                >Entity Contact Number</label
              >
              <div class="fm-inner">
                <InputText
                  id="entityContactNumber"
                  v-model="entityData.entityContactNumber"
                  placeholder="xxx-xxx-xxxx"
                  maxlength="10"
                />
                <!-- <small id="username-help">Enter Entity Contact Number E.g 6398302275</small> -->
              </div>
              <div
                v-if="$v.entityData.entityContactNumber.$error"
                class="fm-error"
              >
                {{ $v.entityData.entityContactNumber.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="entityContactNumber"
                >Entity Round Rule</label
              >
              <div class="fm-inner">
                <InputText
                  id="entityContactNumber"
                  v-model="entityData.roundRule"
                  placeholder="Enter Entity Round Rule"
                />
                <!-- <small id="username-help">Enter Entity Round Rule E.g 3</small> -->
              </div>
              <div v-if="$v.entityData.roundRule.$error" class="fm-error">
                {{ $v.entityData.roundRule.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="entityContactNumber"
                >Entity Event Processing Fees</label
              >
              <div class="fm-inner">
                <InputText
                  id="entityContactNumber"
                  v-model="entityData.eventProcessingFees"
                  placeholder="Enter Entity Event Processing Fees"
                />
                <!-- <small id="username-help">Enter Entity Event Processing Fees E.g 1000</small> -->
              </div>
              <div
                v-if="$v.entityData.eventProcessingFees.$error"
                class="fm-error"
              >
                {{ $v.entityData.eventProcessingFees.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="entityContactNumber"
                >Entity EMI Payment Percentage</label
              >
              <div class="fm-inner">
                <InputText
                  id="entityContactNumber"
                  v-model="entityData.emiPaymentPercentage"
                  placeholder="Enter Entity EMI Payment Percentage "
                />
                <!-- <small id="username-help">Enter Entity EMI Payment Percentage E.g 25</small> -->
              </div>
              <div
                v-if="$v.entityData.emiPaymentPercentage.$error"
                class="fm-error"
              >
                {{ $v.entityData.emiPaymentPercentage.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="userCode"
                >WT-Code For H1 10 Percent Payment</label
              >
              <div class="fm-inner">
                <InputText
                  id="userCode"
                  v-model="entityData.userCode"
                  placeholder="Enter WT-Code For H1 10 Percent Payment"
                />
              </div>
              <div v-if="$v.entityData.userCode.$error" class="fm-error">
                {{ $v.entityData.userCode.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="emdPaymentUserCode"
                >WT-Code For EMD Payment</label
              >
              <div class="fm-inner">
                <InputText
                  id="emdPaymentUserCode"
                  v-model="entityData.emdPaymentUserCode"
                  placeholder="Enter WT-Code For EMD Payment "
                />
              </div>
              <div
                v-if="$v.entityData.emdPaymentUserCode.$error"
                class="fm-error"
              >
                {{ $v.entityData.emdPaymentUserCode.$errors[0].$message }}
              </div>
            </div>
          </div>
          <!--Adding extra data here -->

          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="accountLockTime"
                >Account Lock Time</label
              >
              <div class="fm-inner">
                <InputText
                  id="accountLockTime"
                  v-model="entityData.accountLockTime"
                  placeholder="Enter Account Lock Time"
                />
              </div>
              <div v-if="$v.entityData.accountLockTime.$error" class="fm-error">
                {{ $v.entityData.accountLockTime.$errors[0].$message }}
              </div>
            </div>
          </div>

          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="passwordAttemptLimit"
                >Password Attempt Limit</label
              >
              <div class="fm-inner">
                <InputText
                  id="passwordAttemptLimit"
                  v-model="entityData.passwordAttemptLimit"
                  placeholder="Enter Password Attempt Limit"
                />
              </div>
              <div
                v-if="$v.entityData.passwordAttemptLimit.$error"
                class="fm-error"
              >
                {{ $v.entityData.passwordAttemptLimit.$errors[0].$message }}
              </div>
            </div>
          </div>

          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="paymentPeriod">Payment Period</label>
              <div class="fm-inner">
                <InputText
                  id="paymentPeriod"
                  v-model="entityData.paymentPeriod"
                  placeholder="Enter Payment Period"
                />
              </div>
              <div v-if="$v.entityData.paymentPeriod.$error" class="fm-error">
                {{ $v.entityData.paymentPeriod.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="refundClientCode">
                Refund Client Code</label
              >
              <div class="fm-inner">
                <InputText
                  id="refundClientCode"
                  v-model="entityData.refundClientCode"
                  placeholder="Enter Refund Client Code"
                />
                <!-- <small id="username-help">Enter Entity Event Processing Fees E.g 1000</small> -->
              </div>
              <div
                v-if="$v.entityData.refundClientCode.$error"
                class="fm-error"
              >
                {{ $v.entityData.refundClientCode.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="refundFCName"
                >Refund FC Name</label
              >
              <div class="fm-inner">
                <InputText
                  id="refundFCName"
                  v-model="entityData.refundFCName"
                  placeholder="Enter Refund FC Name"
                />
                <!-- <small id="username-help">Enter Entity Event Processing Fees E.g 1000</small> -->
              </div>
              <div
                v-if="$v.entityData.refundFCName.$error"
                class="fm-error"
              >
                {{ $v.entityData.refundFCName.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="settlementClientCode"
                >Settlement Client Code</label
              >
              <div class="fm-inner">
                <InputText
                  id="settlementClientCode"
                  v-model="entityData.settlementClientCode"
                  placeholder="Enter Settlement Client Code"
                />
                <!-- <small id="username-help">Enter Entity Event Processing Fees E.g 1000</small> -->
              </div>
              <div
                v-if="$v.entityData.settlementClientCode.$error"
                class="fm-error"
              >
                {{ $v.entityData.settlementClientCode.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="settlementFCName"
                >Settlement FC Name</label
              >
              <div class="fm-inner">
                <InputText
                  id="settlementFCName"
                  v-model="entityData.settlementFCName"
                  placeholder="Enter Settlement FC Name"
                />
                <!-- <small id="username-help">Enter Entity Event Processing Fees E.g 1000</small> -->
              </div>
              <div
                v-if="$v.entityData.settlementFCName.$error"
                class="fm-error"
              >
                {{ $v.entityData.settlementFCName.$errors[0].$message }}
              </div>
            </div>
          </div>

        <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="settlementAccountName"
                >Settlement Account Name</label
              >
              <div class="fm-inner">
                <InputText
                  id="settlementAccountName"
                  v-model="entityData.settlementAccountName"
                  placeholder="Enter Settlement Account Name"
                />
              </div>
              <div
                v-if="$v.entityData.settlementAccountName.$error"
                class="fm-error"
              >
                {{ $v.entityData.settlementAccountName.$errors[0].$message }}
              </div>
            </div>
          </div>


<div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="vsBankAccountNumber"
                >Settlement Account Number</label
              >
              <div class="fm-inner">
                <InputText
                  id="vsBankAccountNumber"
                  v-model="entityData.vsBankAccountNumber"
                  placeholder="Enter Settlement Account Number"
                />
              </div>
              <div
                v-if="$v.entityData.vsBankAccountNumber.$error"
                class="fm-error"
              >
                {{ $v.entityData.vsBankAccountNumber.$errors[0].$message }}
              </div>
            </div>
          </div>



<div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="settlementIFSCCode"
                >Settlement IFSC Code</label
              >
              <div class="fm-inner">
                <InputText
                  id="settlementIFSCCode"
                  v-model="entityData.settlementIFSCCode"
                  placeholder="Enter Settlement IFSC Code"
                />
              </div>
              <div
                v-if="$v.entityData.settlementIFSCCode.$error"
                class="fm-error"
              >
                {{ $v.entityData.settlementIFSCCode.$errors[0].$message }}
              </div>
            </div>
          </div>


          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="entityParent">Entity Parent</label>
              <div class="fm-check-holder">
                <div class="fm-checkbox">
                  <Checkbox v-model="entityData.isParent" :binary="true" />
                  <label>Is Parent?</label>
                </div>
                <!-- <small id="username-help">Enter Entity Parent E.g Yes or NO </small> -->
              </div>
              <div v-if="$v.entityData.isParent.$error" class="fm-error">
                {{ $v.entityData.isParent.$errors[0].$message }}
              </div>
            </div>
          </div>
          <!-- Adding extra data here-->
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="watcherPassocode"
                >Watcher Passocode Required</label
              >
              <div class="fm-check-holder">
                <div class="fm-checkbox">
                  <Checkbox
                    v-model="entityData.watcherPasscode"
                    :binary="true"
                  />
                  <span v-if="entityData.watcherPasscode == true">{{
                    "Watcher Passcode Required"
                  }}</span>
                  <span v-else>{{ "Watcher Passcode Not Required" }}</span>
                </div>
              </div>
            </div>
          </div>
         
          <div class="fm-action">
            <Button @click="confirmADD(entityData)" label="Submit"></Button>
            <Button
              @click="changeFlag(0)"
              label="Cancel"
              severity="danger"
            ></Button>
          </div>
          <Toast />
          <ConfirmDialog></ConfirmDialog>
        </div>
      </div>
    </template>

    <template v-else-if="flag == 2">
      <div class="card">
        <div class="card-header">
          <div class="ch-title">Edit Entity</div>
        </div>
        <div class="form-grid">
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="organizationName"
                >Select Organization</label
              >
              <div class="fm-inner">
                <Dropdown
                  v-model="entityData.organizationId"
                  optionValue="organizationId"
                  :options="organization"
                  optionLabel="organizationName"
                  placeholder="Select a Organization"
                  @change="fetchEntityTypesByOrganization"
                />
              </div>
              <div v-if="$v.entityData.organizationId.$error" class="fm-error">
                {{ $v.entityData.organizationId.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="entityName"
                >Select Entity Type</label
              >
              <div class="fm-inner">
                <!-- Bind the selected entitytype to entityData.entityTypeId -->
                <Dropdown
                  v-model="entityData.entityTypeId"
                  optionValue="entityTypeId"
                  :options="entitytype"
                  optionLabel="entityTypeName"
                  placeholder="Select a Entity Type"
                />
              </div>
              <div v-if="$v.entityData.entityTypeId.$error" class="fm-error">
                {{ $v.entityData.entityTypeId.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="entityName">Entity Name</label>
              <div class="fm-inner">
                <InputText
                  id="entityName"
                  v-model="entityData.entityName"
                  placeholder="Enter Entity Name"
                />
                <!-- <small id="username-help">Enter Entity Name E.g UttarPradesh</small> -->
              </div>
              <div v-if="$v.entityData.entityName.$error" class="fm-error">
                {{ $v.entityData.entityName.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="entityShortName"
                >Entity Short Name</label
              >
              <div class="fm-inner">
                <InputText
                  id="entityShortName"
                  v-model="entityData.entityShortName"
                  readonly
                />
              </div>
              <!-- <small id="username-help">Enter Entity Short Name E.g MCF</small> -->
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="countryName"
                >Entity District Name</label
              >
              <div class="fm-inner">
                <!-- Bind the selected country to stateData.fklCountryId -->
                <Dropdown
                  v-model="entityData.districtId"
                  optionValue="districtId"
                  :options="districts"
                  optionLabel="districtName"
                  placeholder="Select a district"
                />
              </div>
              <div v-if="$v.entityData.districtId.$error" class="fm-error">
                {{ $v.entityData.districtId.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="entityAddress">Entity Address</label>
              <div class="fm-inner">
                <InputText
                  id="entityAddress"
                  v-model="entityData.entityAddress"
                  placeholder="Enter Entity Address"
                />
                <!-- <small id="username-help">Enter Entity Address E.g MCF</small> -->
              </div>
              <div v-if="$v.entityData.entityAddress.$error" class="fm-error">
                {{ $v.entityData.entityAddress.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="entityContactNumber"
                >Entity Contact Number</label
              >
              <div class="fm-inner">
                <InputText
                  id="entityContactNumber"
                  v-model="entityData.entityContactNumber"
                  placeholder="xxx-xxx-xxxx"
                  maxlength="10"
                />
                <!-- <small id="username-help">Enter Entity Contact Number E.g 6398302275</small> -->
              </div>
              <div
                v-if="$v.entityData.entityContactNumber.$error"
                class="fm-error"
              >
                {{ $v.entityData.entityContactNumber.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="roundRule">Entity Round Rule</label>
              <div class="fm-inner">
                <InputText
                  id="roundRule"
                  v-model="entityData.roundRule"
                  placeholder="Enter Entity Round Rule"
                />
                <!-- <small id="username-help">Enter Entity Round Rule E.g 1</small> -->
              </div>
              <div v-if="$v.entityData.roundRule.$error" class="fm-error">
                {{ $v.entityData.roundRule.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="eventProFees"
                >Entity Event Processing Fees</label
              >
              <div class="fm-inner">
                <InputText
                  id="eventProFees"
                  v-model="entityData.eventProcessingFees"
                  placeholder="Enter Entity Event Processing Fees"
                />
                <!-- <small id="username-help">Enter Entity Event Processing Fees E.g 1000</small> -->
              </div>
              <div
                v-if="$v.entityData.eventProcessingFees.$error"
                class="fm-error"
              >
                {{ $v.entityData.eventProcessingFees.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="emiPayPercent"
                >Entity EMI Payment Percentage</label
              >
              <div class="fm-inner">
                <InputText
                  id="emiPayPercent"
                  v-model="entityData.emiPaymentPercentage"
                  placeholder="Enter Entity EMI Payment Percentage"
                />
              </div>
              <div
                v-if="$v.entityData.emiPaymentPercentage.$error"
                class="fm-error"
              >
                {{ $v.entityData.emiPaymentPercentage.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="userCode"
                >WT-Code For H1 10 Percent Payment</label
              >
              <div class="fm-inner">
                <InputText
                  id="userCode"
                  v-model="entityData.userCode"
                  placeholder="Enter WT-Code For H1 10 Percent Payment"
                />
              </div>
              <div v-if="$v.entityData.userCode.$error" class="fm-error">
                {{ $v.entityData.userCode.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="emdPaymentUserCode"
                >WT-Code For EMD Payment</label
              >
              <div class="fm-inner">
                <InputText
                  id="emdPaymentUserCode"
                  v-model="entityData.emdPaymentUserCode"
                  placeholder="Enter WT-Code For EMD Payment"
                />
                <!-- <small id="username-help">Enter Entity EMI Payment Percentage E.g 25 </small> -->
              </div>
              <div
                v-if="$v.entityData.emdPaymentUserCode.$error"
                class="fm-error"
              >
                {{ $v.entityData.emdPaymentUserCode.$errors[0].$message }}
              </div>
            </div>
          </div>
          <!--Adding extra data here -->

          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="accountLockTime"
                >Account Lock Time</label
              >
              <div class="fm-inner">
                <InputText
                  id="accountLockTime"
                  v-model="entityData.accountLockTime"
                  placeholder="Enter Account Lock Time"
                />
              </div>
              <div v-if="$v.entityData.accountLockTime.$error" class="fm-error">
                {{ $v.entityData.accountLockTime.$errors[0].$message }}
              </div>
            </div>
          </div>

          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="passwordAttemptLimit"
                >Password Attempt Limit</label
              >
              <div class="fm-inner">
                <InputText
                  id="passwordAttemptLimit"
                  v-model="entityData.passwordAttemptLimit"
                  placeholder="Enter Password Attempt Limit"
                />
              </div>
              <div
                v-if="$v.entityData.passwordAttemptLimit.$error"
                class="fm-error"
              >
                {{ $v.entityData.passwordAttemptLimit.$errors[0].$message }}
              </div>
            </div>
          </div>

          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="paymentPeriod">Payment Period</label>
              <div class="fm-inner">
                <InputText
                  id="paymentPeriod"
                  v-model="entityData.paymentPeriod"
                  placeholder="Enter Payment Period"
                />
              </div>
              <div v-if="$v.entityData.paymentPeriod.$error" class="fm-error">
                {{ $v.entityData.paymentPeriod.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="refundClientCode">
                Refund Client Code</label
              >
              <div class="fm-inner">
                <InputText
                  id="refundClientCode"
                  v-model="entityData.refundClientCode"
                  placeholder="Enter Refund Client Code"
                />
              </div>
              <div
                v-if="$v.entityData.refundClientCode.$error"
                class="fm-error"
              >
                {{ $v.entityData.refundClientCode.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="refundFCName"
                >Refund FC Name</label
              >
              <div class="fm-inner">
                <InputText
                  id="refundFCName"
                  v-model="entityData.refundFCName"
                  placeholder="Enter Refund FC Name"
                />
                <!-- <small id="username-help">Enter Entity Event Processing Fees E.g 1000</small> -->
              </div>
              <div
                v-if="$v.entityData.refundFCName.$error"
                class="fm-error"
              >
                {{ $v.entityData.refundFCName.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="settlementClientCode"
                >Settlement Client Code</label
              >
              <div class="fm-inner">
                <InputText
                  id="settlementClientCode"
                  v-model="entityData.settlementClientCode"
                  placeholder="Enter Settlement Client Code"
                />
                <!-- <small id="username-help">Enter Entity Event Processing Fees E.g 1000</small> -->
              </div>
              <div
                v-if="$v.entityData.settlementClientCode.$error"
                class="fm-error"
              >
                {{ $v.entityData.settlementClientCode.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="settlementFCName"
                >Settlement FC Name</label
              >
              <div class="fm-inner">
                <InputText
                  id="settlementFCName"
                  v-model="entityData.settlementFCName"
                  placeholder="Enter Settlement FC Name"
                />
                <!-- <small id="username-help">Enter Entity Event Processing Fees E.g 1000</small> -->
              </div>
              <div
                v-if="$v.entityData.settlementFCName.$error"
                class="fm-error"
              >
                {{ $v.entityData.settlementFCName.$errors[0].$message }}
              </div>
            </div>
          </div>


<div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="settlementAccountName"
                >Settlement Account Name</label
              >
              <div class="fm-inner">
                <InputText
                  id="settlementAccountName"
                  v-model="entityData.settlementAccountName"
                  placeholder="Enter Settlement Account Name"
                />
              </div>
              <div
                v-if="$v.entityData.settlementAccountName.$error"
                class="fm-error"
              >
                {{ $v.entityData.settlementAccountName.$errors[0].$message }}
              </div>
            </div>
          </div>


<div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="vsBankAccountNumber"
                >Settlement Account Number</label
              >
              <div class="fm-inner">
                <InputText
                  id="vsBankAccountNumber"
                  v-model="entityData.vsBankAccountNumber"
                  placeholder="Enter Settlement Account Number"
                />
              </div>
              <div
                v-if="$v.entityData.vsBankAccountNumber.$error"
                class="fm-error"
              >
                {{ $v.entityData.vsBankAccountNumber.$errors[0].$message }}
              </div>
            </div>
          </div>



<div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="settlementIFSCCode"
                >Settlement IFSC Code</label
              >
              <div class="fm-inner">
                <InputText
                  id="settlementIFSCCode"
                  v-model="entityData.settlementIFSCCode"
                  placeholder="Enter Settlement IFSC Code"
                />
              </div>
              <div
                v-if="$v.entityData.settlementIFSCCode.$error"
                class="fm-error"
              >
                {{ $v.entityData.settlementIFSCCode.$errors[0].$message }}
              </div>
            </div>
          </div>





          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="entityParent">Entity Parent</label>
              <div class="fm-check-holder">
                <div class="fm-checkbox">
                  <Checkbox v-model="entityData.isParent" :binary="true" />
                  <label>Is Parent?</label>
                </div>
              </div>
              <div v-if="$v.entityData.isParent.$error" class="fm-error">
                {{ $v.entityData.isParent.$errors[0].$message }}
              </div>
              <!-- <small id="username-help">Enter Entity Parent E.g Yes or NO </small> -->
            </div>
          </div>

          <div class="col-span-4">
            <div class="fm-group required">
              <label class="fm-label" for="watcherPasscode"
                >Watcher Passcode Required</label
              >
              <div class="fm-check-holder">
                <div class="fm-checkbox">
                  <Checkbox
                    v-model="entityData.watcherPasscode"
                    :binary="true"
                  />
                  <span v-if="entityData.watcherPasscode == true">{{
                    "Watcher Passcode Required"
                  }}</span>
                  <span v-else>{{ "Watcher Passcode Not Required" }}</span>
                </div>
              </div>
              <!-- <div v-if="$v.entityData.watcherPasscode.$error" class="fm-error">
                {{ $v.entityData.watcherPasscode.$errors[0].$message }}
              </div> -->
            </div>
          </div>
         
          <div class="fm-action">
            <Button
              @click="confirmEdit(entityData)"
              type="submit"
              >Submit</Button
            >
            <Button
              @click="changeFlag(0)"
              label="Cancel"
              severity="danger"
            ></Button>
          </div>
          <Toast />
          <ConfirmDialog></ConfirmDialog>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, onBeforeMount, watch } from "vue";
import { FilterMatchMode } from "primevue/api";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import MQL from "@/plugins/mql.js";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import ConfirmDialog from "primevue/confirmdialog";
import { or } from "@vuelidate/validators";
import Checkbox from "primevue/checkbox";
import { useVuelidate } from "@vuelidate/core";
import {
  helpers,
  required,
  numeric,
  maxLength,
 minLength,
  alphaNum,
} from "@vuelidate/validators";
import { login } from "../store/modules/login";
import faPenToSquare from "../../assets/icons/pen-to-square.svg";
import faPlus from "../../assets/icons/plus.svg";
import faTrashCan from "../../assets/icons/trash-can.svg";
const loginStore = login();
const confirm = useConfirm();
const toast = useToast();
const entities = ref([]);
const loading = ref(true);
var flag = ref(0);
const districts = ref([]);
//const user=loginStore.loginId

let entityData = ref({
  entityName: "",
  entityShortName: "",
  entityAddress: "",
  entityContactNumber: "",
  entityTypeId: "",
  organizationId: "",
  roundRule: "",
  eventProcessingFees: "",
  emiPaymentPercentage: "",
  isParent: false,
  districtId: "",
  entitytype: "",
  userCode: "",
  emdPaymentUserCode: "",
  accountLockTime: "",
  passwordAttemptLimit: "",
  paymentPeriod: "",
  watcherPasscode: false,
  refundClientCode: "",
  refundFCName: "",
  settlementClientCode: "",
  settlementFCName: "",
  settlementAccountName:"",
  vsBankAccountNumber:"",
  settlementIFSCCode:""
});

const isUniqueEntityShortName = helpers.withAsync(async (value) => {
  if (!value) return true;
  const response = await new MQL()
    .useCoreServer()
    .setActivity("o.[CountEntityShortName]")
    .setData({ entityShortName: value }) // Pass the entityShortName directly
    .fetch();

  const res = response.getActivity("CountEntityShortName", true);

  if (response.isValid("CountEntityShortName")) {
    count.value = res?.result?.EntityId ?? 0; // Use optional chaining and nullish coalescing

    //return count == 0; // Ensure to compare with 0
    // console.log("count", count.value,"entityData", entityData?.value?.entityId ?? 0)
    if (count.value == 0 || count.value == (entityData?.value?.entityId ?? 0)) {
      return true;
    } else {
      return false;
    }
  }
});

async function checkEntityShortName(newValue) {
  const isShortNameAvailable = await CountEntityShortName(newValue);
  //console.log("shortName", isShortNameAvailable)
  if (!isShortNameAvailable) {
    //console.log("!isShortNameAvailable", isShortNameAvailable)
    // Display error message indicating that entity short name already exists
    toast.add({
      severity: "error",
      summary: "Entity Short Name Error",
      detail: "Entity short name already exists.",
      life: 3000,
    });
  }
}
async function CountEntityShortName() {
  try {
    const response = await new MQL()
      .useCoreServer()
      .setActivity("o.[CountEntityShortName]")
      .setData({ entityShortName: entityData.value.entityShortName })
      .fetch();

    const res = response.getActivity("CountEntityShortName", true);

    if (response.isValid("CountEntityShortName")) {
      count.value = res?.result?.EntityId ?? 0;
      //    console.log("Entity short name count:", count.value);
      // console.log("entityData", entityData.value.entityId);
      // console.log("entityData.value",entityData.value)
      //return count.value == 0 ;
      if (
        count.value == 0 ||
        count.value == (entityData?.value?.entityId ?? 0)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      response.showErrorToast("CountEntityShortName");
      return false;
    }
  } catch (error) {
    // console.error("Error counting entity short name:", error);
    return false;
  }
}
// const alphaNumWithHyphen = helpers.withMessage(
//   'Must be alphanumeric and can contain hyphens',
//   value => /^[a-zA-Z0-9-]+$/.test(value)
// )
const wtCodePattern = /^[Ww][Tt]-\d{4}$/;
const rules = computed(() => ({
  entityData: {
    districtId: {
      required: helpers.withMessage("District is required", required),
    },
    isParent: {
      required: helpers.withMessage("Check is required", required),
    },
    emiPaymentPercentage: {
      required: helpers.withMessage(
        "Emi Payment Percentage is required",
        required
      ),
      numeric,
    },
    eventProcessingFees: {
      required: helpers.withMessage(
        "Event processing fees is required",
        required
      ),
      numeric,
    },
    roundRule: {
      required: helpers.withMessage("Round rule is required", required),
      numeric,
    },
    organizationId: {
      required: helpers.withMessage("Organization is required", required),
    },
    entityTypeId: {
      required: helpers.withMessage("Entity type is required", required),
    },
    entityContactNumber: {
      required: helpers.withMessage(
        "Entity contact number is required",
        required
      ),
      numeric,
      maxLength,
    },
    entityAddress: {
      required: helpers.withMessage("Entity address is required", required),
    },
    entityShortName: {
      required: helpers.withMessage("Entity short name is required", required),
      isUniqueEntityShortName: helpers.withMessage(
        "Entity short name already exists",
        isUniqueEntityShortName
      ),
    },
    entityName: {
      required: helpers.withMessage("Entity name is required", required),
    },
    userCode: {
      required: helpers.withMessage("User code is required", required),
      matchesPattern: helpers.withMessage(
        "EMD payment user code must follow the format XZ-XXXX",
        (value) => wtCodePattern.test(value)
      ),
    },
    emdPaymentUserCode: {
      required: helpers.withMessage(
        "EMD payment user code is required",
        required
      ),
      // Adding regex validation for WT-Code pattern
      matchesPattern: helpers.withMessage(
        "EMD payment user code must follow the format XZ-XXXX",
        (value) => wtCodePattern.test(value)
      ),
    },
    accountLockTime: {
      required: helpers.withMessage("Account lock time is required", required),
      numeric,
    },
    passwordAttemptLimit: {
      required: helpers.withMessage(
        "Password attempt limit is required",
        required
      ),
      numeric,
    },
    paymentPeriod: {
      required: helpers.withMessage("Payment period is required", required),
      numeric,
    },
    refundClientCode: {
      required: helpers.withMessage("Refund client code is required", required),
      alphaNum,
    },
    refundFCName: {
      required: helpers.withMessage("Refund FC name is required", required),
      alphaNum,
    },
    settlementClientCode: {
      required: helpers.withMessage("Settlement client code is required", required),
      alphaNum,
    },
    settlementFCName: {
      required: helpers.withMessage("Settlement FC name is required", required),
      alphaNum,
    },


    settlementAccountName: {
      required: helpers.withMessage("Settlement Account Name is required", required),
      
    },
    vsBankAccountNumber: {
      required: helpers.withMessage("Settlement Account Number is required", required),
      numeric,
    minLength: minLength(9),
    maxLength: maxLength(32),
      
    },
    settlementIFSCCode: {
      required: helpers.withMessage("Settlement IFSC Code is required", required),
      maxLength: maxLength(11),
    },
    
  },
}));
const $v = useVuelidate(rules, { entityData });
// console.log("rules", rules)
// console.log("$v", $v)
// console.log("entityData", entityData)
let count = ref([]);
const organization = ref([]);
const organizationId = ref(null);
const entitytype = ref([]);
//let entityId = ref([]);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  entityName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  entityShortName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  entityAddress: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  entitycontactNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

function changeFlag(newValue) {
  flag.value = newValue;
  ref(flag);
  //console.log("getting from change function", flag)
}

function FetchEntities() {
  new MQL()
    .useCoreServer()
    .setActivity("o.[FetchEntityDetails]")
    .setData()
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchEntityDetails", true);
      if (rs.isValid("FetchEntityDetails")) {
        //console.log(res.result);
       // entityId = res.result[0].entityId;
       // console.log("entityId ***", entityId);
        entities.value = res.result.map((entity) => ({
          ...entity,
          isParent: entity.isParent == 1 ? "Yes" : "No",
          watcherPasscode: entity.watcherPasscode == 1 ? "Yes" : "No",
        }));
      } else {
        rs.showErrorToast("FetchEntityDetails");
      }
      loading.value = false; // Move loading to here
    });
}
function FetchOrganizations() {
  new MQL()
    .useCoreServer()
    .setActivity("o.[FetchOrganizationDetails]")
    .setData({})
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchOrganizationDetails", true);
      if (rs.isValid("FetchOrganizationDetails")) {
        //console.log("result@@@@", res.result)
        organization.value = res.result;
        organizationId.value = res.result[0].organizationId;
        // console.log("organizationId", organizationId.value)
        FetchEntityTypeByOrganization(organizationId.value);
      } else {
        rs.showErrorToast("FetchOrganizationDetails");
      }
    });
}
function FetchEntityTypeByOrganization(orgId) {
  // console.log("OrganizationData", organizationId.value)
  new MQL()
    .useCoreServer()
    .setActivity("o.[FetchEntityTypeByOrganizationId]")
    .setData({ organizationId: organizationId.value })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchEntityTypeByOrganizationId", true);
      if (rs.isValid("FetchEntityTypeByOrganizationId")) {
        //console.log(res.result);
        entitytype.value = res.result;
        // console.log("entitytype", entitytype.value)
      } else {
        rs.showErrorToast("FetchEntityTypeByOrganizationId");
      }
      loading.value = false; // Move loading to here
    });
}

function FetchDistrictName() {
  new MQL()
    .useCoreServer()
    .setActivity("o.[FetchAllDistrict]")
    .setData()
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("FetchAllDistrict", true);
      if (rs.isValid("FetchAllDistrict")) {
        //console.log(res.result);
        districts.value = res.result;
      } else {
        rs.showErrorToast("FetchAllDistrict");
      }
      loading.value = false; // Move loading to here
    });
}
const fetchEntityTypesByOrganization = () => {
  FetchEntityTypeByOrganization(organizationId);
};

function insertEntity(entityData) {
  console.log("entityData", entityData);
  console.log("createdBy",loginStore.loginId)
  //here entityData has insert data getting from frontend
  new MQL()
    .useCoreServer()
    .setActivity("o.[InsertEntity]")
    .setData({ ...entityData.value, createdBy: loginStore.loginId ,refundClientCode:entityData.value.refundClientCode,refundFCName:entityData.value.refundFCName,settlementClientCode:entityData.value.settlementClientCode,settlementFCName:entityData.value.settlementFCName})
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("InsertEntity", true);
      if (rs.isValid("InsertEntity")) {
        console.log(res.result);
        //console.log("entityData from Insert", entityData);
        FetchEntities();
      } else {
        rs.showErrorToast("InsertState");
      }
      loading.value = false;
    });
}

const updateEntity = async (entityData) => {
  console.log("entityData", entityData);
  new MQL()
    .useCoreServer()
    .setActivity("o.[UpdateEntityById]")
    .setData({ ...entityData, modifiedBy: loginStore.loginId })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("UpdateEntityById", true);
      if (rs.isValid("UpdateEntityById")) {
        //console.log(res.result);
        FetchEntities();
      } else {
        rs.showErrorToast("UpdateEntityById");
      }
      loading.value = false;
    });
};
function editEntity(entity) {
  //console.log("Before edit: ", entity);

  // Set entityData to the values of the selected state
  entityData.value = {
    ...entity,
    entityTypeId: parseInt(entity.entityTypeId),
    // isParent: data.isParent == 'Yes' ? true : false
  };
  entityData.value = {
    ...entityData.value,
    isParent: entityData.value.isParent == "Yes" ? true : false,
  };
  entityData.value = {
    ...entityData.value,
    watcherPasscode: entityData.value.watcherPasscode == "Yes" ? true : false,
  };

  //console.log("After edit: ", entityData);

  // Update the flag to indicate edit mode
  changeFlag(2);
}

const confirmEdit = async (entityData) => {
  const result = await $v.value.$validate();
  if (result) {
    confirm.require({
      message: "Are you sure you want to edit Entity?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        updateEntity(entityData),
          toast.add({
            severity: "info",
            summary: "Confirmed",
            detail: "Entity Edited Successfully",
            life: 3000,
          }),
          entityRegistrationAudit(),
          changeFlag(0);
      },
      reject: () => {
        toast.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have rejected",
          life: 3000,
        });
      },
    });
  } else {
    //alert("error, form not submitted")
    // toast.add({ severity: 'error', summary: 'Drafted', detail: 'Please fill all fields', life: 3000 });
    //console.log("eror in validation")

    toast.add({
      severity: "error",
      summary: "Validation Error",
      detail: "Please fill all required fields.",
      life: 3000,
    });
    return;
  }
};

function entityRegistrationAudit() {
  console.log("entityId", entityData.value.entityId);
  console.log("Function called *****************");
  new MQL()
    .useCoreServer()
    .setActivity("o.[EntityRegistrationAudit]")
    .setData({ entityId: entityData.value.entityId })
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("EntityRegistrationAudit", true);
      if (rs.isValid("EntityRegistrationAudit")) {
      } else {
        rs.showErrorToast("EntityRegistrationAudit");
      }
    });
}

const confirmADD = async () => {
  const result = await $v.value.$validate();
  if (result) {
    confirm.require({
      message: "Are you sure you want to add Entity?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        insertEntity(entityData),
          toast.add({
            severity: "success",
            summary: "Confirmed",
            detail: "Entity Added Successfully Added",
            life: 3000,
          }),
          changeFlag(0),
          (entityData = {});
      },
      reject: () => {
        toast.add({
          severity: "error",
          summary: "Rejected",
          detail: "Cancelled",
          life: 3000,
        });
      },
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Validation Error",
      detail: "Please fill all required fields.",
      life: 3000,
    });
    return;
  }
};

const confirmDelete = (data) => {
  confirm.require({
    message: "Are you sure you want to delete Entity?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    accept: () => {
      deleteEntity(data),
        toast.add({
          severity: "info",
          summary: "Confirmed",
          detail: "Entity Deleted Successfully",
          life: 3000,
        });
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Rejected",
        detail: "You have rejected",
        life: 3000,
      });
    },
  });
};

function deleteEntity(data) {
  new MQL()
    .useCoreServer()
    .setActivity("o.[DeleteEntityById]")
    .setData(data)
    .fetch()
    .then((rs) => {
      let res = rs.getActivity("DeleteEntityById", true);
      if (rs.isValid("DeleteEntityById")) {
        //console.log(res.result);
        FetchEntities();
      } else {
        rs.showErrorToast("DeleteEntity");
      }
      loading.value = false;
    });
}

onMounted(() => {
  FetchEntities();

  FetchDistrictName();
  FetchOrganizations();
  // FetchEntityTypeByOrganization(organizationId.value);
});
</script>
