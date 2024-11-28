<template>
    <div class="min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-center items-center">
        <header class="w-full text-lg text-center font-bold p-5 shadow bg-white flex justify-between items-center">
            <span class="text-center m-auto">TO DO LIST</span>
            <button v-if="authStore.isAuthenticated" @click="handleLogout" class="logout_button text-red-500 underline hover:text-red-700 focus:outline-none">
                <client-only>
                    <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
                </client-only>
            </button>
        </header>
        <NuxtPage />
        <footer class="p-4 mt-auto text-center border-t">
            © 2024 Kostidis Aristeidis. All rights reserved.
        </footer>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const handleLogout = () => {
    authStore.logout()
    navigateTo('/login')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
*{
    box-sizing: border-box;
    font-family: "Open Sans", sans-serif;
}
.logout_button{
    position: absolute;
    right: 30px;
}
</style>
