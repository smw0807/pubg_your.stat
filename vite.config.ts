import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import { visualizer } from 'rollup-plugin-visualizer';
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
  base: '/',
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
    visualizer({ open: true, filename: './dist/bundle-analysis.html' }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
  build: {
    // 파이어베이스 모듈 관련해서 빌드된 파일이 용량이 크다는 경로 떠서 적용...(내가 수정할 수 있는 사항이 아닌 듯 해서)
    chunkSizeWarningLimit: 2000,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
});
