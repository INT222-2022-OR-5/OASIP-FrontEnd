<script setup>
let token = localStorage.getItem("token");

const signout = () => {
  localStorage.clear()
  window.location.href = "/or5"
  alert("Sign-out Successfully")
}

const role = localStorage.getItem("role");
const email = localStorage.getItem("email");

</script>

<template>
  <div>
    <div class="bg-gray-100 shadow">
      <nav class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
        <div class="flex items-center justify-between">
          <router-link :to="{ name: 'home' }" class="text-4xl font-bold text-gray-800 md:text-4xl hover:text-blue-400">
            <svg class="h-8 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005">
              <rect fill="#2a2a31" x="16.539" y="425.626" width="479.767" height="50.502"
                transform="matrix(1,0,0,1,0,0)" />
              <path class="plane-take-off"
                d=" M 510.7 189.151 C 505.271 168.95 484.565 156.956 464.365 162.385 L 330.156 198.367 L 155.924 35.878 L 107.19 49.008 L 211.729 230.183 L 86.232 263.767 L 36.614 224.754 L 0 234.603 L 45.957 314.27 L 65.274 347.727 L 105.802 336.869 L 240.011 300.886 L 349.726 271.469 L 483.935 235.486 C 504.134 230.057 516.129 209.352 510.7 189.151 Z " />
            </svg>
            OASIP
          </router-link>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <span v-if="email != null" class="font-medium text-sky-500 text-xl">
            <span class="font-bold">User:  </span> {{ email }}
            &nbsp;
            <span class="text-red-400"><span class="font-bold ">Role:  </span> {{ role }}</span>
          </span>
        </div>

        <ul :class="showMenu ? 'flex' : 'hidden'"
          class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0">
          <li class="text-xl font-bold text-gray-800 hover:text-blue-400 hover-underline-animation ">
            <router-link :to="{ name: 'categoryList' }">Clinic</router-link>
          </li>
          <li class="text-xl font-bold text-gray-800 hover:text-blue-400 hover-underline-animation ">
            <router-link :to="{ name: 'eventList' }">Schedule</router-link>
          </li>
          <li class="text-xl font-bold text-gray-800 hover:text-blue-400 hover-underline-animation "
            v-if="role === 'admin'">
            <router-link :to="{ name: 'userList' }">User</router-link>
          </li>
          <li class="text-xl font-bold text-gray-800 hover:text-blue-400 hover-underline-animation ">
            <router-link :to="{ name: 'aboutUs' }">About Us</router-link>
          </li>

          <div v-if="token === null">
            <router-link :to="{ name: 'loginUser' }">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Sign in</button>
            </router-link>
          </div>

          <div v-else-if="token !== null">
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" @click="signout">
              Sign out
            </button>
          </div>

          <!-- <div v-if="token === null">
            <router-link :to="{ name: 'userList' }">
              <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">Sign up</button>
            </router-link>
          </div> -->

        </ul>
      </nav>
    </div>
  </div>
</template>

<style>
.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: #000000;
}

.hover-underline-animation:hover a {
  color: #0ea5e9;
}

.hover-underline-animation:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #4b5563;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
