<template>
    <div class="container">
        <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h1 class="text-2xl text-center font-bold mb-4">Login</h1>
            <hr class="divider">
            <form @submit.prevent="handleLogin" class="flex flex-col space-y-4">
                <input v-model="email" type="email" placeholder="Email" class="p-3 loginForm__input" />
                <input v-model="password" type="password" placeholder="Password" class="p-3 loginForm__input" />
                <button type="submit" class="py-3 rounded login_button">Login</button>
            </form>
            <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const authStore = useAuthStore()

const handleLogin = () => {
    if (authStore.login(email.value, password.value)) {
        navigateTo('/') // Redirect to the home page after successful login
    } else {
        errorMessage.value = 'Invalid email or password.'
    }
}
</script>
<style>
.container{ max-width: 800px !important; }
.divider {
    border-top: 2px solid;
    padding: 10px 0;
}
.loginForm__input {
    border-bottom: 2px solid;
    border-color: darkgray;
    outline: none;
}
.login_button{
    background:#FFED00 !important;
    font-weight: 600;
}
.login_button:hover{
    font-weight: 700;
}
</style>