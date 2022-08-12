<template>
  <NuxtLayout name="desktop">
    <div @click="appManager.setFocus('')" flex="~" w="full" h="full" items="start" justify="between">
      <!-- Desktop Applications & Icons -->
      <div min-w="1/4" grid="~ cols-4 auto-rows-min" m="70px">
        <ClientOnly>
          <div v-for="component in appManager.getOwned" :key="'app-' + component.id">
            <UiDesktopIcon :app="component" />

            <Teleport to="#openedwindows">
              <!-- Application -->
              <component :app="component" :is="component.name" :key="'app-component-' + component.id"></component>

              <!-- Application Sub Applications -->
              <div v-for="subComponent in component?.subApps" :key="component.id + '-sub-' + subComponent.id">
                <component :app="subComponent" :is="`${component.name}Apps${subComponent.name}`"></component>
              </div>
            </Teleport>

            <!-- Application Widget -->
            <Teleport to='#widgets'>
              <TransitionGroup>
                <component v-for="widget in component?.widgets" :key="'widget-' + widget.id" :widget="widget" :is="`${component.name}Widgets${widget.name}`"></component>
              </TransitionGroup>
            </Teleport>
          </div>
        </ClientOnly>
      </div>


      <!-- Desktop Widgets -->
      <div min-w="1/4" @click="appManager.setFocus('')" flex="~" h="h-minus-bottombar" items="center" justify="center">
        <div w="full" overflow-y="scroll" h="minus-bottombar">
          <div id="widgets" p="y-4" flex="~ col gap-2"></div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useAppManager } from '../composables/useAppManager';
import { auth } from '../middleware/auth'
import { useRouter, useUser, useSupabaseUser } from '#imports'

definePageMeta({
  title: "Home",
  middleware: auth
});


const appManager = useAppManager();

const user = useUser()
const supabase = useSupabaseClient()
const router = useRouter()

user.value = useSupabaseUser()
supabase.auth.onAuthStateChange((_, session) => {
    user.value = session?.user
    if (user.value) router.push('/')
})
</script>


<style scoped>
/* CLOSE TRANSITION */
.v-enter-active {
  animation: bounce-in 0.3s;
}
.v-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>