import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useSupabaseUser } from '#imports'

export const guest = defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()
  if (user.value) {
    return navigateTo('/')
  }
})
  