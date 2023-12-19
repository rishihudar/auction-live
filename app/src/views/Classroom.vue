<template>
  <div id="classroom">
    <h2 class="text-xl font-bold flex gap-2 items-center">
      <i class="isax isax-bold-arrow-left-2" @click="$router.go(-1)"></i>
      Classroom
    </h2>
    <div class="box-login mx-auto p-8 max-w-2xl rounded-xl bg-white shadow">
        <Accordion :multiple="true">
            <AccordionTab header="Add Classroom">
            <div class="field mt-5">
                <div class="p-float-label">
                <input type="text" class="p-inputtext p-component w-100" :class="classroom.name ? 'p-filled' : ''"
                    v-model="classroom.name" id="name" required>
                <label for="name">Enter classroom name</label>
                </div>
            </div>
            <div class="field mt-5">
                <div class="p-float-label">
                <input type="text" class="p-inputtext p-component w-100"
                    :class="classroom.description ? 'p-filled' : ''" v-model="classroom.description" id="description"
                    required>
                <label for="description">Enter classroom description</label>
                </div>
            </div>
            <div class="field mt-5">
                <div class="p-float-label">
                <input type="date" class="p-inputtext p-component w-100"
                    :class="classroom.startDate ? 'p-filled' : ''" v-model="classroom.startDate" id="startDate"
                    required>
                <label for="startDate">Enter classroom start date</label>
                </div>
            </div>
            <div class="btn-wrapper">
                <button class="btn btn-submit" @click.prevent="saveClassroom">
                <i class="isax isax-bold-tick-circle"></i>
                Save
                </button>
            </div>
            </AccordionTab>
            <AccordionTab header="Fetch classroom within two dates">
            <div class="field mt-5">
                <div class="p-float-label">
                <input type="date" class="p-inputtext p-component w-100" :class="fclassroom.sdate ? 'p-filled' : ''"
                    v-model="fclassroom.sdate" id="sdate" required>
                <label for="sdate">Enter start date</label>
                </div>
            </div>
            <div class="field">
                <div class="p-float-label">
                <input type="date" class="p-inputtext p-component w-100" :class="fclassroom.edate ? 'p-filled' : ''"
                    v-model="fclassroom.edate" id="edate" required>
                <label for="edate">Enter end date</label>
                </div>
            </div>
            <div class="btn-wrapper">
                <button class="btn btn-submit" @click.prevent="fetchClassroom">
                <i class="isax isax-bold-tick-circle"></i>
                Fetch
                </button>
            </div>
            <div class="field mt-5" v-if="classroomResult && classroomResult.length > 0">
                <DataTable :value="classroomResult">
                <Column field="name" header="name"></Column>
                <Column field="description" header="description"></Column>
                <Column field="startDate" header="startDate"></Column>
                </DataTable>
            </div>
            </AccordionTab>
            <AccordionTab header="Add Classroom with ISO Date">
            <div class="field mt-4">
            <div class="p-float-label">
                <input type="text" class="p-inputtext p-component w-100" :class="isoclassroom.name ? 'p-filled': ''" v-model="isoclassroom.name" required id="email">
                <label for="email">Enter classroom name</label>
            </div>
            </div>
            <div class="field">
            <div class="p-float-label">
                <input type="text" class="p-inputtext p-component w-100" :class="isoclassroom.description ? 'p-filled': ''" v-model="isoclassroom.description" required id="description">
                <label for="description">Enter classroom description</label>
            </div>
            </div>
            <div class="field">
            <div class="p-float-label">
                <input type="datetime-local" :class="isoclassroom.startDate ? 'p-inputtext p-component w-100 p-filled': 'p-inputtext p-component w-100'" v-model="isoclassroom.startDate" required id="date">
                <label for="date">Enter classroom Start Date</label>
            </div>
            </div>
            <div class="btn-wrapper">
            <button class="btn btn-submit" @click.prevent="saveClassroomWithISODate">
            <i class="isax isax-bold-tick-circle"></i>
            Save
            </button>
            </div>
            </AccordionTab>
            <AccordionTab header="Fetch classroom within two ISO dates">
            <div class="field mt-4">
                <div class="p-float-label">
                <input type="datetime-local" class="p-inputtext p-component w-100" :class="fisoclassroom.sdate ? 'p-filled':''" v-model="fisoclassroom.sdate" id="sdates">
                <label for="sdates">Enter start date</label>
                </div>
            </div>
            <div class="field">
                <div class="p-float-label">
                <input type="datetime-local" class="p-inputtext p-component w-100" :class="fisoclassroom.edate ? 'p-filled':''" v-model="fisoclassroom.edate" id="edates">
                <label for="edates">Enter end date</label>
                </div>
            </div>
            <div class="btn-wrapper">
                <button @click.prevent="fetchClassroomWithISODate"
                class="btn btn-submit"
                >
                <i class="isax isax-bold-tick-circle"></i>
                Fetch
            </button>
            </div>
            </AccordionTab>
        </Accordion>
        <div class="field mt-5"   v-if="isoClassroomResult && isoClassroomResult.length > 0">
            <h3 class="mb-3">Result</h3>
            <DataTable :value="isoClassroomResult">
            <Column field="name" header="name"></Column>
            <Column field="description" header="description"></Column>
            <Column field="startDate" header="startDate"></Column>
            </DataTable>
        </div>
    </div>
  </div>
</template>


<script setup>
import { reactive, ref } from 'vue';
import MQL from '@/plugins/mql.js'
import { createToaster } from '@meforma/vue-toaster';
const toast = createToaster({
  position: 'top-right',
  duration: 3000,
  singleton: true
})
let classroom = reactive({})
  let fclassroom = reactive({})
  let isoclassroom = reactive({})
  let fisoclassroom = reactive({})
  let classroomResult = ref({})
  let isoClassroomResult = ref({})

    function saveClassroom() {
      classroom.startDate = Math.round(
        new Date(classroom.startDate).getTime() / 1000
      )

      new MQL()
        .setActivity('o.[SaveClassroom]')
        .setData(classroom)
        .fetch()
        .then((rs) => {
          if (rs.isValid('SaveClassroom')) {
            classroom.value = {}
            toast.success('Classroom added successfully')
          } else {
            rs.showErrorToast('SaveClassroom')
          }
        })
    }
    function fetchClassroom() {
      fclassroom.sdate = Math.round(
        new Date(fclassroom.sdate).getTime() / 1000
      )
      fclassroom.edate = Math.round(
        new Date(fclassroom.edate).getTime() / 1000
      )
      new MQL()
        .setActivity('o.[FetchClassroom]')
        .setData(fclassroom)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('FetchClassroom', true)
          if (rs.isValid('FetchClassroom')) {
            fclassroom = {}
            classroomResult.value = res.result
            for (var i = 0; i < classroomResult.length; i++) {
              classroomResult[i].startDate = new Date(
                classroomResult[i].startDate * 1000
              )
            }
          } else {
            rs.showErrorToast('FetchClassroom')
          }
        })
    }
    function saveClassroomWithISODate() {
      isoclassroom.startDate = new Date(
        isoclassroom.startDate
      ).toISOString()
      new MQL()
        .setActivity('o.[SaveClassroomWithISODate]')
        .setData(isoclassroom)
        .fetch()
        .then((rs) => {
          if (rs.isValid('SaveClassroomWithISODate')) {
            isoclassroom.value = {}
            toast.success('Classroom added successfully')
          } else {
            rs.showErrorToast('SaveClassroomWithISODate')
          }
        })
    }
    function fetchClassroomWithISODate() {
      new MQL()
        .setActivity('o.[FetchClassroomWithISODate]')
        .setData(fisoclassroom)
        .fetch()
        .then((rs) => {
          let res = rs.getActivity('FetchClassroomWithISODate', true)
          if (rs.isValid('FetchClassroomWithISODate')) {
            fisoclassroom.value = {}
            isoClassroomResult.value = res.result
          } else {
            rs.showErrorToast('FetchClassroomWithISODate')
          }
        })
    }

</script>
