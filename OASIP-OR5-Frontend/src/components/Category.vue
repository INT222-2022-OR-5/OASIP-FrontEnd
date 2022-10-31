<script setup>
import CategoryEdit from "./buttons/category/CategoryEdit.vue";
import CategoryNavbar from "./buttons/category/CategoryNavbar.vue";

import { ref, onBeforeMount } from "vue";

const categories = ref([]);
const newAccess = ref()
let token = localStorage.getItem("token")
let role = localStorage.getItem("role")
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
    getUsers()
  } else if (res.status === 401) {
    localStorage.clear()
    window.location.href = "/or5"
    console.log("Please sign out your account");
  }
};

const refresh = () => {
  token = localStorage.setItem('token', `${newAccess.value.accessToken}`)
}

// GET
const getCategories = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/eventCategory`, {
    method: "GET",
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    // },
  });
  if (res.status === 200) {
    categories.value = await res.json();
  } else if (res.status === 401 && token !== null) {
    RefreshToken();
  } else console.log("Error, cannot get data");
};

onBeforeMount(async () => {
  await getCategories();
});

// PUT
const modifyCategories = async (id, newName, newDesc, newDuration, isunique) => {
  if (isunique == false) {
    const res = await fetch(`${import.meta.env.BASE_URL}api/eventCategory/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        eventCategoryName: newName,
        eventCategoryDescription: newDesc == null ? null : newDesc.trim(),
        eventDuration: newDuration,
      }),
    });
    if (res.status === 200) {
      getCategories();
      console.log("Edited successfully");
    } else if (res.status === 401 && token !== null) {
      RefreshToken();
    } else console.log("Error, cannot edit");
  }
};

const currentDetail = ref({});
const data = ref({});
const moreDetail = (curbookingId) => {
  currentDetail.value = curbookingId;
  data.value = currentDetail.value;
};
</script>

<template>
  <!-- <div v-if="token == null">
    <div class="w-full md:w-1/3 mx-auto">
      <div class="flex flex-col p-5 rounded-lg shadow bg-white">
        <div class="flex flex-col items-center text-center">
          <div class="inline-block p-4 bg-yellow-50 rounded-full">
            <svg class="w-20 h-20 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
            </svg>
          </div>
          <h2 class="m-2 font-semibold text-gray-800 text-4xl">Please sign in</h2>
        </div>
        <router-link :to="{ name: 'loginUser' }">
          <div class="flex items-center mt-3">
            <button class="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
              Okay
            </button>
          </div>
        </router-link>
      </div>
    </div>
  </div> -->

  <div id="contents-list" class="px-10 py-5 flex justify-center">
    <table class="table-zebra table-layout table-element">
      <thead class="table-header bg-base-200">
        <tr>
          <CategoryNavbar />
          <th v-if="role === 'lecturer' || role === 'admin'"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contents in categories" :key="contents.id">
          <td class="p-10 text-xl">
            <div class="box-element break-words">
              {{ contents.eventCategoryName }}
            </div>
          </td>
          <td class="p-10 text-xl">
            <div v-if="
              contents.eventCategoryDescription != null &&
              contents.eventCategoryDescription.trim() != ''
            " class="pt-2">
              {{ contents.eventCategoryDescription }}
            </div>
            <div v-else-if="typeof contents.eventCategoryDescription" class="auto-fill text-xl font-medium">
              No message
            </div>
          </td>
          <td class="p-10 text-xl">{{ contents.eventDuration }} minute</td>

          <td v-if="role === 'lecturer' || role === 'admin'">
            <div id="showDetail">
              <CategoryEdit @moreDetail="moreDetail(contents)" :detail="currentDetail"
                :name="currentDetail.eventCategoryName" :description="currentDetail.eventCategoryDescription"
                :duration="currentDetail.eventDuration" :category="categories" @editDetail="modifyCategories" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
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
</style>
