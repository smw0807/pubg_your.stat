import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import { defineConfig, loadEnv } from 'vite';
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
  plugins: [
    vue(),
    Pages({
      // dirs: 'src/views', //이거 없으면 src/pages를 기본값으로 사용함
      // extensions: ['vue'],
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default',
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
});
