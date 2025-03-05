import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
// import { VitePWA } from "vite-plugin-pwa";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // VitePWA({
    //   strategies: "injectManifest",
    //   srcDir: "public",
    //   filename: "sw.js",
    //   registerType: "autoUpdate",
    //   // includeAssets: [
    //   //   "favicon.ico",
    //   //   "apple-touch-icon-180x180.png",
    //   //   "mask-icon.svg",
    //   // ],
    //   manifest: {
    //     name: "TreatYourDate",
    //     short_name: "TYD",
    //     description: "Connect with food lovers and share meals",
    //     theme_color: "#ffffff",
    //     background_color: "#ffffff",
    //     display: "standalone",
    //     start_url: "/",
    //     orientation: "portrait", // 👈 Lock to portrait mode
    //     icons: [
    //       {
    //         src: "pwa-64x64.png",
    //         sizes: "64x64",
    //         type: "image/png",
    //       },
    //       {
    //         src: "pwa-192x192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //       {
    //         src: "pwa-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "pwa-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //         purpose: "any maskable",
    //       },
    //       {
    //         src: "maskable-icon-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //         purpose: "maskable",
    //       },
    //     ],
    //     // shortcuts: [
    //     //   {
    //     //     name: "Home",
    //     //     url: "/",
    //     //     icons: [{ src: "/pwa-192x192.png", sizes: "192x192" }],
    //     //   },
    //     // ],
    //     // protocol_handlers: [
    //     //   {
    //     //     protocol: "web+treatyourdate",
    //     //     url: "/%s",
    //     //   },
    //     // ],
    //     // categories: ["food", "social"],
    //     // prefer_related_applications: false,
    //   },
    //   workbox: {
    //     globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    //     runtimeCaching: [
    //       {
    //         urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
    //         handler: "NetworkFirst",
    //         options: {
    //           cacheName: "supabase-cache",
    //           expiration: {
    //             maxEntries: 50,
    //             maxAgeSeconds: 60 * 60 * 24, // 24 hours
    //           },
    //         },
    //       },
    //     ],
    //   },
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "./",
});
