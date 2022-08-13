import { acceptHMRUpdate, defineStore } from "pinia";
import App from "../classes/App"
import Widget from "../classes/Widget"
import { useSupabaseClient, useNuxtApp, useUser } from '#imports'

export const useAppManager = defineStore("app-manager", {
    state: () => ({
        focused: "",
        apps: [],
    }),

    getters: {
        getApps: state => state.apps,
        getOwned: (state) => state.apps.filter(app => app.owned || app.core),
        // isRunning: (state) => (app) => state.all.find(a => a.title === app.title).running,
        getApp: state => id => state.apps.find(app => app.id === id),
        getRunningApps: (state) => state.apps.filter(app => app.running),
        getFocused: (state) => state.apps.find(app => app.id == state.focused),
        anyRunningIsMaximized: (state) => state.apps.some(app => app.maximized && app.running && !app.minimized),
    },

    actions: {
        async fetch(){
            const { $toast } = useNuxtApp()
            const supabase = useSupabaseClient()
            let { data: apps, error } = await supabase
                .from('apps')
                .select('*, users_apps(id)')

            if (error){ $toast.error('حدث خطأ اثناء تحميل التطبيقات'); return false }
            this.apps = apps.map(app => new App(app))
        },
        setFocus(id){
            this.focused = id;
        },
        addApp(app){
            // this.apps.push(new App({ id:this.apps.length+1, ...app}));
        },
        async buy(app_id){
            const { $toast } = useNuxtApp()
            const supabase = useSupabaseClient()
            const user = useUser()
            let { data, error } = await supabase
                .rpc('buyApp', {
                    _app_id: app_id,
                    _user_id: user.value.id
                })
            if (error){ $toast.error('حدث خطأ اثناء شراء التطبيق'); return false }
            if (!data) { $toast.error('حدث خطأ اثناء شراء التطبيق'); return false }
        }
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAppManager, import.meta.hot));
}