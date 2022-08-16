<template>
  <div>
    <!-- <UiHeader :tabs="tabs" position="absolute" left="0" /> -->
    <slot />
  </div>
</template>


<script setup>
import { useRouter, useRoute, useHead } from '#imports'


const route = useRoute();

useHead({
  titleTemplate: () => {
    return route.meta.title ? `${route.meta.title} · Enab` : "Enab";
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
  charset: "utf-8",
  meta: [{ name: "description", content: "My amazing site." }],
  bodyAttrs: {
    // class:
    // "m-0 p-0 overflow-hidden font-sans h-screen w-screen bg-gray-50 dark:bg-secondary-800",
    dir: "rtl",
    // oncontextmenu: "return false",

  },
  htmlAttrs: {
    lang: "ar",
  },
});
</script>

<style>
::-webkit-scrollbar {
  width: 10px;
}
  ::-webkit-scrollbar-track {
  background: rgba(0,0,0, 0); 
  border-radius: 1rem;

}
  ::-webkit-scrollbar-thumb {
    background: rgba(255,255,255, .3); 
    border-radius:10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255, .5); 
} 
</style>

