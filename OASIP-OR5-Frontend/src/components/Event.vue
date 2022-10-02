<script setup>
import EventDetail from "./buttons/event/EventDetail.vue";
import EventCreate from "./buttons/event/EventCreate.vue";
import EventDelete from "./buttons/event/EventDelete.vue";
import EventNavbar from "./buttons/event/EventNavbar.vue";

import { ref, onBeforeMount } from "vue";
import moment from "moment";

const schedules = ref([]);
const newAccess = ref()
let token = localStorage.getItem("token")
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
    getSchedules()
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
const getSchedules = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/events`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (res.status === 200) {
    schedules.value = await res.json();
  } else if (res.status === 401 && token !== null) {
    RefreshToken();
  } else console.log("Error, cannot get data");
};

onBeforeMount(async () => {
  await getSchedules();
});

//DELETE
const removeSchedules = async (id) => {
  if (confirm("Do you really want to delete")) {
    const res = await fetch(`${import.meta.env.BASE_URL}api/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    if (res.status === 200) {
      schedules.value = schedules.value.filter(
        (schedules) => schedules.id !== id
      );
      console.log("Deleted successfullly");
    } else if (res.status === 401 && token !== null) {
      RefreshToken();
    } else console.log("Error, cannot delete");
  }
};

// PUT
const modifySchedules = async (id, newTime, newNotes) => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/events/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      eventStartTime: moment(newTime).utcOffset("+07:00"),
      eventNotes: newNotes == null ? null : newNotes.trim(),
    }),
  });
  if (res.status === 200) {
    const edit = await res.json();
    data.value = edit.eventNotes;
    getSchedules();
    console.log("Edited successfully");
    console.log(id, newTime, newNotes);
  } else if (res.status === 401 && token !== null) {
    RefreshToken();
  } else console.log("Error, cannot edit");
};

// POST
const createNewSchedules = async (Name, Email, selectedId, Time, Duration, Notes) => {
  if (Name.trim() == "") {
  } else {
    const res = await fetch(`${import.meta.env.BASE_URL}api/events`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        bookingName: Name,
        bookingEmail: Email,
        id: selectedId,
        eventStartTime: moment(Time).utcOffset("+07:00"),
        eventDuration: Duration,
        eventNotes: Notes.trim() == "" ? null : Notes.trim(),
      }),
    });
    if (res.status === 201) {
      getSchedules();
    } else if (res.status === 401 && token !== null) {
      RefreshToken();
    } else console.log("Error, cannot be added");
  }
};

const currentDetail = ref({});
const data = ref("");

const moreDetail = (curbookingId) => {
  currentDetail.value = curbookingId;
  data.value = curbookingId.eventNotes;
  currentDetail.value.eventStartTime = moment(
    currentDetail.value.eventStartTime
  ).format("YYYY-MM-DDTHH:mm:ss");
  getSchedules();
};
</script>

<template>

  <div v-if="token == null">
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
  </div>

  <div v-else id="contents-list" class="px-10 py-5 flex justify-center">
    <table class="table-zebra table-layout table-element">
      <thead class="table-header bg-base-200">
        <tr>
          <EventNavbar />
          <th>
            <EventCreate :detail="schedules" @create="createNewSchedules" />
          </th>
        </tr>
      </thead>
      <div v-if="schedules < 1" class="no-event text-5xl pt-20">
        <p>No Scheduled Events</p>
      </div>
      <tbody v-else>
        <tr v-for="contents in schedules" :key="contents.id">
          <td class="p-10 text-xl">
            <div class="box-element break-words">
              {{ contents.bookingName }}
            </div>
          </td>
          <td class="p-10 text-xl">
            <div class="pt-2">
              {{ contents.eventCategory.eventCategoryName }}
            </div>
          </td>
          <td class="p-10 text-xl">
            {{moment(contents.eventStartTime).local().format("D MMMM YYYY, h:mm:ss A")}}
          </td>
          <td class="p-10 text-xl">{{ contents.eventDuration }} minute</td>
          <td>
            <div id="showDetail">
              <EventDetail @moreDetail="moreDetail(contents)" :detail="currentDetail" :data="data" :event="schedules"
                @editDetail="modifySchedules" />

              <EventDelete @delete="removeSchedules(contents.id)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.no-event {
  text-align: center;
  width: 100%;
  position: absolute;
  z-index: -1;
}

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
</style>
