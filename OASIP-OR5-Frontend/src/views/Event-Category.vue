<script setup>
import { ref, onBeforeMount } from 'vue'
import Category from '../components/Category.vue'

// get
const categoryData = ref([])

const getCategory = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/eventCategory`)
  if (res.status === 200) {
    categoryData.value = await res.json()
    console.log(`response.status: ${res.status}`)
    console.log(categoryData.value)
  } else console.log("Error,This page can't get data")
}

onBeforeMount(async () => {
  await getCategory()
})
</script>

<template>
  <Category :eventCategory="categoryData" />
</template>

<style>
</style>
