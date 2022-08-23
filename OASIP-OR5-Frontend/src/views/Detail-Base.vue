<script setup>
import Detail from '../components/Detail.vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, onBeforeMount } from 'vue'

const myRouter = useRouter()
const { params } = useRoute()

// get
const detailData = ref([])
const getEvents = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/events/${params.id}`)
  if (res.status === 200) {
    detailData.value = await res.json()
    console.log(`response.status: ${res.status}`)
    console.log(detailData.value)
  } else console.log("Error,This page can't get data")
}
onBeforeMount(async () => {
  await getEvents()
})
</script>

<template>
  <Detail :eventDetails="detailData" />
</template>

<style>
</style>
