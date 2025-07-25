import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Work Planner',
        short_name: 'WorkPlanner',
        description: 'Ein modernes Projektmanagement-Tool für den persönlichen Gebrauch',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/work-planner/',
        start_url: '/work-planner/',
        icons: [
          {
            src: '/work-planner/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/work-planner/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/work-planner/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  base: '/work-planner/'
})
