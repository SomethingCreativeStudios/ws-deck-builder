import * as components from './components';
import { useDeckList, useSearch } from './composables';
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/luna-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const WsDeckBuilder = {
  // @ts-ignore
  install(Vue, options = {}) {
    Vue.use(PrimeVue);

    // components
    for (const componentName in components) {
      // @ts-ignore
      const component = components[componentName];

      console.log('Loading', component.name);

      Vue.component(component.name, component);
    }
  },
};

export { WsDeckBuilder, useDeckList, useSearch };
