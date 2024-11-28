import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore()

    console.log(`[Middleware] isAuthenticated: ${authStore.isAuthenticated}`)

    if (!authStore.isAuthenticated && to.path !== '/login') {
        return navigateTo('/login')
    }

    if (authStore.isAuthenticated && to.path === '/login') {
        return navigateTo('/')
    }
})
