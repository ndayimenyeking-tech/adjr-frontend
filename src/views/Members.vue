<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import api from '../api'

const router = useRouter()
const members = ref([])
const meta = ref({})
const search = ref('')
const loading = ref(false)
const error = ref('')
const page = ref(1)

const load = async () => {
    loading.value = true
    error.value = ''
    try {
        const data = await api.getMembers({
            search: search.value || undefined,
            page: page.value,
            per_page: 10,
        })
        members.value = data.data
        meta.value = data
    } catch (e) {
        error.value = "Impossible de charger les membres."
    } finally {
        loading.value = false
    }
}

onMounted(load)

const onSearch = () => {
    page.value = 1
    load()
}

const goTo = (p) => {
    if (p < 1 || p > meta.last_page) return
    page.value = p
    load()
}

const statutLabel = (s) => (s === 'actif' ? 'Actif' : s === 'inactif' ? 'Inactif' : 'Suspendu')
</script>

<template>
    <div class="page">
        <header class="page-header">
            <h1>Membres</h1>
            <RouterLink to="/membres/nouveau" class="btn btn-primary">+ Ajouter un membre</RouterLink>
        </header>

        <div class="toolbar">
            <input
                v-model="search"
                class="input"
                type="search"
                placeholder="Rechercher (nom, prénom, n°, email, téléphone)…"
                @keyup.enter="onSearch"
            />
            <button class="btn" @click="onSearch">Rechercher</button>
        </div>

        <p v-if="error" class="alert alert-error">{{ error }}</p>
        <p v-if="loading" class="alert">Chargement…</p>

        <div v-if="!loading" class="table-card">
            <table class="table">
                <thead>
                    <tr>
                        <th>N° Membre</th>
                        <th>Nom</th>
                        <th>Sexe</th>
                        <th>Date d'adhésion</th>
                        <th>Statut</th>
                        <th>Fonction</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="members.length === 0">
                        <td colspan="7" class="empty">Aucun membre trouvé</td>
                    </tr>
                    <tr v-for="m in members" :key="m.id">
                        <td class="mono">{{ m.member_number }}</td>
                        <td>
                            <strong>{{ m.last_name.toUpperCase() }}</strong> {{ m.first_name }}
                        </td>
                        <td>{{ m.gender === 'M' ? 'M' : 'F' }}</td>
                        <td>{{ m.membership_date }}</td>
                        <td>
                            <span class="badge" :class="'badge-' + m.status">
                                {{ statutLabel(m.status) }}
                            </span>
                        </td>
                        <td>{{ m.function }}</td>
                        <td class="actions">
                            <RouterLink :to="`/membres/${m.id}`" class="btn btn-sm">Détails</RouterLink>
                            <RouterLink :to="`/membres/${m.id}/modifier`" class="btn btn-sm">Modifier</RouterLink>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-if="meta.last_page > 1" class="pagination">
                <button class="btn btn-sm" :disabled="page <= 1" @click="goTo(page - 1)">‹ Précédent</button>
                <span>Page {{ meta.current_page }} / {{ meta.last_page }} ({{ meta.total }} membres)</span>
                <button class="btn btn-sm" :disabled="page >= meta.last_page" @click="goTo(page + 1)">Suivant ›</button>
            </div>
        </div>
    </div>
</template>