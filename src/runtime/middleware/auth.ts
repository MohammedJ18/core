import { defineNuxtRouteMiddleware, useSupabaseUser } from '#imports'

export default defineNuxtRouteMiddleware((to, _from) => {
    console.log('auth middleware')
    const user = useSupabaseUser()

    if (!user.value) {
      return navigateTo('/login')
    }
  })
  