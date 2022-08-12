import { defineNuxtConfig } from 'nuxt'
import MyModule from '..'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,

    autoImports: {
        global: true
    },

    modules: [
        MyModule,
        '@nuxtjs/supabase',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@enab/ui',
        '@unocss/nuxt',
        "@nuxtjs/color-mode",
    ],
})
