// vite.config.js
import { defineConfig } from "file:///D:/acution-live/auction-server/auction-live/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/acution-live/auction-server/auction-live/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vitePluginCompression from "file:///D:/acution-live/auction-server/auction-live/node_modules/vite-plugin-compression/dist/index.mjs";
import svgLoader from "file:///D:/acution-live/auction-server/auction-live/node_modules/vite-svg-loader/index.js";
import path from "path";
var __vite_injected_original_dirname = "D:\\acution-live\\auction-server\\auction-live";
var vite_config_default = defineConfig({
  publicDir: process.env.NODE_ENV = "/auction/",
  base: process.env.NODE_ENV = "/auction/",
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      analyzerMode: "disabled"
    }
  },
  plugins: [vue(), vitePluginCompression(), svgLoader()],
  build: {
    minify: "terser",
    terserOptions: {
      ecma: void 0,
      warnings: false,
      parse: {},
      compress: {},
      mangle: true,
      module: false,
      output: {
        comments: false
      },
      toplevel: false,
      nameCache: null,
      ie8: false,
      keep_classnames: void 0,
      keep_fnames: false,
      safari10: false
    },
    sourcemap: true
  },
  server: {
    port: 8080,
    proxy: {
      "/core-server": {
        target: "https://cs.mkcl.org/2ZnbEg2SCTvOZwAFylfCVFdMOlz",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/core-server/, "")
      },
      "/cdn-server": {
        target: "https://testcdncs.mkcl.org",
        // target: "http://localhost:8082",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/cdn-server/, "")
      },
      "/ups-server/o/": {
        target: "http://localhost:5000/o/",
        changeOrigin: true,
        pathRewrite: {
          "^/ups-server/o/": ""
        }
      },
      "/login-server": {
        target: "https://cs.mkcl.org/2ZnbxLhWpB5qU6xyCW7sZPKiEvS",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/login-server/, "")
      },
      "/bidder-server": {
        target: "https://cs.mkcl.org/2cUZevMMg8meDuqpPlC5Ua2VE8D",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/bidder-server/, "")
      },
      "/management-server": {
        target: "https://cs.mkcl.org/2ZncVDPZRGYZwwteYYbB3aw4fr7",
        ws: true,
        secure: false,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/management-server/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxhY3V0aW9uLWxpdmVcXFxcYXVjdGlvbi1zZXJ2ZXJcXFxcYXVjdGlvbi1saXZlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxhY3V0aW9uLWxpdmVcXFxcYXVjdGlvbi1zZXJ2ZXJcXFxcYXVjdGlvbi1saXZlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9hY3V0aW9uLWxpdmUvYXVjdGlvbi1zZXJ2ZXIvYXVjdGlvbi1saXZlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB2aXRlUGx1Z2luQ29tcHJlc3Npb24gZnJvbSBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uXCI7XHJcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSAndml0ZS1zdmctbG9hZGVyJztcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcHVibGljRGlyOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9ICBcIi9hdWN0aW9uL1wiICxcclxuICBiYXNlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9IFwiL2F1Y3Rpb24vXCIsXHJcblxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjaGFpbldlYnBhY2s6IChjb25maWcpID0+IHtcclxuICAgIGNvbmZpZy5wbHVnaW5zLmRlbGV0ZShcInByZWZldGNoXCIpO1xyXG4gIH0sXHJcbiAgcGx1Z2luT3B0aW9uczoge1xyXG4gICAgd2VicGFja0J1bmRsZUFuYWx5emVyOiB7XHJcbiAgICAgIGFuYWx5emVyTW9kZTogXCJkaXNhYmxlZFwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFt2dWUoKSwgdml0ZVBsdWdpbkNvbXByZXNzaW9uKCksIHN2Z0xvYWRlcigpXSxcclxuICBidWlsZDoge1xyXG4gICAgbWluaWZ5OiBcInRlcnNlclwiLFxyXG4gICAgdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICBlY21hOiB1bmRlZmluZWQsXHJcbiAgICAgIHdhcm5pbmdzOiBmYWxzZSxcclxuICAgICAgcGFyc2U6IHt9LFxyXG4gICAgICBjb21wcmVzczoge30sXHJcbiAgICAgIG1hbmdsZTogdHJ1ZSxcclxuICAgICAgbW9kdWxlOiBmYWxzZSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgY29tbWVudHM6IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgICB0b3BsZXZlbDogZmFsc2UsXHJcbiAgICAgIG5hbWVDYWNoZTogbnVsbCxcclxuICAgICAgaWU4OiBmYWxzZSxcclxuICAgICAga2VlcF9jbGFzc25hbWVzOiB1bmRlZmluZWQsXHJcbiAgICAgIGtlZXBfZm5hbWVzOiBmYWxzZSxcclxuICAgICAgc2FmYXJpMTA6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogODA4MCxcclxuICAgIHByb3h5OiB7XHJcbiAgICAgIFwiL2NvcmUtc2VydmVyXCI6IHtcclxuICAgICAgICB0YXJnZXQ6IFwiaHR0cHM6Ly9jcy5ta2NsLm9yZy8yWm5iRWcyU0NUdk9ad0FGeWxmQ1ZGZE1PbHpcIixcclxuICAgICAgICB3czogdHJ1ZSxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICByZXdyaXRlOiAocCkgPT4gcC5yZXBsYWNlKC9eXFwvY29yZS1zZXJ2ZXIvLCBcIlwiKSxcclxuICAgICAgfSxcclxuICAgICAgXCIvY2RuLXNlcnZlclwiOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBcImh0dHBzOi8vdGVzdGNkbmNzLm1rY2wub3JnXCIsXHJcbiAgICAgICAgLy8gdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MlwiLFxyXG4gICAgICAgIHdzOiB0cnVlLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHJld3JpdGU6IChwKSA9PiBwLnJlcGxhY2UoL15cXC9jZG4tc2VydmVyLywgXCJcIiksXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAnL3Vwcy1zZXJ2ZXIvby8nOiB7XHJcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo1MDAwL28vJyxcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgcGF0aFJld3JpdGU6IHtcclxuICAgICAgICAgICdeL3Vwcy1zZXJ2ZXIvby8nOiAnJ1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXCIvbG9naW4tc2VydmVyXCI6IHtcclxuICAgICAgICB0YXJnZXQ6IFwiaHR0cHM6Ly9jcy5ta2NsLm9yZy8yWm5ieExoV3BCNXFVNnh5Q1c3c1pQS2lFdlNcIixcclxuICAgICAgICB3czogdHJ1ZSxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICByZXdyaXRlOiAocCkgPT4gcC5yZXBsYWNlKC9eXFwvbG9naW4tc2VydmVyLywgXCJcIiksXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiL2JpZGRlci1zZXJ2ZXJcIjoge1xyXG4gICAgICAgIHRhcmdldDogXCJodHRwczovL2NzLm1rY2wub3JnLzJjVVpldk1NZzhtZUR1cXBQbEM1VWEyVkU4RFwiLFxyXG4gICAgICAgIHdzOiB0cnVlLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHJld3JpdGU6IChwKSA9PiBwLnJlcGxhY2UoL15cXC9iaWRkZXItc2VydmVyLywgXCJcIiksXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiL21hbmFnZW1lbnQtc2VydmVyXCI6IHtcclxuICAgICAgICB0YXJnZXQ6IFwiaHR0cHM6Ly9jcy5ta2NsLm9yZy8yWm5jVkRQWlJHWVp3d3RlWVliQjNhdzRmcjdcIixcclxuICAgICAgICB3czogdHJ1ZSxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICByZXdyaXRlOiAocCkgPT4gcC5yZXBsYWNlKC9eXFwvbWFuYWdlbWVudC1zZXJ2ZXIvLCBcIlwiKSxcclxuICAgICAgfSxcclxuICAgICAgXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJULFNBQVMsb0JBQW9CO0FBQ3hWLE9BQU8sU0FBUztBQUNoQixPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLGVBQWU7QUFDdEIsT0FBTyxVQUFVO0FBSmpCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFdBQVcsUUFBUSxJQUFJLFdBQVk7QUFBQSxFQUNuQyxNQUFNLFFBQVEsSUFBSSxXQUFXO0FBQUEsRUFFN0IsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQ3BDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsY0FBYyxDQUFDLFdBQVc7QUFDeEIsV0FBTyxRQUFRLE9BQU8sVUFBVTtBQUFBLEVBQ2xDO0FBQUEsRUFDQSxlQUFlO0FBQUEsSUFDYix1QkFBdUI7QUFBQSxNQUNyQixjQUFjO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsSUFBSSxHQUFHLHNCQUFzQixHQUFHLFVBQVUsQ0FBQztBQUFBLEVBQ3JELE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLE9BQU8sQ0FBQztBQUFBLE1BQ1IsVUFBVSxDQUFDO0FBQUEsTUFDWCxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsUUFDTixVQUFVO0FBQUEsTUFDWjtBQUFBLE1BQ0EsVUFBVTtBQUFBLE1BQ1YsV0FBVztBQUFBLE1BQ1gsS0FBSztBQUFBLE1BQ0wsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxnQkFBZ0I7QUFBQSxRQUNkLFFBQVE7QUFBQSxRQUNSLElBQUk7QUFBQSxRQUNKLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxrQkFBa0IsRUFBRTtBQUFBLE1BQ2hEO0FBQUEsTUFDQSxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUE7QUFBQSxRQUVSLElBQUk7QUFBQSxRQUNKLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxpQkFBaUIsRUFBRTtBQUFBLE1BQy9DO0FBQUEsTUFFQSxrQkFBa0I7QUFBQSxRQUNoQixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxhQUFhO0FBQUEsVUFDWCxtQkFBbUI7QUFBQSxRQUNyQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGlCQUFpQjtBQUFBLFFBQ2YsUUFBUTtBQUFBLFFBQ1IsSUFBSTtBQUFBLFFBQ0osUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLG1CQUFtQixFQUFFO0FBQUEsTUFDakQ7QUFBQSxNQUNBLGtCQUFrQjtBQUFBLFFBQ2hCLFFBQVE7QUFBQSxRQUNSLElBQUk7QUFBQSxRQUNKLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxvQkFBb0IsRUFBRTtBQUFBLE1BQ2xEO0FBQUEsTUFDQSxzQkFBc0I7QUFBQSxRQUNwQixRQUFRO0FBQUEsUUFDUixJQUFJO0FBQUEsUUFDSixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsd0JBQXdCLEVBQUU7QUFBQSxNQUN0RDtBQUFBLElBRUY7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
