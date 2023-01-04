<script setup>
import { ref } from "vue";
import HeaderNavbar from './views/HeaderNavbar.vue'

const role = ref(localStorage.getItem('role'))
if (localStorage.getItem('role') === null) {
  localStorage.setItem('role', 'guest')
} else {
  localStorage.setItem('role', role.value)
}
</script>

<template>
  <HeaderNavbar />
  <div>
    <router-view></router-view>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
