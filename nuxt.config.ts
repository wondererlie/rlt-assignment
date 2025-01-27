// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path"

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  alias: {
    "@": resolve(__dirname, './'),
    "~": resolve(__dirname, "./")
  },
  css: ["~/assets/style.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
