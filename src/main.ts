import { createApp } from 'vue';
// import './style.css';
import App from './App.vue';

import { setupRouter } from './routes';
import { setupElementPlus } from './plugins/element-plus';

const app = createApp(App);
setupRouter(app); //vue-router apply
setupElementPlus(app); //element plus apply
app.mount('#app');
