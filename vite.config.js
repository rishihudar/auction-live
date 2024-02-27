import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginCompression from "vite-plugin-compression";
import svgLoader from 'vite-svg-loader';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: process.env.NODE_ENV =  "/auction/" ,
  base: process.env.NODE_ENV = "/auction/",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      analyzerMode: "disabled",
    },
  },
  plugins: [vue(), vitePluginCompression(), svgLoader()],
  build: {
    minify: "terser",
    terserOptions: {
      ecma: undefined,
      warnings: false,
      parse: {},
      compress: {},
      mangle: true,
      module: false,
      output: {
        comments: false,
      },
      toplevel: false,
      nameCache: null,
      ie8: false,
      keep_classnames: undefined,
      keep_fnames: false,
      safari10: false,
    },
    sourcemap: true,
  },
  server: {
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
        // target: "http://localhost:8082",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/cdn-server/, ""),
      },

      '/ups-server/o/': {
        target: 'http://localhost:5000/o/',
        changeOrigin: true,
        pathRewrite: {
          '^/ups-server/o/': ''
        }
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
      
    },
  },
});
