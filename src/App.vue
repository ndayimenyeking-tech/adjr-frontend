<script setup>
import { RouterLink, RouterView } from 'vue-router'

const navItems = [
    { to: '/', label: 'Tableau de bord', icon: '📊' },
    { to: '/membres', label: 'Membres', icon: '👥' },
]
</script>

<template>
    <div class="layout">
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
        </aside>

        <main class="main">
            <RouterView />
        </main>
    </div>
</template>