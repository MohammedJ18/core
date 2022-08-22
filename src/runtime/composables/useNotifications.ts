import { acceptHMRUpdate, defineStore } from "pinia";
import { useSupabaseClient, useNuxtApp, useUser } from '#imports'

type Notification = {
    user_id: String,
    app_id: Number,
    datas: Object,
    message: String,
    title: String,
    dates: Date,
}

export const useNotifications = defineStore("notifications-store", {
    state: () => ({
        data: null,
        notifications: []
    }),

    getters: {
        getNotificationsObject: state => state.data,
        getNotifications: state => state.notifications
    },

    actions: {
        join() {
            const supabase = useSupabaseClient()
            const notifications = supabase
                .from('notifications')
                .on('INSERT', payload => this.recieveNotification(payload.new))
                .subscribe(async (state) => {
                    // if (state === 'SUBSCRIBED') {
                        // now you can start broadcasting messages
                        // sending a new message every second
                        // setInterval(async () => {
                        //   const status = await channel.send({
                        //     type: 'broadcast',
                        //     event: 'location',
                        //     payload: { x: Math.random(), y: Math.random() },
                        //   })
                        //   console.log(state)
                        // }, 1000)
                    // }
                })
            
            notifications
                
            this.data = notifications
            this.fetch()
        },

        async fetch() {
            const supabase = useSupabaseClient()
            let { data: notifications, error } = await supabase
                .from('notifications')
                .select('*')
                .limit(10)
                .lte('dates', new Date().toISOString())
                .order('id', { ascending: false })

            this.notifications = notifications
        },
        
        recieveNotification(newNotification){
            // this.notifications.unshift(newNotification)
            const { $toast } = useNuxtApp()
            $toast.info('تلقيت اشعار')
            this.fetch()
        },

        async sendNotification(notification: Notification){
            const user = useUser()
            const supabase = useSupabaseClient()

            let { data, error } = await supabase.rpc('sendNotification', notification)
            return data || error
        }
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useNotifications, import.meta.hot));
}