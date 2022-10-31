<script setup>
import { ref } from "vue";

const token = ref()
const email = ref();
const password = ref();
const error = ref(false);

const saveLocal = () => {
  localStorage.setItem('token', `${token.value.access_token}`)
  localStorage.setItem('refreshToken', `${token.value.refresh_token}`)
  localStorage.setItem("email", `${token.value.email}`);
  localStorage.setItem("role", `${token.value.role}`);
}

//POST
const LoginUsers = async (email, password) => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  });
  if (res.status === 200) {
    error.value = false;
    token.value = await res.json();
    saveLocal();
    window.location.href = "/or5"
    alert("Password Matched")
    console.log("Log-in Successfully");
    
  } else {
    error.value = true;
    alert("Password NOT Matched");
    console.log("Error, User cannot login");
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-28 mx-auto">
    <div
      class="w-full bg-base-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white pt-4">
          Welcome to OASIP
        </h1>
        <form action="post" @submit.prevent="LoginUsers(email, password);" class="space-y-4 md:space-y-6">
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input type="email" v-model="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 italic sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email">
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" v-model="password" placeholder="Password"
              class="bg-gray-50 border border-gray-300 text-gray-900 italic sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          </div>
          <button type="submit"
            class="inline-block px-7 py-3 bg-stone-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-stone-400 hover:shadow-lg focus:bg-stone-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full">
            Sign in
          </button>
          <div class="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet? <a href="#"
              class="font-medium text-primary-600 hover:underline dark:text-primary-500">
              <router-link :to="{ name: 'signupUser' }">SIGN UP</router-link>
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
