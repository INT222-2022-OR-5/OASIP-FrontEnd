<script setup>
import { ref, onBeforeMount } from 'vue'

defineEmits(['create'])

const props = defineProps({
    userDetail: {
        type: Array,
        require: true,
    },
}
)

const isModalOn = ref(false);
const Name = ref("");
const Email = ref("");
const option = ref("");
const roles = ["admin", "lecturer", "student"];
const error = ref(false);

const empty = (name) => {
    if (name.trim() == "") {
        error.value = true;
    } else {
        error.value = false;
    }
}
</script>

<template>
    <div id="create">
        <button class="btn text-xl font-extrabold px-10" @click="Name = '';Email = '';option = undefined;error = false;isModalOn = !isModalOn;">
            Create User
        </button>
        <div v-show="isModalOn" class="modal-show flex justify-center">
            <div class="modal-content bg-gray-800 rounded-2xl">
                <div class="flex justify-end">
                    <button class="close" @click="isModalOn = !isModalOn">x</button>
                </div>
                <!-- form -->
                <form method="post" @submit.prevent="$emit('create', Name, Email, option); error == true ? isModalOn : (isModalOn = !isModalOn);">
                    <!-- Name -->
                    <div class="grid justify-center">
                        <p class="p-8 font-sans font-bold text-4xl text-center">Create User</p>
                        <label for="name">Username
                            <span class="auto-fill">({{ Name.length }}/100)</span></label>
                        <div class="py-3">
                            <input type="text" v-model="Name" maxlength="100" class="form-element bg-black italic"
                                placeholder="Your name" required />
                        </div>
                        <!-- <p class="text-red-600" v-show="error">Error!!!</p> -->
                        <!-- Email -->
                        <label for="Email">Email
                            <span class="auto-fill">({{ Email.length }}/50)</span></label>
                        <div class="py-3">
                            <input type="email" v-model="Email" maxlength="50"
                                class="form-element bg-black border-b-2 italic" placeholder="Your email" required />
                        </div>
                        <!-- Role -->
                        <label for="role">Role</label>
                        <span class="text-red-500 text-xs"> ** If you don't select, the default will be student **</span>
                        <div class="py-3">
                            <select name="roles" class="select form-element bg-black border-b-2 italic" v-model="option"
                                >
                                <option v-for="role in roles">{{ role }}</option>
                                <!-- <option value="admin">admin</option>
                                <option value="lecturer">lecturer</option>
                                <option value="student" selected>student</option> -->
                            </select>
                        </div>
                    </div>
                    <div class="flex justify-end pt-2">
                        <!-- Create -->
                        <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Create" @click="empty(Name)" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
 
<style>
.form-element {
    border-color: #AEB6BF;
    border-radius: 5px;
    padding: 10px;
    border-width: 2px;
    width: 100%;
}

.form-element:focus {
    outline: none !important;
    border: 2px solid #85C1E9;
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

</style>