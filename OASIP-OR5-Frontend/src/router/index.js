import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Contents from "../views/Contents.vue"
import CategoryContent from "../views/CategoryContent.vue"
import UserContents from "../views/UserContents.vue"
import AboutUs from "../views/AboutUs.vue"


const history = createWebHistory(import.meta.env.VITE_BASE_URL)
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: "/schedule",
        name: "scheduleContents",
        component: Contents,
    },
    {
        path: "/category",
        name: "categoryContents",
        component: CategoryContent,
    },
    {
        path: "/user",
        name: "userContents",
        component: UserContents,
    },
    {
        path: '/aboutus',
        name: 'aboutUs',
        component: AboutUs
    }
]

const router = createRouter({history,routes})
export default router