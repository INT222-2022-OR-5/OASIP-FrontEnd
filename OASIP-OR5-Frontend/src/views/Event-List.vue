<script setup>
import { ref, onBeforeMount } from 'vue'
import eventList from '../components/Event.vue'

// get
const eventData = ref([])
const getEvent = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/events`)
  if (res.status === 200) {
    eventData.value = await res.json()
    console.log(`response.status: ${res.status}`)
    console.log(eventData.value)
  } else console.log("Error,This page can't get data")
}

onBeforeMount(async () => {
  await getEvent()
})

// delete
const deleteEvent = async (id) => {
  if (confirm('Do you want to delete?')) {
    const res = await fetch(`${import.meta.env.BASE_URL}api/events/${id}`, {
      method: 'DELETE'
    })
    if (res.status === 200) {
      eventData.value = eventData.value.filter((event) => event.id !== id)
    }
  }
}
</script>

<template>
  <eventList :eventList="eventData" @deleteEvent="deleteEvent" />
</template>

<style>
</style>
