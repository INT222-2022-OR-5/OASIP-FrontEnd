<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router'

defineEmits(['createEvent', 'edit'])
const props = defineProps({
  eventCategory: {
    type: Array,
    default: []
  }
})

const data = ref([])
const getDate = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/events`)
  if (res.status === 200) {
    data.value = await res.json()
  }
}
onBeforeMount(async () => {
  await getDate()
})

const myRouter = useRouter()
const { params } = useRoute()

const name = ref(params.name)
const email = ref(params.email)
const category = ref(params.eventCategory)
const date = ref(params.time)
const note = ref(params.note)

const allChecked = ref(false)
const emailChecked = ref(false)
const dateChecked = ref(false)
const emailLengthChecked = ref(false)
const namelengthChecked = ref(false)

const popup = ref(false)
const create = ref(true)

const edit = params.name == undefined ? true : false
const view = params.name == undefined ? false : true

const allEventdata = computed(() => {
  if (name.value == undefined || email.value == undefined || date.value == undefined || category.value == undefined || name.value == "" || email.value == "" || date.value == "" || category.value == "" || name.value.length == 0 || email.value.length == 0) {
    allChecked.value = true
    emailChecked.value = false
    emailLengthChecked.value = false
    return { status: 0 }
  } else {
    if (namelength(name.value)) {
      if (emaillength(email.value)) {
        if (checkemail(email.value)) {
          if (isFuture()) {
            console.log(checktime());
            if (eventStartTime.value.includes(checktime()) || checkSchedule(datetime())) {
              allChecked.value = false
              emailChecked.value = false
              emailLengthChecked.value = false
              namelengthChecked.value = false
              return { status: 0 }
            } else {
              create.value = false
              popup.value = true
              return {
                id: params.id,
                bookingName: name.value,
                bookingEmail: email.value,
                eventCategory: {
                  "id": categoryId.value,
                  "eventCategoryName": category.value,
                  "eventCategoryDescription": null,
                  "eventDuration": null
                },
                eventStartTime: datetime(),
                eventDuration: duration.value,
                eventNotes: note.value,
                status: 1,
              }
            }
          } else {
            allChecked.value = false
            emailChecked.value = false
            emailLengthChecked.value = false
            namelengthChecked.value = false
            dateChecked.value = true
            return { status: 0 }
          }
        } else {
          allChecked.value = false
          emailChecked.value = true
          emailLengthChecked.value = false
          namelengthChecked.value = false
          return { status: 0 }
        }
      } else {
        allChecked.value = false
        emailChecked.value = false
        emailLengthChecked.value = true
        namelengthChecked.value = false
      }
    } else {
      allChecked.value = false
      emailChecked.value = false
      emailLengthChecked.value = false
      namelengthChecked.value = true
      return { status: 0 }
    }
  }
})

const datetime = () => {
  const disdate = new Date(date.value)
  return disdate
}

const checktime = () => {
  const disdate = new Date(date.value)
  return `${disdate.getFullYear()}-${String(disdate.getMonth() + 1).padStart(2, '0')}-${disdate.getDate()} ${String(disdate.getHours()).padStart(2, '0')}:${String(disdate.getMinutes()).padStart(2, '0')}:${String(disdate.getSeconds()).padStart(2, '0')}`
}

const isFuture = () => {
  const today = new Date(new Date().getTime());
  const disdate = new Date(date.value)
  return disdate > today
}
console.log(new Date(new Date().getTime()));

const duration = computed(() => {
  const currentCategoryId = ref(0);
  for (let i = 0; i < props.eventCategory.length; i++) {
    if (category.value == props.eventCategory[i].eventCategoryName) {
      currentCategoryId.value = props.eventCategory[i].eventDuration;
    }
  }
  return currentCategoryId.value;
})

const categoryId = computed(() => {
  const currentCategoryId = ref(0);
  for (let i = 0; i < props.eventCategory.length; i++) {
    if (category.value == props.eventCategory[i].eventCategoryName) {
      currentCategoryId.value = props.eventCategory[i].id;
    }
  }
  return currentCategoryId.value;
})

const dataEachCategory = computed(() => {
  const info = ref([])
  info.value = data.value.filter((item) => { return item.eventCategory.eventCategoryName == category.value })
  return info.value
})

const eventStartTime = computed(() => {
  const info = ref([])
  info.value = dataEachCategory.value.map((data) => {
    return data.eventStartTime
  })
  console.log(info.value);
  return info.value
})

const schedule = computed(() => {
  const info = ref([])
  info.value = eventStartTime.value.map((data, index) => {
    return [new Date(data), new Date(new Date(data).getTime() + dataEachCategory.value[index].eventDuration * 60 * 1000)]
  })

  return info.value
})

const checkSchedule = (date) => {
  const result = ref('')
  const arrayOfBoolean = ref([])
  schedule.value.forEach((item) => {
    arrayOfBoolean.value.push(item[0] < date && date < item[1])
  })
  arrayOfBoolean.value.forEach((item) => {
    if (result.value == '') {
      result.value = item
    } else {
      result.value = result.value || item
    }
  })
  return result.value
}

const namelength = (name) => {
  if (name.length > 0 && name.length <= 100) {
    return true
  }
}

const emaillength = (email) => {
  if (email.length > 0 && email.length <= 100) {
    return true
  }
}

const checkemail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// CSS styles blinding
const title1 = "p-8 font-sans font-bold text-4xl text-center"
const input1 = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
const form1 = "my-4 font-bold"
const form2 = "my-4 font-bold text-red-500"
const form3 = "my-4 font-bold text-red-500 opacity-50"
const container1 = "p-8 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 font-sans font-medium"
const button1 = "inline-flex items-center py-2 px-3 my-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
const select1 = "block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
const container2 = "container flex justify-center mx-auto"
const date1 = "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
const button2 = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

</script>

<template>
  <p :class="title1" v-if="view">Edit <span class="text-red-500">Schedule</span></p>
  <p :class="title1" v-else>Add Schedule</p>

  <div v-show="create" :class="container2">
    <div :class="container1">
      <div class="input" v-show="view">
        <p :class="form1">Name :<br />
          <input type="text" size="35" maxlength="100" :value="params.name" disabled :class="input1" />
        </p>
        <p :class="form1">Email :<br />
          <input type="text" size="35" maxlength="100" :value="params.email" disabled :class="input1" />
        </p>
        <p :class="form1">Category :<br />
          <input type="text" size="35" maxlength="100" v-model="category" disabled :class="input1" />
        </p>
      </div>
      <div v-show="edit">
        <p v-show="allChecked" :class="form2">
          Please complete the information!
        </p>
        <!-- <p v-show="emailChecked" :class="form2">
          Please validation of the email!
        </p>
        <p v-show="dateChecked" :class="form2">
          Please validate of the date-time!
        </p> -->
        <div>
          <p :class="form1">Name :<br />
            <input type="text" size="35" maxlength="150" v-model="name" placeholder="Please enter your name"
              :class="input1" />
          </p>
          <p v-show="!name" :class="form3">- Name must between 1 - 100 <br /></p>
          <p v-show="namelengthChecked" :class="form3">- Email must between 1 - 100 <br /></p>
          <p :class="form1">E-mail :<br />
            <input type="email" size="35" maxlength="150" v-model="email" placeholder="Please enter your email"
              :class="input1" />
          </p>
          <p v-show="!email" :class="form3">- Email must between 1 - 100 <br /></p>
          <p v-show="emailLengthChecked" :class="form3">- Email must between 1 - 100 <br /></p>
          <p v-show="emailChecked" :class="form3">- Email address must follow format <br /></p>
        </div>
      </div>
      <div v-show="edit">
        <p :class="form1">Category :<br />
          <select v-model="category" :class="select1">
            <option v-for="(category, index) in eventCategory" :key="index">
              {{ category.eventCategoryName }}
            </option>
          </select>
        </p>
        <p v-show="!category" :class="form3">- Please select your category <br /></p>
      </div>
      <div>
        <p :class="form1">
          Duration <span class="font-normal">{{ duration }}</span> minutes
        </p>
        <p :class="form1">Start Date :
          <input type="datetime-local" v-model="date" :class="date1" />
        </p>
        <p v-show="!date" :class="form3">- Please select your date-time <br /></p>
        <p v-show="dateChecked" :class="form3">- Date-Time must be a future <br /></p>
      </div>
      <div>
        <p :class="form1">Note :
          <textarea cols="100" rows="5" maxlength="500" v-model="note" placeholder="Optional"
            :class="input1"></textarea>
        </p>
        <p v-show="!note" :class="form3">- Note must not exceed 500 (Optional)<br /></p>
      </div>
      <div v-show="edit">
        <a @click="$emit('createEvent', allEventdata)" href="#" :class="button1">
          Add
        </a>
        &nbsp;
        <router-link :to="{ name: 'EventList' }"><a href="#" :class="button1">
            Back
          </a></router-link>
      </div>
      <div v-show="view">
        <a @click="$emit('edit', allEventdata)" href="#" :class="button1">
          Update
        </a>
      </div>
    </div>
  </div>
  <div v-show="popup">
    <div :class="container2">
      <div :class="container1">
        <p class="my-4 font-bold text-3xl text-green-500 text-center">
          Your appointment is complete
        </p>
        <br />
        <div :class="container2">
          <router-link :to="{ name: 'EventList' }">
            <button type="button" :class="button2">
              Close
              <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg></button>
          </router-link>
        </div>
      </div>
    </div>
    <!-- <div :class="container2">
      <div :class="container1">
        <p class="my-4 font-bold text-3xl text-red-500 text-center">
          Your appointment is incomplete
        </p>
        <br />
        <div :class="container2">
          <router-link :to="{ name: 'EventList' }">
            <button type="button" :class="button2">
              Close
              <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg></button>
          </router-link>
        </div>
      </div>
    </div> -->
  </div>

</template>

<style>
</style>
