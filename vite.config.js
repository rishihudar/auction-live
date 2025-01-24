import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginCompression from "vite-plugin-compression";
import svgLoader from 'vite-svg-loader';
import path from "path";
import packageInfo from './package.json';

export default defineConfig({
  publicDir: "/auction/",
  base: "/auction/",

  define: {
    __APP_VERSION__: JSON.stringify(packageInfo.version),
    __APP_VERSION_DATE__: JSON.stringify(packageInfo["version date"]),
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  plugins: [vue(), vitePluginCompression(), svgLoader()],

  build: {
    assetsInlineLimit: 0,
    minify: "terser",
    terserOptions: {
      compress: {},
      mangle: true,
      output: {
        comments: false,
      },
    },
    sourcemap: true,
  },

  server: {
    host: '0.0.0.0', // Listen on all interfaces
    port: 8080,
    proxy: {
      "/core-server": {
        target: "https://cs.mkcl.org/2ZnbEg2SCTvOZwAFylfCVFdMOlz",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/core-server/, ""),
      },
      "/cdn-server": {
        target: "https://testcdncs.mkcl.org",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/cdn-server/, ""),
      },
      '/ups-server/o/': {
        target: 'http://localhost:5000/o/',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/ups-server\/o/, "")
      },
      "/login-server": {
        target: "https://cs.mkcl.org/2ZnbxLhWpB5qU6xyCW7sZPKiEvS",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/login-server/, ""),
      },
      "/bidder-server": {
        target: "https://cs.mkcl.org/2cUZevMMg8meDuqpPlC5Ua2VE8D",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/bidder-server/, ""),
      },
      "/management-server": {
        target: "https://cs.mkcl.org/2ZncVDPZRGYZwwteYYbB3aw4fr7",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/management-server/, ""),
      },
      "/bidding-server-ws": {
        target: "ws://localhost:4700/",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/bidding-server-ws/, "")
      },
      "/bidding-server-http": {
        target: "http://localhost:4700/",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/bidding-server-http/, "")
      },
      "/upload-server": {
        target: "http://localhost:8001/",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/upload-server/, "")
      },
      "/notification-server": {
        target: "https://cs.mkcl.org/2hAwmxyTGxs6k0bMgWdECSJUoit",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/notification-server/, ""),
      },
      '/refundsettlement-server': {
        target: 'http://localhost:6002/',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/refundsettlement-server/, "")
      }
    },
  },
});
