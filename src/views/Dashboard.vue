<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import api from '../api'

const stats = ref(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
    try {
        stats.value = await api.getStats()
    } catch (e) {
        error.value = "Impossible de charger les statistiques."
    } finally {
        loading.value = false
    }
})

const formatNumber = (n) => (n ?? 0).toLocaleString('fr-FR')
</script>

<template>
    <div class="page">
        <header class="page-header">
            <h1>Tableau de bord</h1>
            <p>Association pour le Développement des Jeunes de Rukinga</p>
        </header>

        <p v-if="error" class="alert alert-error">{{ error }}</p>
        <p v-if="loading" class="alert">Chargement…</p>

        <section v-if="stats" class="stats-grid">
            <div class="stat-card stat-primary">
                <div class="stat-value">{{ formatNumber(stats.total) }}</div>
                <div class="stat-label">Membres</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{{ formatNumber(stats.male) }}</div>
                <div class="stat-label">Hommes</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{{ formatNumber(stats.female) }}</div>
                <div class="stat-label">Femmes</div>
            </div>
            <div class="stat-card stat-success">
                <div class="stat-value">{{ formatNumber(stats.active) }}</div>
                <div class="stat-label">Membres actifs</div>
            </div>
        </section>

        <section v-if="stats" class="stats-grid stats-secondary">
            <div class="stat-card">
                <div class="stat-value">{{ formatNumber(stats.new_this_month) }}</div>
                <div class="stat-label">Nouveaux ce mois</div>
            </div>
            <div class="stat-card stat-warning">
                <div class="stat-value">{{ formatNumber(stats.inactive) }}</div>
                <div class="stat-label">Inactifs</div>
            </div>
        </section>

        <section class="panel">
            <h2>Accès rapide</h2>
            <div class="quick-actions">
                <RouterLink to="/membres" class="btn">Voir les membres</RouterLink>
                <RouterLink to="/membres/nouveau" class="btn btn-primary">Ajouter un membre</RouterLink>
            </div>
        </section>
    </div>
</template>