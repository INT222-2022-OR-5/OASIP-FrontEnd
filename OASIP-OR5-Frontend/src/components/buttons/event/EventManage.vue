<script setup>
import { ref } from 'vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

defineEmits(['create'])
defineProps({
    categories: {
        type: Array,
        require: true
    },
    users: {
        type: Array,
        require: true
    },
    errorName: {
        type: Boolean,
        default: false
    },
    errorClinic: {
        type: Boolean,
        default: false
    },
    errorEmail: {
        type: Boolean,
        default: false
    },
    errorTime: {
        type: Boolean,
        default: false
    },
    errorFuture: {
        type: Boolean,
        default: false
    },
    mailVali: {
        type: Boolean,
        default: false
    },
    mailNotFound: {
        type: Boolean,
        default: false
    },
    overlap: {
        type: Boolean,
        default: false
    }
})

const userRole = localStorage.getItem("role")
const userEmail = localStorage.getItem("email")

const newEvent = ref({
    user: { email: "" },
    bookingName: "",
    bookingEmail: "",
    eventCategory: {},
    eventNotes: "",
    eventDuration: "",
    eventStartTime: ""
})

const adminEvent = ref({
    user: { email: "" },
    eventCategory: {},
    eventNotes: "",
    eventDuration: "",
    eventStartTime: ""
})

const studentEvent = ref({
    user: { email: userEmail },
    bookingName: "",
    eventCategory: {},
    eventNotes: "",
    eventDuration: "",
    eventStartTime: ""
})

const guestEvent = ref({
    user: null,
    bookingName: "",
    bookingEmail: "",
    eventCategory: {},
    eventNotes: "",
    eventDuration: "",
    eventStartTime: ""
})

const check = () => {
    if (userRole == 'admin') {
        newEvent.value = adminEvent.value
    } else if (userRole == 'student') {
        newEvent.value = studentEvent.value;
    } else if (userRole == 'guest') {
        newEvent.value = guestEvent.value;
    }
}

check()

</script>
<template>
    <div class="body">
        <div class="flex justify-center">
            <div class="modal-content-box bg-base-200 rounded-2xl">

                <div class="flex justify-end">
                    <router-link :to="{ name: 'eventList' }">
                        <button class="btn btn-square btn-outline">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </router-link>
                </div>

                <p class="pt-4 pb-8 font-sans font-bold text-4xl text-center">Create Schedule</p>

                <div class="p-4">
                    <p>Clinic :</p>
                    <select class="select form-element bg-base-100 border-b-2 itali" style="width: 100%;"
                        :class="{ 'border border-danger': errorClinic }" v-model="newEvent.eventCategory">
                        <option disabled selected>Select Clinic Below</option>
                        <option v-for="(category, index) in categories" :key="index" :value="category">
                            {{ category.eventCategoryName }}
                        </option>
                    </select>
                    <div v-if="errorClinic" class="error">Please select a clinic</div>
                </div>

                <div class="p-4">
                    <p>Name :</p>
                    <select v-if="userRole === 'admin'" class="select form-element bg-base-100 border-b-2 itali"
                        style="width: 100%;" :class="{ 'border border-danger': errorName }" v-model="newEvent.user">
                        <option disabled selected>Select User Below</option>
                        <option v-for="(user, index) in users" :key="index" :value="user">{{
                                user.name
                        }}</option>
                    </select>
                    <input v-else class="form-element bg-base-100 border-b-2 italic" id="name" maxlength="100"
                        style="width: 100%;" v-model="newEvent.bookingName"
                        :class="{ 'border border-danger': errorName }">
                    <div v-if="errorName" class="error"> Please enter name</div>
                </div>

                <div class="p-4">
                    <p>Email :</p>
                    <input v-if="userRole === 'guest'" class="form-element bg-base-100 border-b-2 italic" id="email"
                        maxlength="50" style="width: 100%;" v-model="newEvent.bookingEmail"
                        :class="{ 'border border-danger': errorEmail || !mailVali }">
                    <input v-else class="form-element bg-base-100 border-b-2 italic" id="email" maxlength="50"
                        :value="newEvent.user.email" style="width: 100%;" disabled readonly
                        :class="{ 'border border-danger': errorEmail || !mailVali }">
                    <div v-if="errorEmail" class="error">Please enter Email</div>
                    <div v-if="!mailVali && !errorEmail" class="error">Invalid Email</div>
                    <div v-if="mailNotFound" class="error">Not found email account</div>
                </div>

                <div class="grid justify-center pt-4">
                    <p>Date - Time :</p>
                </div>

                <Datepicker locale="th" :minDate="new Date()" v-model="newEvent.eventStartTime"
                    :class="{ 'border border-danger': errorTime || errorFuture || overlap }" class="datepicker pb-4"
                    style="font-size: 0.95vw; width: 50%">
                </Datepicker>
                <div v-if="errorTime" class="error">Please choose start time.</div>
                <div v-if="errorFuture && !errorTime" class="error">Can not choose past time.</div>
                <div v-if="overlap" class="error">Time is overlapping !</div>


                <div class="p-4">
                    <p>Duration (minutes) :</p>
                    <input class="form-element bg-base-100 border-b-2 italic" style="margin-top: 8px;" type="text"
                        disabled readonly :value="newEvent.eventCategory.eventDuration">
                </div>

                <div class="p-4">
                    <p>Note :</p>
                    <textarea class="form-element bg-base-100 border-b-2 italic" rows="3" maxlength="500"
                        v-model="newEvent.eventNotes"></textarea>
                </div>

                <div style="text-align: center;">
                    <button type="button"
                        class="inline-block px-7 py-3 bg-stone-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-stone-400 hover:shadow-lg focus:bg-stone-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                        @click="$emit('create', newEvent)">
                        Booking
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style>
.form-element {
    border-color: #494a7d;
    border-radius: 5px;
    padding: 10px;
    border-width: 2px;
    width: 100%;
}

.form-element:focus {
    outline: none !important;
    border: 2px solid #fcc302;
}

.modal-content {
    margin: auto;
    padding: 20px;
    width: 500px;
}

.modal-show {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(32, 32, 32);
    background-color: rgba(73, 73, 73, 0.4);
}

.close {
    color: #aaaaaa;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: rgb(82, 80, 80);
    text-decoration: none;
    cursor: pointer;
}

.auto-fill {
    color: #8f8f8f;
}

.marginForm {
    margin-bottom: 1vw;
}

.error {
    color: red;
    font-size: 0.75vw;
    margin-left: 25%;
}

.dp__input {
    font-size: 1vw;
    border-color: transparent;
    height: 2vw;
    border: 1px solid #ced4da;
}

.dp__input:hover {
    border-color: #ced4da;
}

.maxBooking {
    width: 37vw;
    text-align: right;
    font-size: 0.7vw;
    color: #888888;
    font-weight: 100;
}

.booking-line {
    margin-left: 25%;
    margin-bottom: 0.5vw;
}

.booking-label {
    font-size: 1vw;
    width: 10vw;
}

.body {
    font-family: 'Inter';
    font-size: 17px;
}

.addEventBtn {
    background-image: linear-gradient(to right, #f857a6 0%, #ff5858 51%, #f857a6 100%);
    transition: 0.5s;
    background-size: 200% auto;
    box-shadow: 0 0 20px #eee;
    border-color: transparent;
    font-size: 1vw;
    color: #fff;
}

.addEventBtn:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
    border-color: transparent;
}

.date-form {
    height: 38px;
    width: 50%;
    margin-top: 10px;
    margin-left: 25%;
    border-radius: 5px;
    border-color: #ced4da;
}

.datepicker {
    width: 50%;
    margin-top: 10px;
    margin-left: 25%;
    border-radius: 5px;
    border-color: #ced4da;
}

.style-form {
    width: 50%;
    margin: auto;
    margin-bottom: 0.1vw;
    height: 2vw;
}

input,
textarea {
    font-family: 'Inter', 'Noto Sans Thai';
}
</style>