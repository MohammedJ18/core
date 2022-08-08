import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'
import path from "path";
import * as fs from 'fs';


export interface ModuleOptions {
  // addPlugin: boolean,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'module-starter',
    configKey: 'moduleStarter'
  },
  defaults: {
    // addPlugin: true,
  },
  setup (options, nuxt) {
    // if (options.addPlugin) {}
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    addPlugin(resolve(runtimeDir, 'plugin'))

    // Components Hooks
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: resolve(runtimeDir, 'components'),
        global: true
      })
    })

    // Auto Imports Hooks
    nuxt.hook('autoImports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
      dirs.push(resolve(runtimeDir, 'classes'))
    })

    // Layouts
    nuxt.hook('app:templates', (app) => {
      fs.readdir(resolve(runtimeDir, 'layouts'), function (err, layouts) {
        layouts.forEach((file) => {
          const name = path.parse(file).name
          app.layouts[name] = {
            file: resolve(runtimeDir, `layouts/${file}`),
            name: name
          }
        });
      });
    })



    // Pages (Desktop Page)
    nuxt.hook('pages:extend', (pages) => {
      pages.push({
        path: '/',
        file: resolve(runtimeDir, 'pages/index.vue'),
      })
    })

  }
})
