import { defineNuxtPlugin } from '#app'
import Toast, { PluginOptions, useToast, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
  timeout: 2500,
  rtl: true,
  position: POSITION.TOP_CENTER,
  maxToasts: 5,
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options);

  return {
    provide: {
      toast: useToast()
    }
  }
})

// https://github.com/Maronato/vue-toastification#installation