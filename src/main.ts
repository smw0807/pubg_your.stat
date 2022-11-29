import { createApp } from 'vue';
// import './style.css';
import App from './App.vue';

import { setupRouter } from './routes';
import { setupElementPlus } from './plugins/ElementPlus';
import { setupPinia } from './plugins/Pinia';

const app = createApp(App);
setupRouter(app); //vue-router apply
setupElementPlus(app); //element plus apply
setupPinia(app); //pinia apply
app.mount('#app');
