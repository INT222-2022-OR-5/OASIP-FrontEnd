<script setup>
import { ref, onBeforeMount } from 'vue'
import AddEvent from '../components/AddEvent.vue'

// get
const categoryData = ref([])
const getCategory = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/eventCategory`)
  if (res.status === 200) {
    categoryData.value = await res.json()
    console.log(`response.status: ${res.status}`)
    console.log(categoryData.value)
  } else console.log("Error, This page can't get data")
}

onBeforeMount(async () => {
  await getCategory()
})

// post
const createEvent = async (event) => {
  if (event.status == 0) {
    console.log('Incomplete information')
  } else {
    const res = await fetch(`${import.meta.env.BASE_URL}api/events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        bookingName: event.bookingName,
        bookingEmail: event.bookingEmail,
        eventCategory: event.eventCategory,
        eventStartTime: event.eventStartTime,
        eventDuration: event.eventDuration,
        eventNotes: event.eventNotes
      })
    })
    if (res.status === 200) {
      console.log('Complete to post')
    } else console.log('Fail to post')
  }
}

// put
const editEvent = async (edit) => {
  const date = new Date(edit.eventStartTime)
  console.log(edit.eventStartTime)
  const res = await fetch(`${import.meta.env.BASE_URL}api/events/${edit.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      bookingName: edit.bookingName,
      bookingEmail: edit.bookingEmail,
      eventCategory: edit.eventCategory,
      eventStartTime: edit.eventStartTime,
      eventDuration: edit.eventDuration,
      eventNotes: edit.eventNotes
    })
  })
  if (res.status === 200) {
    console.log('Update Success!')
  } else console.log('Update Failure!')
}
</script>

<template>
  <AddEvent :eventCategory="categoryData" @createEvent="createEvent" @edit="editEvent" />
</template>

<style>
</style>
