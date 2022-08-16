import { defineNuxtPlugin } from '#app'
import { useAppManager } from '../composables/useAppManager'

export default defineNuxtPlugin((nuxtApp) => {
    const appStore = useAppManager()
    // Settings App
    appStore.addApp({
        "name": "SettingsApp",
        "title": "الإعدادات",
        "icon": "i-ci-settings-filled",
        "size": "min-w-2xl min-h-2xl max-w-2xl max-h-2xl",
    })
})
