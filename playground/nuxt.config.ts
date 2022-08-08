import { defineNuxtConfig } from 'nuxt'
import MyModule from '..'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,

    autoImports: {
        global: true
    },
    components: {
        global: true,
        dirs: [
            '~/components',
        ]
    },
    modules: [
        MyModule,
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@enab/ui',
        '@unocss/nuxt',
        "@nuxtjs/color-mode",
    ],
})
