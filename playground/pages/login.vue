<template>
    <div class="container" style="padding: 50px 0 100px 0">
        <Account v-if="user" />
        <Auth v-else />
    </div>
</template>

<script setup>
import { guest, useRouter } from '#imports'

definePageMeta({
    middleware: guest
})

const supabase = useSupabaseClient()

const user = useUser();
const router = useRouter()

user.value = useSupabaseUser()
supabase.auth.onAuthStateChange((_, session) => {
    user.value = session?.user
    if (_ == 'SIGNED_IN') router.push('/')
})

const somedata = await supabase.from('profiles').select('username, id')

</script>