<script setup>
import { onBeforeMount, ref } from "vue";

defineEmits(["option", 'upcoming', 'past']);

const category = ref([]);

// GET
const getCategories = async () => {
  const res = await fetch(import.meta.env.VITE_CATEGORY_URL);
  if (res.status === 200) {
    category.value = await res.json();
  } else console.log("error, cannot get data");
};
onBeforeMount(async () => {
  await getCategories();
});
</script>

<template>
  <th class="text-xl font-extrabold px-10">NAME</th>
  <th class="text-xl font-extrabold px-10">CLINIC</th>
  <th class="text-xl font-extrabold px-10">DATE</th>
  <th class="text-xl font-extrabold px-10">DURATION</th>
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
