import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginCompression from "vite-plugin-compression";
import svgLoader from 'vite-svg-loader';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: process.env.NODE_ENV === "production" ? "/app/" : "",
  base: process.env.NODE_ENV === "production" ? "/app/" : "",

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
      "/server": {
        target: "https://cs.mkcl.org/1JFfwe3g8vHuNOtxk2BsH09pBA5",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/server/, ""),
      },
      "/cdnserver": {
        // target: "https://testcdncs.mkcl.org",
        target: "http://localhost:3032",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/cdnserver/, ""),
      },
    },
  },
});
