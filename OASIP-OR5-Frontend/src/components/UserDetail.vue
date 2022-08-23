<script setup>
const props = defineProps({
    userDetail: {
        type: Object,
        require: true
    }
})

</script>

<template>
    <p class="p-8 font-sans font-bold text-4xl text-center">
        Detail of <span class="text-blue-500">User</span>
    </p>

    <div class="container flex justify-center mx-auto">
        <div
            class="p-8 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 font-sans font-medium">
            <p class="my-4 font-bold">
                Name :<br />
                <input type="text" size="35" :value="userDetail.name" disabled
                    class="text-cyan-600 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
            </p>

            <p class="my-4 font-bold">
                Email :<br />
                <input type="text" size="35" :value="userDetail.email" disabled
                    class="text-cyan-600 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
            </p>

            <p class="my-4 font-bold">
                Role :<br />
                <input type="text" size="35" :value="userDetail.role" disabled
                    class="text-cyan-600 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
            </p>

            <p class="my-4 font-bold">
                Created On :<br />
                <input type="text" size="35" :value="userDetail.createdOn" disabled
                    class="text-cyan-600 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
            </p>

            <p class="my-4 font-bold">
                Updated On :<br />
                <input type="text" size="35" :value="userDetail.updatedOn" disabled
                    class="text-cyan-600 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
            </p>

            <router-link :to="{ name: 'UserList' }">
                <a href="#"
                    class="inline-flex items-center py-2 px-3 my-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Back
                </a>
            </router-link>
        </div>
    </div>
</template>

<style>
</style>
