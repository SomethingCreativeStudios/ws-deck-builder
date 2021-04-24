import Vue from 'vue';
import TestComponent from './components/HelloWorld.vue';
import { WSDeckSearch } from './components';
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';

const plugin = {
  install: (vue: typeof Vue, {}) => {
    console.log('Loading');
    vue.component('test-component', TestComponent);
    vue.component('ws-deck-search', WSDeckSearch);
    vue.use(vuetify);

    console.log(WSDeckSearch);
  },
} as Vue.PluginObject<any>;

export default plugin;
