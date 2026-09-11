<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const submit = async () => {
    loading.value = true
    error.value = ''
    try {
        await login(email.value, password.value)
        router.push('/')
    } catch (e) {
        error.value = e.response?.data?.message || e.response?.data?.errors?.email?.[0] || "Connexion impossible."
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="login-wrap">
        <div class="login-card">
            <div class="login-brand">
                <div class="login-logo">ADJR</div>
                <h1>Association pour le Développement des Jeunes de Rukinga</h1>
                <p>Espace de gestion des membres</p>
            </div>

            <p v-if="error" class="alert alert-error">{{ error }}</p>

            <form class="form" @submit.prevent="submit">
                <div class="form-group">
                    <label>Email</label>
                    <input
                        v-model.trim="email"
                        type="email"
                        class="input"
                        placeholder="david@adjr.org"
                        required
                    />
                </div>
                <div class="form-group">
                    <label>Mot de passe</label>
                    <input
                        v-model="password"
                        type="password"
                        class="input"
                        placeholder="••••••••"
                        required
                    />
                </div>
                <button class="btn btn-primary btn-block" :disabled="loading">
                    {{ loading ? 'Connexion…' : 'Se connecter' }}
                </button>
            </form>
        </div>
    </div>
</template>