<script setup>
import { ref } from "vue";

defineEmits(["create"]);

const props = defineProps({
    users: {
        type: Array,
        require: true,
    },
});

const isModalOn = ref(false);
const Name = ref("");
const Email = ref("");
const Password = ref("");
const Conpass = ref("");
const option = ref();
const roles = ["student", "lecturer", "admin"];
const error = ref(false);

const empty = (name) => {
    if (name.trim() == "") {
        error.value = true;
    } else {
        error.value = false;
    }
};

const isunique = ref(false);
const Nerror = ref(false);
const Eerror = ref(false);

const uniquename = (name) => {
    props.users.forEach((e) => {
        if (e.name.toLowerCase() == name.trim().toLowerCase()) {
            isunique.value = true;
            Nerror.value = true;
        }
    });
};

const uniqueemail = (email) => {
    props.users.forEach((e) => {
        if (e.email.toLowerCase() == email.trim().toLowerCase()) {
            isunique.value = true;
            Eerror.value = true;
        }
    });
};

const errorpass = ref(false);

const confirmPass = (pass, conpass) => {
    if (pass !== conpass) {
        errorpass.value = true;
    }
};
</script>
      
<template>
    <div id="create">

        <div class="flex justify-center">
            <div class="modal-content-box bg-base-200 rounded-2xl">
                <!-- form -->
                <p class="p-8 font-sans font-bold text-4xl text-center">Create account</p>
                <form method="post"
                    @submit.prevent="$emit('create', Name, Email, option, Password, isunique, errorpass); error == true ? isModalOn : isunique == true ? isModalOn : errorpass == true ? isModalOn : (isModalOn = !isModalOn); isunique = false;">
                    <!-- Name -->
                    <div class="grid justify-center">
                        <label for="name">Name
                            <span class="auto-fill">({{ Name.length }}/100)</span></label>
                        <div class="py-3">
                            <input type="text" v-model="Name" maxlength="100"
                                class="form-element bg-base-100 border-b-2 italic" placeholder="Please enter your name"
                                required />
                        </div>
                        <p class="text-red-600" v-show="Nerror">-------- This name is already in use --------</p>

                        <!-- Email -->
                        <label for="Email">Email
                            <span class="auto-fill">({{ Email.length }}/50)</span></label>
                        <div class="py-3">
                            <input type="email" v-model="Email" maxlength="50"
                                class="form-element bg-base-100 border-b-2 italic" placeholder="Please enter your email"
                                required />
                        </div>
                        <p class="text-red-600" v-show="Eerror">-------- This email is already in use --------</p>

                        <!-- password -->
                        <label for="Email">Password</label>
                        <div class="py-3 flex items-center">
                            <input type="password" v-model="Password" minlength="8" maxlength="14"
                                class="form-element bg-base-100 border-b-2 italic" placeholder="••••••••••••••"
                                required />
                        </div>

                        <!-- confirm password -->
                        <label for="password">Confirm Password</label>
                        <div class="py-3 flex items-center">
                            <input type="password" v-model="Conpass" minlength="8" maxlength="14"
                                class="form-element bg-base-100 border-b-2 italic" placeholder="••••••••••••••"
                                required />
                        </div>
                        <p class="text-red-600" v-show="errorpass">------------ Password not match ------------</p>

                        <!-- Role -->
                        <label for="role">Role</label>
                        <div class="py-3">
                            <select name="roles" class="select form-element bg-base-100 border-b-2 italic"
                                v-model="option">
                                <option v-for="role in roles">{{ role }}</option>
                            </select>
                        </div>
                        <span class="text-xs	text-red-500">** If you didn't select role. The default will be a student
                            **</span>

                        <div class="p-6">
                            <!-- Create -->
                            <input
                                class="inline-block px-7 py-3 bg-stone-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-stone-400 hover:shadow-lg focus:bg-stone-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                type="submit" value="Sign Up"
                                @click="empty(Name); uniquename(Name); uniqueemail(Email); confirmPass(Password, Conpass);" />
                        </div>
                        <div class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already a user? <a href="#"
                                class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                <router-link :to="{ name: 'loginUser' }">SIGN IN</router-link>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
      
<style>
.form-password {
    border-color: #494a7d;
    border-width: 2px;
    padding: 10px;
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
}

.form-eye {
    border-color: #494a7d;
    padding: 8px;
    border-width: 2px;
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
}

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

.modal-content-box {
    margin: 30px;
    padding: 20px;
    width: 500px;
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
      
      