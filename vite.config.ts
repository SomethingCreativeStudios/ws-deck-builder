import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '~components': path.resolve(__dirname, 'src/components'),
      '~composables': path.resolve(__dirname, 'src/composables'),
    },
  },
  build: {
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'WSDeckBuilder',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
