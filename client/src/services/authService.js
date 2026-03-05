import api from './api'

export const authService = {
    async login({ email, username, password }) {
        const res = await api.post('/users/login', { email, username, password })
        return res.data // { user, accessToken, refreshToken }
    },

    async register(formData) {
        // formData is a FormData object with fullName, email, username, password, avatar
        const res = await api.post('/users/register', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return res.data
    },

    async logout() {
        const res = await api.post('/users/logout')
        return res.data
    },

    async getCurrentUser() {
        const res = await api.get('/users/current-user')
        return res.data
    },

    async refreshToken(refreshToken) {
        const res = await api.post('/users/refresh-token', { refreshToken })
        return res.data
    },
}
