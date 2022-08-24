import { acceptHMRUpdate, defineStore } from "pinia";
import App from "../classes/App"
import Widget from "../classes/Widget"
import { useSupabaseClient, useNuxtApp, useUser } from '#imports'

export const useUserProfile = defineStore("user-profile", {
    state: () => ({
        data: null
    }),

    getters: {
        getProfile: state => state.data,
        getUsername: state => state.data?.username
    },

    actions: {
        async fetch(){
            const supabase = useSupabaseClient()
            const user = useUser()
            const { data, error } = await supabase.from('profiles').select('*').eq('id', user.value.id).single()
            if (error) {
                const { $toast } = useNuxtApp()
                $toast.error('حدث خطأ اثناء تحميل الملف الشخصي')
                return;
            }

            if (data){
                this.data = data
            }
        },

        async updateUsername(username) {
            const supabase = useSupabaseClient()
            const user = useUser()

            const { data, error } = await supabase.from('profiles').update({
                username: username
            }).match({ id: user.value.id})

            if (error) {
                const { $toast } = useNuxtApp()
                $toast.error('حدث خطأ اثناء تحديث الأسم')
                return;
            }
        },

        async updateProfile(properties) {
            const supabase = useSupabaseClient()
            const user = useUser()

            const { data, error } = await supabase.from('profiles').update(properties).match({ id: user.value.id})

            if (error) {
                const { $toast } = useNuxtApp()
                $toast.error('حدث خطأ اثناء تحديث الملف الشخصي')
                return;
            }
        },
        async logout(){
            const supabase = useSupabaseClient()
            const { error } = await supabase.auth.signOut()
        }
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserProfile, import.meta.hot));
}