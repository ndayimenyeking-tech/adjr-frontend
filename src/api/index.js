import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adjr_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !error.config?.url?.includes('/auth/login')) {
            localStorage.removeItem('adjr_token')
            localStorage.removeItem('adjr_user')
            if (window.location.pathname !== '/login') {
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    },
)

export default {
    login: (email, password) =>
        api.post('/auth/login', { email, password }).then((r) => r.data),
    logout: () => api.post('/auth/logout'),
    getMe: () => api.get('/auth/me').then((r) => r.data),
    getStats: () => api.get('/stats').then((r) => r.data),
    getMembers: (params) => api.get('/members', { params }).then((r) => r.data),
    getMember: (id) => api.get(`/members/${id}`).then((r) => r.data),
    createMember: (data) => api.post('/members', data).then((r) => r.data),
    updateMember: (id, data) => api.put(`/members/${id}`, data).then((r) => r.data),
    deleteMember: (id) => api.delete(`/members/${id}`),
}