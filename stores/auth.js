import { defineStore } from 'pinia'
import { useRuntimeConfig } from '#app'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    actions: {
        login(email, password) {
            const config = useRuntimeConfig()
            const authEmail = config.public.authEmail || ''
            const authPassword = config.public.authPassword || ''

            if (email === authEmail && password === authPassword) {
                this.user = { email }
                return true
            }
            return false
        },
        logout() {
            this.user = null
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
})
