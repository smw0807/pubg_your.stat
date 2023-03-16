import { createApp } from 'vue';
// import './style.css';
import App from './App.vue';

import { setupRouter } from '@/routes';
import { createPinia } from 'pinia';
import { setupElementPlus, /*setupPinia,*/ setupZoomer, setupTimeago } from '@/plugins';

const app = createApp(App);
setupRouter(app); //vue-router apply
setupElementPlus(app); //element plus apply
// setupPinia(app); //pinia apply
createPinia();
setupZoomer(app); //vue-zoomer apply
setupTimeago(app);
app.mount('#app');
