<script setup>
const props = defineProps({
  eventCategory: {
    type: Array,
    require: true
  }
})
</script>

<template>
  <div>
    <p class="p-8 font-sans font-bold text-4xl text-center">All Categories</p>
    <div class="container flex justify-center mx-auto">
      <div class="flex flex-col">
        <div class="w-full">
          <div class="border-b border-gray-200 shadow">
            <table class="table-fixed divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-2 text-xs text-gray-500">Name</th>
                  <th class="px-6 py-2 text-xs text-gray-500">Description</th>
                  <th class="px-6 py-2 text-xs text-gray-500">Duration</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-300">
                <tr v-for="(category, index) in eventCategory" :key="category.id" class="whitespace-nowrap">
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ category.eventCategoryName }}
                  </td>

                  <td v-if="category.eventCategoryDescription !== null && category.eventCategoryDescription != ''" class="px-6 py-4 text-sm text-gray-500">
                    {{ category.eventCategoryDescription }}
                  </td>
                  <td v-else class="px-6 py-4 text-sm text-gray-500">-</td>

                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ category.eventDuration }} minute
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-if="eventCategory.length == 0"
      class="m-80 font-sans font-bold text-xl text-center text-red-500 text-opacity-25">
      No Informations.
    </div>
  </div>
</template>

<style>
</style>
