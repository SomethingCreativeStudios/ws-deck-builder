import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { getAliases } from "vite-aliases";
import path from "path";

const aliases = getAliases({ prefix: "~" });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: aliases,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "WSDeckBuilder",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue", "prime-vue", './dist/style.css'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
