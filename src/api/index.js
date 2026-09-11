import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
})

export default {
    getStats: () => api.get('/stats').then((r) => r.data),
    getMembers: (params) => api.get('/members', { params }).then((r) => r.data),
    getMember: (id) => api.get(`/members/${id}`).then((r) => r.data),
    createMember: (data) => api.post('/members', data).then((r) => r.data),
    updateMember: (id, data) => api.put(`/members/${id}`, data).then((r) => r.data),
    deleteMember: (id) => api.delete(`/members/${id}`),
}