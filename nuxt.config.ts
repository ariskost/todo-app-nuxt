import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineNuxtConfig({
    css: ['~/assets/css/animations.css','~/assets/css/tailwind.css'],
    modules: ['@pinia/nuxt'],
    plugins: ['~/plugins/fontawesome.ts'],
    pages: true,
    vite: {
        css: {
            postcss: {
                plugins: [
                    tailwindcss,
                    autoprefixer
                ],
            },
        },
    },
    runtimeConfig: {
        public: {
            appTitle: process.env.APP_TITLE || 'To Do List Application Kostidis',
            appBaseUrl: process.env.APP_API_BASE_URL || 'http://localhost:3000',
            authEmail: process.env.AUTH_EMAIL || 'user@titlos.com',
            authPassword: process.env.AUTH_PASSWORD || 'password', 
        },
    },
    app: {
        head: {
            title: process.env.APP_TITLE || 'To Do List Application Kostidis',
        },
    },
    devtools: { enabled: true },
})
