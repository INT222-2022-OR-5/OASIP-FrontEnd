<script setup>
import { ref } from 'vue'

const props = defineProps({
  eventDetails: {
    type: Object,
    require: true
  }
})

const month = ref(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])

const formatDate = (date) => {
  const checkdate = new Date(date)
  return `${checkdate.getDate()} 
    ${month.value[checkdate.getMonth()]} 
    ${checkdate.getFullYear()},
    ${checkdate.getHours()}:${String(checkdate.getMinutes()).padStart(2, '0')}`
}
</script>

<template>
  <p class="p-8 font-sans font-bold text-4xl text-center">
    Detail of <span class="text-blue-500">Schedule</span>
  </p>

  <div v-if="eventDetails.eventCategory !== null" class="container flex justify-center mx-auto">
    <div
      class="p-8 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 font-sans font-medium">
      <p class="my-4 font-bold">
        Name :<br />
        <input type="text" size="35" :value="eventDetails.bookingName" disabled
          class="text-cyan-600 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
      </p>
      <p class="my-4 font-bold">
        Email :<br />
        <input type="text" size="35" :value="eventDetails.bookingEmail" disabled
          class="text-cyan-600 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
      </p>
      <p class="my-4 font-bold">
        Category :<br />
        <input type="text" size="35" :value="eventDetails.eventCategory.eventCategoryName" disabled
          class="text-cyan-600 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
      </p>
      <p class="my-4 font-bold">
        Duration
        <span class="font-normal text-cyan-600">{{ eventDetails.eventDuration }}</span> minute
      </p>
      <p class="my-4 font-bold">
        Start Date :
        <span class="font-normal text-cyan-600">{{
            formatDate(eventDetails.eventStartTime)
        }}</span>
      </p>
      <p v-if="eventDetails.eventNotes !== null" class="my-4 font-bold">
      <div>
        Note :<br />
        <textarea cols="100" rows="5" maxlength="500" v-model="eventDetails.eventNotes" disabled
          class="text-cyan-600 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
      </div>

      </p>
      <p v-else class="my-4 font-bold">
        Note :<br />
        <textarea cols="100" rows="5" maxlength="500" value="-" disabled
          class="text-cyan-600 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
      </p>
      <router-link :to="{
        name: 'AddEvent', params: {
          name: eventDetails.bookingName
          , email: eventDetails.bookingEmail
          , eventCategory: eventDetails.eventCategory.eventCategoryName
          , time: eventDetails.eventStartTime
          , note: eventDetails.eventNotes
          , id: eventDetails.id
        }
      }">
        <a href="#"
          class="inline-flex items-center py-2 px-3 my-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Edit
        </a>
      </router-link>
      &nbsp;
      <router-link :to="{ name: 'EventList' }">
        <a href="#"
          class="inline-flex items-center py-2 px-3 my-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Back
        </a>
      </router-link>
    </div>
  </div>
</template>

<style>
</style>
