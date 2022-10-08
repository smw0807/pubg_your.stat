import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __APP_ENV__: env.APP_ENV,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  publicDir: './src/public',
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
});
