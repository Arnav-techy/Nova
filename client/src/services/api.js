import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api/v1'

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor — inject JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor — unwrap data and handle 401
api.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const originalRequest = error.config

        // If 401 and not already retrying, try to refresh the token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshToken = localStorage.getItem('refreshToken')
                if (refreshToken) {
                    const res = await axios.post(`${API_BASE_URL}/users/refresh-token`, {
                        refreshToken,
                    })

                    const { accessToken, refreshToken: newRefreshToken } = res.data.data
                    localStorage.setItem('accessToken', accessToken)
                    localStorage.setItem('refreshToken', newRefreshToken)

                    originalRequest.headers.Authorization = `Bearer ${accessToken}`
                    return api(originalRequest)
                }
            } catch (refreshError) {
                // Refresh failed — clear tokens and redirect
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }

        // Extract error message from backend ApiError format
        const message =
            error.response?.data?.message || error.message || 'Something went wrong'

        return Promise.reject({ message, status: error.response?.status })
    }
)

export default api
