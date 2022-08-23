import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EventCategory from '../views/Event-Category.vue'
import EventList from '../views/Event-List.vue'
import Team from '../views/Team.vue'
import DetailBase from '../views/Detail-Base.vue'
import AddEvent from '../views/Add-Event.vue'
import UserList from '../views/User-List.vue'
import UserDetail from '../views/User-Detail.vue'
import UserAdd from '../views/User-Add.vue'

const history = createWebHistory('/or5/')
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/category',
        name: 'EventCategory',
        component: EventCategory
    },
    {
        path: '/event',
        name: 'EventList',
        component: EventList
    },
    {
        path: '/user-detail/:id',
        name: 'UserDetail',
        component: UserDetail
    },
    {
        path: '/detail/:id',
        name: 'DetailBase',
        component: DetailBase
    },
    {
        path: '/addevent',
        name: 'AddEvent',
        component: AddEvent
    },
    {
        path: '/team',
        name: 'Team',
        component: Team
    },
    {
        path: '/user',
        name: 'UserList',
        component: UserList
    },
    {
        path: '/add-user',
        name: 'UserAdd',
        component: UserAdd
    }
]

const router = createRouter({ history, routes })
export default router