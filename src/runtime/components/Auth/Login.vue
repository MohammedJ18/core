<template>
    <div flex="~ col gap-8px" items="center" justify="center" h="292px" m="t-32px">
        <!-- <UiInput w="276px" placeholder="الأسم الثلاثي" /> -->
        <div flex="~ col gap-8px" w="276px">
            <button @click="googleLogin()" cursor="pointer" position="relative" un-text="xl" border="rounded-5px" p="14px" bg="primaryOp dark:primary">
                Google
                <div position="absolute" top="16px" left="24px" w="22px" h="22px" un-text="primary dark:primaryOp" :class="[loading.google ? 'i-line-md-loading-twotone-loop' : 'i-akar-icons-google-fill']"></div>
            </button>
            <!-- <button cursor="pointer" position="relative" un-text="xl" border="rounded-5px" p="14px" bg="primaryOp dark:primary">
                Facebook
                <div position="absolute" top="16px" left="24px" w="22px" h="22px" un-text="primary dark:primaryOp" class="i-brandico-facebook"></div>
            </button> -->
        </div>
    </div>
</template>

<script setup>
import { useSupabaseClient, useSupabaseUser, useUser, reactive, useRouter } from '#imports'

const user = useUser();
const router = useRouter();
const supabase = useSupabaseClient()
const loading = reactive({
    google: false,
})


const googleLogin = async () => {
    loading.google = true
    const { user, session, error } = await supabase.auth.signIn({
        provider: 'google',
    }, {
        redirectTo: import.meta.env.VITE_ENV ? 'https://development.enab.app' : ( import.meta.env.VITE_PRODUCTION ? 'https://enab.app' : 'http://localhost:3000' ),
    })
}

user.value = useSupabaseUser()
supabase.auth.onAuthStateChange((_, session) => {
    user.value = session?.user
    if (user.value) router.push('/')
})
</script>