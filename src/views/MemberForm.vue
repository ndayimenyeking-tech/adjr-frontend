<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api'

const route = useRoute()
const router = useRouter()
const isEdit = route.name === 'member-edit'
const error = ref('')
const saving = ref(false)

const form = ref({
    last_name: '',
    first_name: '',
    gender: 'M',
    birth_date: '',
    phone: '',
    email: '',
    address: '',
    membership_date: new Date().toISOString().slice(0, 10),
    status: 'actif',
    function: 'Membre',
})

onMounted(async () => {
    if (isEdit) {
        try {
            const m = await api.getMember(route.params.id)
            Object.assign(form.value, {
                last_name: m.last_name,
                first_name: m.first_name,
                gender: m.gender,
                birth_date: m.birth_date || '',
                phone: m.phone || '',
                email: m.email || '',
                address: m.address || '',
                membership_date: m.membership_date,
                status: m.status,
                function: m.function,
            })
        } catch (e) {
            error.value = "Impossible de charger ce membre."
        }
    }
})

const submit = async () => {
    saving.value = true
    error.value = ''
    try {
        if (isEdit) {
            await api.updateMember(route.params.id, form.value)
        } else {
            await api.createMember(form.value)
        }
        router.push('/membres')
    } catch (e) {
        error.value = e.response?.data?.message || "Une erreur est survenue."
        if (e.response?.data?.errors) {
            const first = Object.values(e.response.data.errors)[0]
            error.value = Array.isArray(first) ? first[0] : 'Veuillez vérifier le formulaire.'
        }
    } finally {
        saving.value = false
    }
}
</script>

<template>
    <div class="page">
        <header class="page-header">
            <h1>{{ isEdit ? 'Modifier le membre' : 'Ajouter un membre' }}</h1>
        </header>

        <p v-if="error" class="alert alert-error">{{ error }}</p>

        <form class="panel form" @submit.prevent="submit">
            <div class="form-row">
                <div class="form-group">
                    <label>Nom *</label>
                    <input v-model.trim="form.last_name" class="input" required />
                </div>
                <div class="form-group">
                    <label>Prénom *</label>
                    <input v-model.trim="form.first_name" class="input" required />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Sexe *</label>
                    <select v-model="form.gender" class="input">
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Date de naissance</label>
                    <input v-model="form.birth_date" type="date" class="input" />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Téléphone</label>
                    <input v-model="form.phone" class="input" placeholder="+257 …" />
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input v-model="form.email" type="email" class="input" />
                </div>
            </div>

            <div class="form-group">
                <label>Adresse</label>
                <input v-model="form.address" class="input" placeholder="Rukinga" />
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Date d'adhésion *</label>
                    <input v-model="form.membership_date" type="date" class="input" required />
                </div>
                <div class="form-group">
                    <label>Fonction</label>
                    <input v-model="form.function" class="input" />
                </div>
                <div class="form-group">
                    <label>Statut</label>
                    <select v-model="form.status" class="input">
                        <option value="actif">Actif</option>
                        <option value="inactif">Inactif</option>
                        <option value="suspendu">Suspendu</option>
                    </select>
                </div>
            </div>

            <div class="form-actions">
                <RouterLink to="/membres" class="btn">Annuler</RouterLink>
                <button class="btn btn-primary" :disabled="saving">
                    {{ saving ? 'Enregistrement…' : isEdit ? 'Enregistrer' : 'Créer le membre' }}
                </button>
            </div>
        </form>
    </div>
</template>