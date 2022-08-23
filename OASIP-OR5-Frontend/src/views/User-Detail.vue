<script setup>
import UserDetail from '../components/UserDetail.vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, onBeforeMount } from 'vue'

const myRouter = useRouter()
const { params } = useRoute()

// get
const userDetail = ref([])
const getUser = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/users/${params.id}`)
  if (res.status === 200) {
    userDetail.value = await res.json()
    console.log(`response.status: ${res.status}`)
    console.log(userDetail.value)
  } else console.log("Error,This page can't get data")
}
onBeforeMount(async () => {
  await getUser()
})
</script>

<template>
  <UserDetail :userDetail="userDetail" />
</template>

<style>
</style>
