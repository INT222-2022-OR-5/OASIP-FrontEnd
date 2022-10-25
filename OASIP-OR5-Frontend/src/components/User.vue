<script setup>
import UserNavbar from "./buttons/user/UserNavbar.vue";
import UserCreate from "./buttons/user/UserCreate.vue";
import UserDetail from "./buttons/user/UserDetail.vue";
import UserDelete from "./buttons/user/UserDelete.vue";

import { ref, onBeforeMount } from "vue";

const users = ref([]);
const newAccess = ref()
let token = localStorage.getItem("token")
const refreshToken = localStorage.getItem("refreshToken");

const RefreshToken = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/refresh-token`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  }
  );
  if (res.status === 200) {
    newAccess.value = await res.json()
    refresh()
    getUsers()
  } else if (res.status === 401) {
    localStorage.clear()
    window.location.href = "/or5"
    console.log("Please sign out your account");
  }
};

const refresh = () => {
  token = localStorage.setItem('token', `${newAccess.value.accessToken}`)
}

// GET
const getUsers = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (res.status === 200) {
    users.value = await res.json();
    console.log("User can get data");
  } else if (res.status === 401 && token !== null) {
    RefreshToken();
  } else console.log("Error, cannot get data");
};

onBeforeMount(async () => {
  await getUsers();
});

// POST
const createNewUsers = async (Name, Email, Role, Password, isunique, error) => {
  if (Name.trim() != "" && isunique == false && error == false) {
    const res = await fetch(`${import.meta.env.BASE_URL}api/users/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        name: Name.trim(),
        email: Email.trim(),
        role: Role,
        password: Password
      }),
    });
    if (res.status === 201) {
      getUsers();
      console.log("Created successfully");
    } else if (res.status === 401 && token !== null) {
      RefreshToken();
    } else console.log("Error, User cannot be created");
  }
};

// DELETE
const removeUsers = async (id) => {
  if (confirm("Do you want to delete?")) {
    const res = await fetch(
      `${import.meta.env.BASE_URL}api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    if (res.status === 200) {
      users.value = users.value.filter((users) => users.id !== id);
      console.log("Deleted successfullly");
    } else if (res.status === 401 && token !== null) {
      RefreshToken();
    } else console.log("Error, User cannot be deleted");
  }
};

// PUT
const modifyUser = async (id, newName, newEmail, newRole, isunique) => {
  if (isunique == false) {
    const res = await fetch(`${import.meta.env.BASE_URL}api/users/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        name: newName,
        email: newEmail,
        role: newRole,
      }),
    });
    if (res.status === 200) {
      getUsers();
      console.log("Updated successfully");
    } else if (res.status === 401 && token !== null) {
      RefreshToken();
    } else console.log("Error, User cannot be updated");
    console.log(newRole, newName, newEmail);
  }
};

const currentDetail = ref({});

const moreDetail = (curUserId) => {
  currentDetail.value = curUserId;
  getUsers();
};
</script>

<template>

  <div v-if="token == null">
    <div class="w-full md:w-1/3 mx-auto">
      <div class="flex flex-col p-5 rounded-lg shadow bg-white">
        <div class="flex flex-col items-center text-center">
          <div class="inline-block p-4 bg-yellow-50 rounded-full">
            <svg class="w-20 h-20 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
            </svg>
          </div>
          <h2 class="m-2 font-semibold text-gray-800 text-4xl">Please sign in</h2>
        </div>
        <router-link :to="{ name: 'loginUser' }">
          <div class="flex items-center mt-3">
            <button class="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
              Okay
            </button>
          </div>
        </router-link>
      </div>
    </div>
  </div>

  <div v-else id="contents-list" class="px-10 py-5 flex justify-center">
    <table class="table-zebra table-layout table-element">
      <thead class="table-header bg-base-200">
        <tr>
          <UserNavbar />
          <th>
            <UserCreate @create="createNewUsers" :users="users" />
          </th>
        </tr>
      </thead>
      <div class="no-event text-5xl pt-20" v-if="users.length < 1">
        No Users
      </div>
      <tbody v-else>
        <tr v-for="contents in users">
          <td class="p-10 text-xl">
            <div class="box-element break-words">
              {{ contents.name }}
            </div>
          </td>
          <td class="p-10 text-xl">
            <div class="box-element break-words">
              {{ contents.email }}
            </div>
          </td>
          <td class="p-10 text-xl">
            <div class="box-element break-words">
              {{ contents.role }}
            </div>
          </td>
          <td>
            <div>
              <UserDetail @moreDetail="moreDetail(contents)" :detail="currentDetail" :users="users"
                @editDetail="modifyUser" />
              <UserDelete @delete="removeUsers(contents.id)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  text-align: left;
  position: relative;
  border-collapse: collapse;
  border-radius: 6px;
}

.table-element {
  height: 100px;
}

.table-layout {
  table-layout: fixed;
  width: 90%;
}

.table-header {
  position: sticky;
  top: 0;
  height: 100px;
}


.no-event {
  text-align: center;
  width: 100%;
  position: absolute;
  z-index: -1;
}

input,
textarea {
  color: rgb(0 0 0);
}

.box-element {
  width: 250px;
}
</style>
