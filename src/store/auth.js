import { ref, computed } from 'vue'
import api from '../api'

const token = ref(localStorage.getItem('adjr_token') || '')
const user = ref(JSON.parse(localStorage.getItem('adjr_user') || 'null'))

export const isAuthenticated = computed(() => !!token.value)

export function useAuth() {
    const state = { token, user, isAuthenticated }

    const login = async (email, password) => {
        const data = await api.login(email, password)
        token.value = data.token
        user.value = data.user
        localStorage.setItem('adjr_token', data.token)
        localStorage.setItem('adjr_user', JSON.stringify(data.user))
    }

    const logout = async () => {
        try {
            await api.logout()
        } catch (e) {
            // même si le serveur est injoignable, on se déconnecte localement
        }
        token.value = ''
        user.value = null
        localStorage.removeItem('adjr_token')
        localStorage.removeItem('adjr_user')
    }

    const loadUser = async () => {
        try {
            user.value = await api.getMe()
            localStorage.setItem('adjr_user', JSON.stringify(user.value))
        } catch (e) {
            await logout()
        }
    }

    return { ...state, login, logout, loadUser }
}