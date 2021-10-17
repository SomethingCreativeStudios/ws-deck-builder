import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/luna-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import * as MainComponents from './components';

const app = createApp(App);

app.use(PrimeVue);

const toKebab = (string: string) =>
  string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

Object.entries(MainComponents).forEach(([name, value]) => {
  console.log('Loading', toKebab(name));

  app.component(toKebab(name), value);
});

app.mount('#app');
