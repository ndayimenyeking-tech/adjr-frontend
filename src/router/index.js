import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import Members from '../views/Members.vue'
import MemberForm from '../views/MemberForm.vue'
import MemberDetails from '../views/MemberDetails.vue'

const routes = [
    { path: '/', name: 'dashboard', component: Dashboard },
    { path: '/membres', name: 'members', component: Members },
    { path: '/membres/nouveau', name: 'member-create', component: MemberForm },
    { path: '/membres/:id', name: 'member-show', component: MemberDetails },
    { path: '/membres/:id/modifier', name: 'member-edit', component: MemberForm },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router