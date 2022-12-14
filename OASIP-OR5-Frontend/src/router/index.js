import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import EventList from "../views/EventList.vue"
import CategoryList from "../views/CategoryList.vue"
import UserList from "../views/UserList.vue"
import AboutUs from "../views/AboutUs.vue"
import LoginUser from "../components/LoginUser.vue"
import NotFound from "../views/NotFound.vue"
import Forbidden from "../views/Forbidden.vue"
import SignUp from "../components/SignupUser.vue"
import CreateUser from "../components/buttons/user/UserCreate.vue"
import CreateEvent from "../components/buttons/event/EventCreate.vue"

const history = createWebHistory('/or5/')
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/event',
        name: 'eventList',
        component: EventList,
    },
    {
        path: '/category',
        name: 'categoryList',
        component: CategoryList,
    },
    {
        path: '/user',
        name: 'userList',
        component: UserList,
    },
    {
        path: '/about-us',
        name: 'aboutUs',
        component: AboutUs
    },
    {
        path: '/login',
        name: 'loginUser',
        component: LoginUser
    },
    {
        path: '/:catchNotMatchPath(.*)',
        name: 'NotFound',
        component: NotFound,
    },
    {
        path: '/forbidden',
        name: 'forbidden',
        component: Forbidden,
    },
    {
        path: '/sign-up',
        name: 'signupUser',
        component: SignUp,
    },
    {
        path: '/create-user',
        name: 'createUser',
        component: CreateUser,
    },
    {
        path: '/create-event',
        name: 'createEvent',
        component: CreateEvent,
    }
]

const router = createRouter({history,routes})
export default router