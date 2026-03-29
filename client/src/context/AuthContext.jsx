import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const isAuthenticated = !!user

    // Check if user is logged in on mount
    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            authService
                .getCurrentUser()
                .then((userData) => {
                    setUser(userData)
                })
                .catch(() => {
                    // Token invalid — clear
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    setUser(null)
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [])

    const login = useCallback(async (credentials) => {
        const data = await authService.login(credentials)
        // data = { user, accessToken, refreshToken }
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        setUser(data.user)
        return data
    }, [])

    const logout = useCallback(async () => {
        try {
            await authService.logout()
        } catch {
            // Even if logout fails on server, clear local state
        }
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setUser(null)
    }, [])

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
