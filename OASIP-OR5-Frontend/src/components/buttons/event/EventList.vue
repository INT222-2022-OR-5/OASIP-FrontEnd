<script setup>
import { ref } from "vue";
import moment from 'moment';
import Datepicker from '@vuepic/vue-datepicker';

defineEmits(['delete', 'edit', 'toEditingMode', 'cancelEdit', 'showDetail', 'closeEdited'])
const props = defineProps({
    eventList: {
        type: Array,
        require: true,
    },
    overlap: {
        type: Boolean,
        defalut: false
    },
    edited: {
        type: Boolean,
        default: false
    },
    errorPast: {
        type: Boolean,
        default: false
    },
    detail: {
        type: Boolean,
        default: false
    }
});
const role = localStorage.getItem('role');

const DetailPopUp = ref(false);
const editingMode = ref(false)
const showIndex = ref(null);

const editTime = ref("")
const editNote = ref("")

const editEvent = (event) => {
    if (editTime.value === null || editTime.value === '') {
        event.eventNotes = editNote.value
    } else {
        event.eventStartTime = editTime.value
        event.eventNotes = editNote.value
    }
    return event
}
const resetEditData = () => {
    editTime.value = ""
    editNote.value = ""
}
function formateTime(date) {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(date).toLocaleString("th-TH", options);
}

</script>

<template>

    <div id="contents-list" class="px-10 pb-5 flex justify-center">
        <table class="table-zebra table-layout table-element">
            <tbody>
                <tr v-for="(event, index) in eventList" :key="index">
                    <td class="p-10 text-xl">
                        <div class="box-element break-words">
                            <p>{{ event.bookingName.slice(0, 40) }} <a v-if="event.bookingName.length > 40">...</a></p>
                        </div>
                    </td>
                    <td class="p-10 text-xl">
                        <div class="pt-2">
                            <p>{{ event.eventCategory.eventCategoryName }}</p>
                        </div>
                    </td>
                    <td class="p-10 text-xl">
                        <p>{{ moment(event.eventStartTime).format('ddd, D MMM YYYY') }} {{
                                formateTime(event.eventStartTime)
                        }}</p>
                    </td>
                    <td class="p-10 text-xl">
                        <p>{{ event.eventDuration }} Minutes</p>
                    </td>
                    <td>
                        <div id="showDetail">
                            <button class="m-2 w-10 p-3 edit">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                                    v-on:click="showIndex = index, DetailPopUp = true" @click="$emit('showDetail')"
                                    style="font-weight: bold;">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button class="m-2 w-10 p-3 del">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" @click="$emit('delete', event.id)">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>


    <div class="body">
        <div>
            <div class="modal-show" v-if="DetailPopUp == true">
                <ul>
                    <li v-for="(event, index) in eventList" :key="index">
                        <div class="card-body" v-if="DetailPopUp == true">
                            <div class="card popDetail bg-base-100" style="width: 38rem;" v-if="showIndex === index">
                                <div class="card-title">

                                    <button class="btn btn-circle btn-outline" @click="$emit('showDetail')"
                                        v-on:click="showIndex = null, DetailPopUp = false">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                </div>
                                <div class="card-body" v-if="showIndex === index">

                                    <div class="text-2xl font-bold flex justify-center">
                                        <p class="font-header">
                                            Name
                                        </p>
                                    </div>

                                    <p class="py-2">{{ event.bookingName }}</p>

                                    <div class="text-2xl font-bold flex justify-center">
                                        <p class="font-header">
                                            Email
                                        </p>
                                    </div>

                                    <p class="py-2">{{ event.bookingEmail }}</p>

                                    <div class="text-2xl font-bold flex justify-center">
                                        <p class="font-header">
                                            Clinic
                                        </p>
                                    </div>

                                    <p class="py-2">{{ event.eventCategory.eventCategoryName }}</p>

                                    <div class="text-2xl font-bold flex justify-center">
                                        <p class="font-header">
                                            Date
                                        </p>
                                    </div>

                                    <p class="py-2">{{ moment(event.eventStartTime).format('ddd, D MMM YYYY') }} at {{
                                            formateTime(event.eventStartTime)
                                    }}</p>

                                    <div class="text-2xl font-bold flex justify-center">
                                        <p class="font-header">
                                            Duration
                                        </p>
                                    </div>

                                    <p class=" py-2">{{ event.eventDuration }} minutes</p>

                                    <div class="text-2xl font-bold flex justify-center">
                                        <p class="font-header">
                                            Note
                                        </p>
                                    </div>

                                    <p v-if="event.eventNotes == null || event.eventNotes == []" style="color: #a2a5aa"
                                        class="pb-4">
                                        No Message
                                    </p>

                                    <p v-else class="py-2">{{ event.eventNotes }}</p>

                                    <!-- Edit -->
                                    <button v-if="role !== 'lecturer'" class="btn btn-warning"
                                        style="margin-right: 40px;" v-on:click="editingMode = true">Edit
                                    </button>

                                    <div class="containerV2" v-if="editingMode === true">
                                        <div class="card popEdit" style="width: 38rem;">
                                            <div class="card-body bg-base-100">
                                                <div v-if="showIndex === index">
                                                    <div class="text-2xl font-bold flex justify-center py-1">
                                                        <p class="font-header">
                                                            Name
                                                        </p>
                                                    </div>

                                                    <p class="py-2">{{ event.bookingName }}</p>

                                                    <div class="text-2xl font-bold flex justify-center py-1">
                                                        <p class="font-header">
                                                            Email
                                                        </p>
                                                    </div>

                                                    <p class="py-2">{{ event.bookingEmail }}</p>


                                                    <div class="text-2xl font-bold flex justify-center py-1">
                                                        <p class="font-header">
                                                            Clinic
                                                        </p>
                                                    </div>

                                                    <p class="py-2">{{ event.eventCategory.eventCategoryName }}</p>

                                                    <div class="text-2xl font-bold flex justify-center py-1">
                                                        <p class="font-header">
                                                            Date
                                                        </p>
                                                    </div>

                                                    <Datepicker :minDate="new Date()" v-model="editTime"
                                                        class="datepicker" :class="{ 'border border-danger': overlap }"
                                                        style="margin-bottom: 10px;" />


                                                    <p v-if="errorPast && !overlap"
                                                        class="error pb-4 flex justify-center">Can not choose past time
                                                    </p>

                                                    <p v-if="overlap" class="error pb-4 flex justify-center">Time is
                                                        overlapping</p>

                                                    <div class="text-2xl font-bold flex justify-center py-1">
                                                        <p class="font-header">
                                                            Duration
                                                        </p>
                                                    </div>

                                                    <p class="py-2">{{ event.eventDuration }} minutes</p>

                                                    <div class="text-2xl font-bold flex justify-center py-1">
                                                        <p class="font-header">
                                                            Note
                                                        </p>
                                                    </div>

                                                    <textarea class="text-black p-2 rounded-lg" cols="50" rows="3"
                                                        maxlength="500" v-model="editNote"></textarea>

                                                    <div style="margin-top: 30px;">
                                                        <button type="button"
                                                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl"
                                                            style="margin-right: 40px;"
                                                            @click="$emit('edit', editEvent(event), resetEditData())">Save</button>
                                                        <button type="button"
                                                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xl"
                                                            v-on:click="editingMode = false"
                                                            @click="$emit('cancelEdit', resetEditData())">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<style scoped>
.body {
    font-family: 'Inter', 'Noto Sans Thai';
}


.error {
    color: red;
    font-size: 13px;
    text-align: left;
    margin-bottom: -8px;
}


.popEdit {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    text-align: center;
    font-size: 18px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}


.noti {
    font-size: 13px;
    color: red;
}


.containerV2 {
    position: fixed;
    min-width: 100%;
    max-height: 100%;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    background-repeat: repeat-x;
    z-index: 2;
}

.container {
    position: fixed;
    min-width: 100%;
    max-height: 100%;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    background-repeat: repeat-x;
}

.popDetail {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    text-align: center;
    font-size: 18px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.card-title {
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: -30px;
}

.card-title .close-detail {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-size: 45px;
    font-weight: bold;
    margin-top: -2%;
}

ul {
    list-style-type: none;
}

td {
    height: 80px;
}

thead {
    height: 82px;
    color: white;
}

#list-table {
    width: 90%;
    border-radius: 15px 15px 15px 15px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    position: relative;
    text-align: center;
}

.font-header {
    color: #2E86C1;
}

.modal-content {
    margin: auto;
    padding: 20px;
    width: 550px;
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

.auto-fill {
    color: #8f8f8f;
}

.edit:hover {
    color: #3498DB;
}
</style>