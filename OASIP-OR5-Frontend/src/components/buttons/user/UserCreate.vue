<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const appRouter = useRouter();
const homeRouter = () => appRouter.push({ name: "home" });

const newUser = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: ""
})
const errorStatus = ref({
  filedErrors: { email: "", name: "" }
})

const notUniqueAddName = ref(false);
const notUniqueAddEmail = ref(false);
const errorAddName = ref(false);
const errorAddEmail = ref(false);
const errorAddRole = ref(false);
const errorAddPass = ref(false);
const invaildAddEmail = ref(false);
const notMatch = ref(false);
const errorConfirm = ref(false);
const passLess = ref(false);

const cantReach = ref(false)

const users = ref([]);
const getUser = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (res.status === 200) {
    cantReach.value = false
    users.value = await res.json();
    users.value.sort();
  } else if (res.status === 401 && token !== null) {
    RefreshToken();
  } else if (res.status === 403) {
    cantReach.value = true
  }
};

onBeforeMount(async () => {
  await getUser()
})

const createUser = async (user) => {
  if (user.name == null || user.name == "") {
    errorAddName.value = true;
  } else {
    errorAddName.value = false;
  }

  if (user.password.length < 8) {
    passLess.value = true;
  } else {
    passLess.value = false;
  }
  if (
    (user.password == null || user.password == "") &&
    (user.confirmPassword == null || user.confirmPassword == "")
  ) {
    errorAddPass.value = true;
    errorConfirm.value = true;
  } else if (
    (user.password !== null || user.password !== "") &&
    (user.confirmPassword == null || user.confirmPassword == "")
  ) {
    errorAddPass.value = false;
    errorConfirm.value = true;
  } else if (
    (user.password !== null || user.password !== "") &&
    (user.confirmPassword !== null || user.confirmPassword !== "")
  ) {
    if (user.confirmPassword === user.password) {
      notMatch.value = false;
      errorConfirm.value = false;
    } else {
      notMatch.value = true;
    }
  }

  if (user.email == null || user.email == "") {
    errorAddEmail.value = true;
  } else {
    errorAddEmail.value = false;
  }
  if (user.role == null || user.role == "") {
    errorAddRole.value = true;
  } else {
    errorAddRole.value = false;
  }
  var emailValidate =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (user.email.match(emailValidate)) {
    invaildAddEmail.value = false;
  } else {
    invaildAddEmail.value = true;
  }

  if (
    errorAddName.value == true ||
    notUniqueAddName.value == true ||
    notUniqueAddEmail.value == true ||
    errorAddEmail.value == true ||
    errorAddRole.value == true ||
    invaildAddEmail.value == true ||
    errorAddPass.value == true ||
    notMatch.value == true ||
    passLess.value == true
  ) {
    return;
  }

  const res = await fetch(`${import.meta.env.BASE_URL}api/users/signup`, {
    method: "POST",
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify({
      name: user.name.trim(),
      email: user.email.trim(),
      password: user.password,
      role: user.role,
    }),
  });
  if (res.status == 201 || res.status == 200) {
    console.log("added successfully");
    window.location.href = "/or5/user";
    alert("Sign-up Successfully")
  } else if (res.status == 400) {
    errorStatus.value = await res.json()
    console.log(errorStatus.value);
  }
};

const userRole = localStorage.getItem("role")
</script>
      
<template>
  <div v-if="cantReach = true && userRole !== 'admin'" class="text-center">
    <img class="mx-auto" src='../../../assets/forbidden.png' alt="" width="500" height="600" />
    <button @click.left="homeRouter" class="btn mt-5 text-base px-10">Go To Home Page</button>
  </div>

  <div v-else class="body">
    <div class="flex justify-center">
      <div class="modal-content-box bg-base-200 rounded-2xl">

        <div class="flex justify-end">
          <router-link :to="{ name: 'userList' }">
            <button class="btn btn-square btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </router-link>
        </div>

        <p class="p-4 font-sans font-bold text-4xl text-center">Create Account</p>

        <form>
          <div class="grid justify-center">
            <table class="signup-line">
              <tr>
                <th class="maxSignup" :class="{ 'maxinput': newUser.name.length == 100 }">
                  <span v-text="newUser.name.length"></span>/100
                </th>
              </tr>
            </table>
            <div class="py-3">
              <input class="form-element bg-base-100 border-b-2 italic" maxlength="100" v-model="newUser.name"
                placeholder="Name" :class="{ 'styleError': errorAddName || errorStatus.filedErrors.name }">
              <p class="error-signup" v-if="errorAddName === true">Please enter your name</p>
              <p class="error-signup" v-if="errorStatus.filedErrors.name === 'User name is already exists'">Name is
                already
                exists</p>
            </div>
          </div>

          <div class="grid justify-center">
            <table class="signup-line">
              <tr>
                <th class="maxSignup" :class="{ 'maxinput': newUser.email.length == 50 }">
                  <span v-text="newUser.email.length"></span>/50
                </th>
              </tr>
            </table>
            <div class="py-3">
              <input class="form-element bg-base-100 border-b-2 italic" maxlength="50" v-model="newUser.email"
                placeholder="Email"
                :class="{ 'styleError': errorAddEmail || invaildAddEmail || errorStatus.filedErrors.email === 'Email is already exists' }">
              <p class="error-signup" v-if="errorAddEmail === true">Please enter your email</p>
              <p class="error-signup" v-if="errorStatus.filedErrors.email === 'Email is already exists'">
                Email
                is already exists</p>
              <p class="error-signup" v-if="invaildAddEmail === true && errorAddEmail === false">Invaild
                Email
              </p>
              <p class="error-login" v-if="noPass === true">Please enter your password</p>
            </div>
          </div>

          <div class="grid justify-center">
            <table class="signup-line">
              <tr>
                <th class="maxSignup" :class="{ 'maxinput': newUser.password.length == 14 }">
                  <span v-text="newUser.password.length"></span>/14
                </th>
              </tr>
            </table>
            <div class="py-3">
              <input class="form-element bg-base-100 border-b-2 italic" minlength="8" maxlength="14"
                v-model="newUser.password" placeholder="Password" type="password"
                :class="{ 'styleError': errorAddPass || passLess }">
              <p class="error-signup" v-if="errorAddPass === true">Please enter your password</p>
              <p class="error-signup" v-if="passLess === true && errorAddPass === false">Password must be
                between 8 and 14 characters</p>
            </div>

          </div>

          <div class="grid justify-center">
            <table class="signup-line">
              <tr>
                <th class="maxSignup" :class="{ 'maxinput': newUser.confirmPassword.length == 14 }">
                  <span v-text="newUser.confirmPassword.length"></span>/14
                </th>
              </tr>
            </table>
            <div class="py-3">
              <input class="form-element bg-base-100 border-b-2 italic" maxlength="14" v-model="newUser.confirmPassword"
                placeholder="Confirm Password" type="password" :class="{ 'styleError': errorConfirm || notMatch }">
              <p class="error-signup" v-if="errorConfirm === true && notMatch === false">Please confirm
                your
                password.</p>
              <p class="error-signup" v-if="notMatch === true">Password not match.</p>
            </div>
          </div>

          <div class="grid justify-center">
            <table class="signup-line">
              <tr>
                <th class="maxSignup">
                  Select Role
                </th>
              </tr>
            </table>
            <div class="py-3">
              <select class="select form-element bg-base-100 border-b-2 italic" :class="{ 'styleError': errorAddRole }"
                v-model="newUser.role">
                <option disabled selected>Select your role</option>
                <option value="admin">Admin</option>
                <option value="lecturer">Lecturer</option>
                <option value="student">Student</option>
              </select>
              <p class="error-signup" v-if="errorAddRole === true">Please select your role</p>
            </div>
          </div>

          <div class="py-3">
            <button type="button"
              class="inline-block px-7 py-3 bg-stone-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-stone-400 hover:shadow-lg focus:bg-stone-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              @click="createUser(newUser);">
              Create
            </button>
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

select {
  font-size: 16px;
}

.signup-form {
  margin-bottom: 2%;
}

.error-signup {
  color: red;
  font-size: 0.8rem;
  margin-top: 1%;
  margin-bottom: 0;
}

.label-signup {
  font-weight: bold;
  font-size: 1vw;
  width: 10vw;
}

.maxSignup {
  width: 29.5vw;
  text-align: right;
  font-size: 0.7vw;
  color: #888888;
  font-weight: 100;
}

.maxinput {
  color: red;
}

.signup-line {
  margin-left: 30%;
  margin-bottom: 0.5vw;
}
</style>
