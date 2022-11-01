<script setup>//Test
import { computed } from 'vue'
defineEmits(['updateClinic'])
const props = defineProps({
  currentClinic: {
    type: Object,
    default: {}
  },
  errorClinicName: {
    type: Boolean,
    default: false
  },
  notUnique: {
    type: Boolean,
    default: false
  },
  errorDuration: {
    type: Boolean,
    default: false
  },
  wrongDuration: {
    type: Boolean,
    default: false
  }
})

const newClinic = computed(() => {
  return {
    id: props.currentClinic.id,
    eventCategoryName: props.currentClinic.eventCategoryName,
    eventCategoryDescription: props.currentClinic.eventCategoryDescription,
    eventDuration: props.currentClinic.eventDuration
  }
})

</script>
 
<template>
  <div class="grid justify-center py-2">
    <p class="text-lg font-medium">
      <span class="font-bold">Clinic :</span>
      <input class="text-black p-1 m-1 rounded-md" maxlength="100" v-model="newClinic.eventCategoryName"
        :class="{ 'border border-danger': errorClinicName || notUnique }">
    <p class="error-edit-clinic" v-if="errorClinicName === true">Enter Clinic name.</p>
    <p class="error-edit-clinic" v-if="notUnique === true">Clinic Name is already taken.</p>
    </p>
  </div>

  <div class="grid justify-center py-2">
    <p class="text-lg font-medium">
      <span class="font-bold">Duration :</span>
      <input type="number" min="1" max="480" class="text-black p-1 m-1 rounded-md" v-model="newClinic.eventDuration"
        :class="{ 'border border-danger': errorDuration || wrongDuration }">
      <span class="font-bold"> min: 1 | max: 480 </span>
    <p class="error-edit-clinic" v-if="errorDuration === true">Enter Duration.</p>
    <p class="error-edit-clinic" v-if="wrongDuration === true">Duration must between 1 and 480.</p>
    </p>
  </div>

  <div class="grid justify-center py-2">
    <p class="text-lg font-medium">
      <span class="font-bold">Description :</span>
    </p>
    <textarea class="text-black p-2 m-1 rounded-md" rows="3" maxlength="500" style="height: 7.5vw; width: 20.5vw;"
      v-model="newClinic.eventCategoryDescription"></textarea>
  </div>

  <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl"
    style="margin-right: 2vw; margin-top: 0.2vw;margin-bottom: 1.2vw;"
    @click="$emit('updateClinic', newClinic)">Save</button>
</template>
 
<style>
.edit-clinic-label {
  text-align: left;
  font-size: 0.9vw;
  font-weight: bold;
  margin-left: 8%;
}

.edit-clinic-input {
  width: 28vw;
  height: 2vw;
  margin-right: auto;
  margin-left: auto;
  font-size: 0.9vw;
  margin-bottom: 1.2vw;
}

.error-edit-clinic {
  color: red;
  text-align: left;
  font-size: 0.7vw;
  margin-top: -0.8vw;
  margin-left: 9%;
}

.maxClinic {
  width: 8vw;
  text-align: right;
  font-size: 0.7vw;
  color: #888888;
  font-weight: 100;
}

.edit-clinic-line {
  margin-left: 8%;
  margin-bottom: 0.5vw;
}
</style>
