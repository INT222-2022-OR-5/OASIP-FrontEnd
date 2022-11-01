<script setup>
import { ref, onBeforeMount } from 'vue'
import EventList from "./buttons/event/EventList.vue";
import EventDetail from "./buttons/event/EventDetail.vue";
import EventCreate from "./buttons/event/EventCreate.vue";
import EventDelete from "./buttons/event/EventDelete.vue";
import EventNavbar from "./buttons/event/EventNavbar.vue";
import moment from 'moment'

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
    getAllEvent();


  } else if (res.status === 401) {
    localStorage.clear()
    window.location.href = "/or5"
    console.log("Please sign out your account");
  }
};

const refresh = () => {
  token = localStorage.setItem('token', `${newAccess.value.access_token}`)
}

const events = ref([])

//DELETE
const removeEvent = async (removeEventId) => {
  if (confirm("Do you really want to delete")) {
    const res = await fetch(`${import.meta.env.BASE_URL}api/events/${removeEventId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    if (res.status === 200) {
      detail.value = false
      events.value = events.value.filter((event) => event.id !== removeEventId)
      console.log('Deleted Successfully')
    }
    else console.log('Error, Can not delete')
  }

}

// PUT
const overlap = ref(false)
const edited = ref(false)
const errorPast = ref(false)
const editEvent = async (editEvent) => {
  if (moment(editEvent.eventStartTime).isAfter(moment(new Date()))) {
    errorPast.value = false
  } else {
    errorPast.value = true
  }
  if (errorPast.value == true) {
    return
  }
  const res = await fetch(`${import.meta.env.BASE_URL}api/events/${editEvent.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      bookingEmail: editEvent.bookingEmail,
      eventStartTime: editEvent.eventStartTime,
      eventNotes: editEvent.eventNotes.trim(),
      eventDuration: editEvent.eventDuration,
      eventCategory: editEvent.eventCategory
    })
  })
  if (res.status === 200) {
    edited.value = true
    overlap.value = false
    window.location.reload();
    alert("Edit Successfully")
    console.log('Edited Successfully');
  } else {
    edited.value = false
    overlap.value = true
  }
}

// GET
const getAllEvent = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/events`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (res.status === 200) {
    events.value = await res.json();
    events.value.sort(function (a, b) { return new Date(b.eventStartTime) - new Date(a.eventStartTime); });
  } else if (res.status === 401 && token !== null) {
    RefreshToken();
  }
}

onBeforeMount(async () => {
  await getAllEvent();
})

const detail = ref(false)
const showDetail = () => {
  if (detail.value === false) {
    detail.value = true
  } else {
    detail.value = false
  }
}

const closeEdited = () => {
  edited.value = false
}

const cancelEdit = () => {
  if (overlap.value == true || errorPast.value == true) {
    location.reload()
  }
}
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

  <div v-else id="contents-list" class="px-10 pt-5 flex justify-center">
    <table class="table-zebra table-layout table-element">
      <thead class="table-header bg-base-200">
        <tr>
          <EventNavbar />
          <th>
            <button class="btn btn-outline text-xl font-extrabold px-10">
              CREATE
            </button>
          </th>
        </tr>
      </thead>
    </table>
  </div>

  <div v-if="events.length !== 0">
    <EventList :eventList="events" :overlap="overlap" :edited="edited" :errorPast="errorPast" @delete="removeEvent"
      @edit="editEvent" @cancelEdit="cancelEdit" :detail="detail" @showDetail="showDetail" @closeEdited="closeEdited" />
  </div>

  <div v-if="events.length < 1" class="no-event text-5xl pt-20">
    <p v-if="token !== null">No Scheduled Events</p>
  </div>

</template>
 
<style>
.body {
  font-family: 'Radio Canada', 'Noto Sans Thai';
}



.filter-head {
  font-weight: bold;
  margin-top: 0.5vw;
}

.Noschedule {
  font-size: 1.1vw;
  color: #646464;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}


.form-inline {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  height: 1vw;
}

.filter-btn {
  cursor: pointer;
  width: 1.3vw;
  margin-left: 15px;

}

.filter-form {
  width: 25vw;
  font-size: 0.9vw;
}

h5,
h3 {
  text-align: center;
}

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