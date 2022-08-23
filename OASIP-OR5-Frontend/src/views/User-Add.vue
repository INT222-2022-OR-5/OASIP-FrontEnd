<!-- <script setup>
import AddUser from '../components/AddUser.vue'

// post
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
        role: Role,
      }),
    });
    if (res.status === 201) {
      getUsers();
    } else console.log("error, cannot be added");
  }
}

</script>

<template>
  <AddUser @create="createUser" />
</template>

<style>
</style> -->
