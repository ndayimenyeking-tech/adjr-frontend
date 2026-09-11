<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useAuth } from './store/auth'

const route = useRoute()
const router = useRouter()
const { user, logout } = useAuth()

const isPublicPage = computed(() => route.meta.public)

const navItems = [
    { to: '/', label: 'Tableau de bord', icon: '📊' },
    { to: '/membres', label: 'Membres', icon: '👥' },
]

const onLogout = async () => {
    await logout()
    router.push('/login')
}
</script>

<template>
    <div v-if="isPublicPage" class="layout">
        <main class="main main-centered">
            <RouterView />
        </main>
    </div>

    <div v-else class="layout">
        <aside class="sidebar">
            <div class="brand">
                <div class="brand-logo">ADJR</div>
                <div class="brand-name">
                    <strong>ADJR</strong>
                    <small>Rukinga</small>
                </div>
            </div>
            <nav class="nav">
                <RouterLink
                    v-for="item in navItems"
                    :key="item.to"
                    :to="item.to"
                    class="nav-link"
                >
                    <span class="nav-icon">{{ item.icon }}</span>
                    {{ item.label }}
                </RouterLink>
            </nav>

            <div class="sidebar-user">
                <div class="user-name">{{ user?.name }}</div>
                <div class="user-role">{{ user?.role === 'admin' ? 'Administrateur' : user?.role }}</div>
                <button class="btn-logout" @click="onLogout">Déconnexion</button>
            </div>
        </aside>

        <main class="main">
            <RouterView />
        </main>
    </div>
</template>