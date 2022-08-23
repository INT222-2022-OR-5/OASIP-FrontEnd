<script setup>
import { ref, onBeforeMount } from 'vue'
import userList from '../components/User.vue'

// get User
const userData = ref([])

const getUser = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/users`)
  if (res.status === 200) {
    userData.value = await res.json()
    console.log(`response.status: ${res.status}`)
    console.log(userData.value)
  } else console.log("Error,This page can't get data")
}

onBeforeMount(async () => {
  await getUser()
})

// delete
const deleteUser = async (id) => {
  if (confirm('Do you want to delet?')) {
    const res = await fetch(`${import.meta.env.BASE_URL}api/users/${id}`, {
      method: 'DELETE'
    })
    if (res.status === 200) {
      userData.value = userData.value.filter((user) => user.id !== id)
    }
  }
}

</script>

<template>
  <userList :userList="userData" @deleteUser="deleteUser"/>
</template>

<style>
</style>
