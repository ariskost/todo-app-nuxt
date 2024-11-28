// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineNuxtConfig({
  css: ['~/assets/css/animations.css','~/assets/css/tailwind.css'],
  modules: ['@pinia/nuxt'],
  plugins: ['~/plugins/fontawesome.ts'],
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
    },
  },
  app: {
    head: {
      title: process.env.APP_TITLE || 'To Do List Application Kostidis',
    },
  },
  devtools: { enabled: true },
})
