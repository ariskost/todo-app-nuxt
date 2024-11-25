// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  modules: ['@pinia/nuxt'],
  vite: {
    css: {
      postcss: {
        plugins: [
          tailwindcss, // Ensure these are not called as functions here
          autoprefixer
        ],
      },
    },
  },
})
