// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        // Ignorer les fichiers PocketBase pour éviter les refresh en boucle
        ignored: ['**/backend/pb/**', '**/pb_data/**', '**/*.db', '**/*.db-*']
      }
    }
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
});
