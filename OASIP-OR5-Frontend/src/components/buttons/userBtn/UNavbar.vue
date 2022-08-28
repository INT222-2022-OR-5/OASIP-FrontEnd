<script setup>
import { ref, onBeforeMount } from "vue";

defineEmits(["option"]);

const schedules = ref([]);

// GET
const getSchedules = async () => {
  const res = await fetch(import.meta.env.VITE_EVENT_URL);
  if (res.status === 200) {
    schedules.value = await res.json();
  } else console.log("error, cannot get data");
};

onBeforeMount(async () => {
  await getSchedules();
});
</script>

<template>
  <th class="text-xl font-extrabold px-10">USER</th>
  <th class="text-xl font-extrabold px-10">EMAIL</th>
  <th class="text-xl font-extrabold px-10">ROLE</th>
</template>

<style scoped>
.arrow {
  border: solid rgb(255, 255, 255);
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 3px;
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
</style>
