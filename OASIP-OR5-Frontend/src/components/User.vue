<script setup>
import { ref, onBeforeMount } from 'vue'
import AddUser from "./AddUser.vue";

defineEmits(['deleteUser'])

const userData = ref([])

const getUser = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/users`)
  if (res.status === 200) {
    userData.value = await res.json()
    console.log(`response.status: ${res.status}`)
    console.log(userData.value)
  } else console.log("Error,This page can't get data")
}

onBeforeMount(async () => {
  await getUser()
})

const createUser = async (Name, Email, Role) => {
  if (Name.trim() != "") {
    const res = await fetch(`${import.meta.env.BASE_URL}api/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: Name.trim(),
        email: Email.trim(),
        role: Role
      }),
    });
    if (res.status === 201) {
      getUser();
    } else console.log("error, cannot be added");
  }
  // window.location.reload();
}

const props = defineProps({
  userList: {
    type: Array,
    require: true
  }
})
</script>
 
<template>
  <div>
    <p class="p-8 font-sans font-bold text-4xl text-center">All Users</p>
    <div class="container flex justify-center mx-auto">
      <div class="flex flex-col">
        <div class="w-full">
          <div class="border-b border-gray-200 shadow">
            <table class="table-fixed divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-2 text-xs text-gray-500">Name</th>
                  <th class="px-6 py-2 text-xs text-gray-500">Email</th>
                  <th class="px-6 py-2 text-xs text-gray-500">Role</th>
                  <th class="px-6 py-2 text-xs text-gray-500">Detail</th>
                  <th class="px-6 py-2 text-xs text-gray-500">Delete</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-300">
                <tr v-for="(user, index) in userList" :key="user.id" class="whitespace-nowrap">
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ user.name }}
                  </td>

                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ user.email }}
                  </td>

                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ user.role }}
                  </td>

                  <td class="px-6 py-4">
                    <router-link :to="{ name: 'UserDetail', params: { id: user.id } }">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </router-link>
                  </td>

                  <td class="px-6 py-4">
                    <button class="delete" @click="$emit('deleteUser', user.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <router-link :to="{ name: 'UserAdd' }">
            <button
              class="w-full mt-4 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white py-2 rounded-md text-lg font-semibold">
              Sign in
            </button>
          </router-link> -->

          <button
            class="w-full mt-4 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white py-2 rounded-md text-lg font-semibold">
            <AddUser @create="createUser"/>
          </button>

        </div>
      </div>
    </div>
    <div v-if="userList.length == 0" class="m-80 font-sans font-bold text-xl text-center text-red-500 text-opacity-25">
      No Informations.
    </div>
  </div>

</template>
 
<style>
</style>