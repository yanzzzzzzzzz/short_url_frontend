import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import "primeflex/primeflex.css";
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Tooltip from 'primevue/tooltip';

const app = createApp(App);
app.directive('tooltip', Tooltip);
app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.mount('#app');
