import { defineNuxtRouteMiddleware, navigateTo, useAsyncData } from '#app'
import { useSupabaseUser } from '#imports'

export const guest = defineNuxtRouteMiddleware((to, _from) => {
  const { data: user } = useAsyncData( 'user_data', () => useSupabaseUser(), { initialCache: true } )
  if (user.value) {
    return navigateTo('/')
  }
})
  