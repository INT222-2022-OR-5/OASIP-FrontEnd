<script setup>
import { ref, onBeforeMount } from 'vue'
import CategoryEdit from '../components/buttons/category/CategoryEdit.vue'
import CategoryNavbar from "./buttons/category/CategoryNavbar.vue";

const newAccess = ref()
let token = localStorage.getItem("token")
const role = localStorage.getItem("role")
const refreshToken = localStorage.getItem("refreshToken");

const RefreshToken = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/refresh-token`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  }
  );
  if (res.status === 200) {
    newAccess.value = await res.json()
    refresh()
    getEventCategory()
  } else if (res.status === 401) {
    localStorage.clear()
    window.location.href = "/or5"
    console.log("Please sign out your account");
  }
};

const refresh = () => {
  token = localStorage.setItem('token', `${newAccess.value.access_token}`)
}

const categories = ref([])
const getEventCategory = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/eventCategory`, {
    method: "GET",
    // headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    // },
  });
  if (res.status === 200) {
    categories.value = await res.json()
  } else if (res.status === 401 && token !== null) {
    RefreshToken()
  }
}
onBeforeMount(async () => {
  await getEventCategory()
})

const showIndex = ref(null);

const editClinicPop = ref(false)
const errorClinicName = ref(false)
const errorDuration = ref(false)
const notUnique = ref(false)
const wrongDuration = ref(false)
const editedPop = ref(false)
const modifyClinic = async (clinic) => {
  if (clinic.eventCategoryName == null || clinic.eventCategoryName == '') {
    errorClinicName.value = true
  } else {
    errorClinicName.value = false
  }
  if (categories.value.find((c) => clinic.eventCategoryName === c.eventCategoryName) && clinic.eventCategoryName !== editingClinic.value.eventCategoryName) {
    notUnique.value = true
  } else {
    notUnique.value = false
  }
  if (clinic.eventDuration == null || clinic.eventDuration == '' || clinic.eventDuration == 0) {
    errorDuration.value = true
  } else {
    errorDuration.value = false
  }

  if (clinic.eventDuration < 0 || clinic.eventDuration > 480) {
    wrongDuration.value = true
  } else {
    wrongDuration.value = false
  }

  if (errorClinicName.value == true || errorDuration.value == true || wrongDuration.value == true || notUnique.value == true) {
    return
  }

  const res = await fetch(`${import.meta.env.BASE_URL}api/eventCategory/${clinic.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      eventCategoryName: clinic.eventCategoryName,
      eventCategoryDescription: clinic.eventCategoryDescription,
      eventDuration: clinic.eventDuration
    })
  })
  if (res.status === 200) {
    const modifyClinic = await res.json()
    categories.value = categories.value.map((clinic) =>
      clinic.id === modifyClinic.id ? {
        ...clinic,
        eventCategoryName: modifyClinic.eventCategoryName.trim(),
        eventCategoryDescription: modifyClinic.eventCategoryDescription.trim(),
        eventDuration: modifyClinic.eventDuration
      } : clinic)
    editedPop.value = true
    notUnique.value = false
    editingClinic.value = {}
    console.log('edited successfully')
    window.location.href = "/or5/category"
    alert('Edited Successfully')
  } else if (res.status === 401 && token !== null) {
    RefreshToken()
  }
}

const editingClinic = ref({})
const toEditingMode = (editClinic) => {
  editingClinic.value = editClinic
  console.log(editingClinic.value)
}

const cancelPop = () => {
  editClinicPop.value = false
  errorClinicName.value = false
  errorDuration.value = false
  wrongDuration.value = false
  notUnique.value = false
}

</script>
 
<template>
  <div id="contents-list" class="px-10 py-5 flex justify-center">
    <table class="table-zebra table-layout table-element">
      <thead class="table-header bg-base-200">
        <tr>
          <CategoryNavbar />
          <th v-if="role === 'lecturer' || role === 'admin'"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categories" :key="index" :value="category">
          <td class="p-10 text-xl">
            <div class="box-element break-words">
              {{ category.eventCategoryName }}
            </div>
          </td>
          <td class="p-10 text-xl">
            <div v-if="
              category.eventCategoryDescription != null &&
              category.eventCategoryDescription.trim() != ''
            " class="pt-2">
              {{ category.eventCategoryDescription }}
            </div>
            <div v-else-if="typeof category.eventCategoryDescription" class="auto-fill text-xl font-medium">
              No message
            </div>
          </td>
          <td class="p-10 text-xl">{{ category.eventDuration }} minute</td>

          <td v-if="role === 'lecturer' || role === 'admin'">
            <button class="m-2 w-10 p-3 edit">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2" v-on:click="showIndex = index, editClinicPop = true"
                @click="toEditingMode(category)">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="body">
    <div class="modal-show flex justify-center" v-if="editClinicPop == true">
      <div class="modal-content bg-base-100 rounded-2xl">
        <div class="flex justify-center">
          <div v-for="(category, index) in categories" :key="index" :value="category">
            <div v-if="showIndex === index">
              <div class="text-base font-medium grid justify-center py-">
                <div class="grid justify-center font-bold text-4xl mb-4 font-header p-8">
                  Edit Clinic
                </div>
              </div>
              <div>
                <div style="text-align: center;">
                  <CategoryEdit :currentClinic="editingClinic" :errorClinicName="errorClinicName"
                    :errorDuration="errorDuration" :wrongDuration="wrongDuration" :notUnique="notUnique"
                    @updateClinic="modifyClinic" />
                  <button type="button"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xl"
                    style="font-size: 0.95vw;margin-top: 0.2vw;margin-bottom: 1.2vw;" @click="cancelPop">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<style>
table {
  text-align: left;
  position: relative;
  border-collapse: collapse;
  border-radius: 6px;
}

input,
textarea {
  color: rgb(0 0 0);
}

.table-header {
  position: sticky;
  top: 0;
  height: 100px;
}

.table-layout {
  table-layout: fixed;
  width: 90%;
}

.box-element {
  width: 250px;
}

.table-element {
  height: 100px;
}

.auto-fill {
  color: #8f8f8f;
}

.font-header {
  color: #2E86C1;
}

.modal-content {
  margin: auto;
  padding: 20px;
  width: 550px;
}

.modal-show {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(32, 32, 32);
  background-color: rgba(73, 73, 73, 0.4);
}

.edit:hover {
  color: #3498DB;
}

ul {
  list-style-type: none;
}

.clinic-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1vw;
}

.header {
  padding: 10px 15px;
  text-align: center;
}

.clinic-form {
  width: 20.5vw;
  height: 2vw;
  margin-right: auto;
  margin-left: auto;
  font-size: 0.9vw;
}

.close-popclinic {
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  font-size: 45px;
  font-weight: bold;
  margin-top: -2%;
}

.close-popclinic:hover {
  color: #e74694;
}

.edit-icon {
  cursor: pointer;
  float: right;
  height: 1.1vw;
  margin-right: 10px;
  margin-top: 10px;
  transition: all 0.2s ease-in-out;
}

.edit-icon:hover {
  transform: scale(1.5);
}


.body {
  font-family: 'Inter', 'Noto Sans Thai';
}

.clinic-title {
  font-size: 1vw;
  margin-top: 7px;
  text-align: center;
}

.clinic-des {
  font-size: 0.9vw;
  margin-left: 0.5vw;
  margin-right: 0.5vw;
}

.duration-text {
  background-color: #e74694;
  border-radius: 10px;
  font-size: 1vw;
}

.clinic-body {
  background-color: #212529;
  border-radius: 10px;
  height: 11vw;
  margin-bottom: 30px;
  width: 30vw;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  font-family: 'Mitr', 'Noto Sans Thai';
}

.clinic-body h5 {
  color: #e74694;
  font-weight: bold;
}

.clinic-body p {
  color: white;
  text-align: center;
}

.col-clinic {
  transition: all .2s ease-in-out;
}

.col-clinic:hover {
  transform: scale(1.03);
}
</style>