<script setup>
import { useRouter } from "vue-router";
const appRouter = useRouter();
const homeRouter = () => appRouter.push({ name: "home" });

</script>
     
<template>
    <div class="text-center">
        <img class="mt-32 mx-auto" src='../assets/notfound.png' alt="" width="500" height="600" />
        <button @click.left="homeRouter" class="btn mt-5 text-base px-10">Go To Home Page</button>
    </div>
</template>
     
<style>

</style>