import { fileURLToPath, URL } from 'node:url'
import postCssPxToRem from 'postcss-pxtorem'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "PWA",
        description: "PWA示例",
        theme_color: "#00bd7e",
        icons: [
          {
            src: "/src/assets/img/demo2.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      shortcuts: [
        {
          name: "Open About",
          short_name: "About",
          description: "Open the about page",
          url: "/about",
          icons: [{ src: "/src/assets/img/demo2.png", sizes: "192x192" }],
        },
      ],
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5,
          propList: ['*'],
        })
      ]
    }
  }
})
