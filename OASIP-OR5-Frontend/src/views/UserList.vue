<script setup>
import User from "../components/User.vue";

const role = localStorage.getItem("role")
</script>

<template>
  <div id="content-section">
    <p v-if="role == 'admin'" class="p-8 font-sans font-bold text-6xl text-center">All Users</p>
    <User />
  </div>
</template>

<style scoped>
</style>