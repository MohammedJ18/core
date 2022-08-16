<template>
  <NuxtLayout name="desktop">
    <div @click="appManager.setFocus('')" flex="~" w="full" h="full" items="start" justify="between">
      <!-- Desktop Applications & Icons -->
      <div min-w="1/4" grid="~ cols-4 auto-rows-min" m="70px">
          <div v-if="appManager.getOwned.length <= 0" h="64px" w="64px" class="i-line-md-loading-twotone-loop"></div>
          <div v-for="component in appManager.getOwned" :key="'app-' + component.id">
            <UiDesktopIcon :app="component" />

            <!-- <Teleport to="#openedwindows"> -->
              <!-- Application -->

              <!-- Application Sub Applications -->
              <!-- <div v-for="subComponent in component?.subApps" :key="component.id + '-sub-' + subComponent.id">
                <component :app="subComponent" :is="`${component.name}Apps${subComponent.name}`"></component>
              </div> -->
            <!-- </Teleport> -->

            <!-- Application Widget -->
            <!-- <Teleport to='#widgets'> -->
              <!-- <TransitionGroup>
                <component v-for="widget in component?.widgets" :key="'widget-' + widget.id" :widget="widget" :is="`${component.name}Widgets${widget.name}`"></component>
              </TransitionGroup> -->
            <!-- </Teleport> -->
          </div>
      </div>


        <TransitionGroup name="window">
          <div v-for="component in appManager.getRunningApps" :key="'app-' + component.id">
            <component :app="component" :is="component.name" :key="'app-component-' + component.id"></component>
          </div>
        </TransitionGroup>


      <!-- Desktop Widgets -->
      <!-- <div min-w="1/4" @click="appManager.setFocus('')" flex="~" h="h-minus-bottombar" items="center" justify="center">
        <div w="full" overflow-y="scroll" h="minus-bottombar">
          <div id="widgets" p="y-4" flex="~ col gap-2"></div>
        </div>
      </div> -->
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useAppManager } from '../composables/useAppManager';
import { useUserProfile } from '../composables/useUserProfile';
import { auth } from '../middleware/auth'



definePageMeta({
  title: "Home",
  middleware: auth
});

const appManager = useAppManager();
const userProfile = useUserProfile();
appManager.fetch()
userProfile.fetch()

// appManager.buyApp(3)
// console.log(appManager.getCoreApps)
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


.window-enter-active {
  transition: all 0.3s ease-out;
}

.window-leave-active {
  transition: all 0.3s ease-in;
}

.window-enter-from,
.window-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
</style>