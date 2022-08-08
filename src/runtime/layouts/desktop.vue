<template>
  <div class="bg-default" position="relative" h="screen" flex="~ col" w="screen">
    <div id="openedwindows"></div>
    <!-- class="backdrop-blur-2xl" -->
    <div flex="grow">
      <slot />
    </div>

    <!-- Bottom Bar -->
    <Transition>
      <BottomBar />
    </Transition>
  </div>
</template>

<script setup>
const [state, toggle] = useToggle(false);
const route = useRoute();

const appManager = useAppManager()


const { x, y, sourceType } = useMouse()
const { width, height } = useWindowSize()

// const anyRunningIsMaximized = computed(() => appsStore.anyRunningIsMaximized)
// const positionBottom = computed(() => height.value - y.value <= 75)

// onKeyStroke(['Escape'], (e) => {
//   // e.ctrlKey
//   // e.shiftKey
//   // e.altKey
//   appsStore.closeWindow();
//   e.preventDefault()
// })

useHead({
  meta: [
    {
      name: "og:title",
      content: route.meta.title ? `${route.meta.title} · Enab` : "Enab",
    },
  ],
});
</script>


<style scoped>
.v-enter-active {
  animation: bounce-in 0.3s;
}
.v-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    /* bottom: -15px; */
    transform: translateY(100px);
  }
}


.bg-default {
  background-image: url('https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'); 
  /* background-image: url('imgs/bg.jpg'); */
  background-color: #999;
  
  /* background-size: cover; */
  background-size: cover;
  /* background-position: 100% 180%; */

/* animation: lightMove 5s infinite; */
}

</style>