<script setup>
import { ref, onBeforeMount } from 'vue'
import moment from 'moment';
import EventManage from './EventManage.vue'
import { useRouter } from "vue-router";

const appRouter = useRouter();
const homeRouter = () => appRouter.push({ name: "home" });

const newAccess = ref()
let token = localStorage.getItem("token")
const userRole = localStorage.getItem("role")
const refreshToken = localStorage.getItem("refreshToken");

const RefreshToken = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/refresh-token`, {
    method: 'GET',
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
    method: 'GET',
  })
  if (res.status === 200) {
    categories.value = await res.json()
  } else if (res.status === 401 && token !== null) {
    RefreshToken();
  }
}

const users = ref([]);
const getUser = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (res.status === 200) {
    users.value = await res.json();
    users.value.sort();
  } else if (res.status === 401 && token !== null) {
    RefreshToken();
  }
};

onBeforeMount(async () => {
  await getEventCategory();
  // await getUser()
})

const errorName = ref(false)
const errorClinic = ref(false)
const errorEmail = ref(false)
const errorTime = ref(false)
const mailVali = ref(true)
const mailNotFound = ref(false)
const errorFuture = ref(false)
const overlap = ref(false)

const createEvent = async (event) => {
  if (userRole === 'guest') {
    if (event.bookingName == null || event.bookingName == '') {
      errorName.value = true
    } else {
      errorName.value = false
    }
    if (event.bookingEmail == null || event.bookingEmail == '') {
      errorEmail.value = true
    } else {
      errorEmail.value = false
    }
    var emailValidate = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (event.bookingEmail.match(emailValidate)) {
      mailVali.value = true
    } else {
      mailVali.value = false
      console.log('not validate');
    }
  } else if (userRole === 'admin') {
    if (Object.keys(event.user).length === 0) {
      errorName.value = true
    } else {
      errorName.value = false
    }
  } else if (userRole === 'student') {
    if (event.bookingName == null || event.bookingName == '') {
      errorName.value = true
    } else {
      errorName.value = false
    }
  }

  if (Object.keys(event.eventCategory).length === 0) {
    errorClinic.value = true
  } else {
    errorClinic.value = false
  }

  if (event.eventStartTime === null || event.eventStartTime == '') {
    errorTime.value = true
  } else {
    errorTime.value = false
  }
  if (moment(event.eventStartTime).isAfter(moment(new Date()))) {
    errorFuture.value = false
  } else {
    errorFuture.value = true
  }

  if (errorName.value == true || errorClinic.value == true || errorTime.value == true || errorFuture.value == true || mailVali.value == false) {
    return
  }

  if (userRole === 'admin') {
    const res = await fetch(`${import.meta.env.BASE_URL}api/events`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        eventCategory: {
          id: event.eventCategory.id
        },
        user: {
          email: event.user.email
        },
        bookingName: event.user.name,
        bookingEmail: event.user.email,
        eventStartTime: event.eventStartTime,
        eventDuration: event.eventCategory.eventDuration,
        eventNotes: event.eventNotes.trim()
      })
    })
    if (res.status == 201 || res.status == 200) {
      console.log('Created Successfully');
      alert("Created Successfully")
      window.location.href = "/or5/event";
    } else if (res.status == 400) {
      overlap.value = true
      console.log('Error, Can not add');
    }

  } else if (userRole === 'student') {
    const res = await fetch(`${import.meta.env.BASE_URL}api/events`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        eventCategory: {
          id: event.eventCategory.id
        },
        user: {
          email: event.user.email
        },
        bookingName: event.bookingName.trim(),
        bookingEmail: event.user.email.trim(),
        eventStartTime: event.eventStartTime,
        eventDuration: event.eventCategory.eventDuration,
        eventNotes: event.eventNotes.trim()
      })
    })
    if (res.status == 201 || res.status == 200) {
      console.log('Created Successfully');
      alert("Created Successfully")
      window.location.href = "/or5/event";
    } else if (res.status == 400) {
      overlap.value = true
      console.log('Error, Can not add');
    }
  } else if (userRole === 'guest') {
    const res = await fetch(`${import.meta.env.BASE_URL}api/events/guest`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventCategory: {
          id: event.eventCategory.id
        },
        user: null,
        bookingName: event.bookingName.trim(),
        bookingEmail: event.bookingEmail.trim(),
        eventStartTime: event.eventStartTime,
        eventDuration: event.eventCategory.eventDuration,
        eventNotes: event.eventNotes.trim()
      })
    })
    if (res.status == 201 || res.status == 200) {
      console.log('Created Successfully');
      alert("Created Successfully")
      window.location.href = "/or5/event";
    } else if (res.status == 400) {
      overlap.value = true
      console.log('Error, Can not add');
    } else if (res.status == 500) {
      mailNotFound.value = true
    }
  }
}
</script>
 
<template>
  <div v-if="userRole === 'lecturer'" class="text-center">
    <img class="mx-auto" src='../../../assets/forbidden.png' alt="" width="500" height="600" />
    <button @click.left="homeRouter" class="btn mt-5 text-base px-10">Go To Home Page</button>
  </div>

  <div v-else class="body">
    <EventManage :categories="categories" :users="users" :errorName="errorName" :errorClinic="errorClinic"
      :errorEmail="errorEmail" :errorTime="errorTime" :mailVali="mailVali" :errorFuture="errorFuture" :overlap="overlap"
      :mailNotFound="mailNotFound" @create="createEvent" />
  </div>
</template>
 
<style>

</style>