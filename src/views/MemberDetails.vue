<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api'

const route = useRoute()
const router = useRouter()
const member = ref(null)
const error = ref('')
const loading = ref(true)

onMounted(async () => {
    try {
        member.value = await api.getMember(route.params.id)
    } catch (e) {
        error.value = "Impossible de charger ce membre."
    } finally {
        loading.value = false
    }
})

const remove = async () => {
    if (!confirm(`Supprimer le membre ${member.value.member_number} ?`)) return
    try {
        await api.deleteMember(member.value.id)
        router.push('/membres')
    } catch (e) {
        alert('Erreur lors de la suppression.')
    }
}

const statutLabel = (s) => (s === 'actif' ? 'Actif' : s === 'inactif' ? 'Inactif' : 'Suspendu')
</script>

<template>
    <div class="page">
        <header class="page-header">
            <h1>Détails du membre</h1>
            <div class="page-actions">
                <RouterLink :to="`/membres/${route.params.id}/modifier`" class="btn">Modifier</RouterLink>
                <button class="btn btn-danger" @click="remove">Supprimer</button>
            </div>
        </header>

        <p v-if="error" class="alert alert-error">{{ error }}</p>
        <p v-if="loading" class="alert">Chargement…</p>

        <section v-if="member" class="panel">
            <div class="member-head">
                <div class="avatar">{{ member.last_name.charAt(0) }}{{ member.first_name.charAt(0) }}</div>
                <div>
                    <h2>{{ member.last_name.toUpperCase() }} {{ member.first_name }}</h2>
                    <p class="mono">{{ member.member_number }}</p>
                    <span class="badge" :class="'badge-' + member.status">{{ statutLabel(member.status) }}</span>
                </div>
            </div>

            <dl class="details">
                <div><dt>Sexe</dt><dd>{{ member.gender === 'M' ? 'Masculin' : 'Féminin' }}</dd></div>
                <div><dt>Date de naissance</dt><dd>{{ member.birth_date || '—' }}</dd></div>
                <div><dt>Téléphone</dt><dd>{{ member.phone || '—' }}</dd></div>
                <div><dt>Email</dt><dd>{{ member.email || '—' }}</dd></div>
                <div><dt>Adresse</dt><dd>{{ member.address || '—' }}</dd></div>
                <div><dt>Date d'adhésion</dt><dd>{{ member.membership_date }}</dd></div>
                <div><dt>Fonction</dt><dd>{{ member.function }}</dd></div>
                <div><dt>Créé le</dt><dd>{{ member.created_at }}</dd></div>
            </dl>

            <div class="form-actions">
                <RouterLink to="/membres" class="btn">← Retour à la liste</RouterLink>
            </div>
        </section>
    </div>
</template>