import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
   css: {
      preprocessorOptions: {
         scss: {
            additionalData: `@use "/src/App.scss";`,
         },
      },
   },
   server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000', // Адрес вашего Django-сервера
                changeOrigin: true,
            },
        },
    },
});
