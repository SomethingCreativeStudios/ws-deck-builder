import Vue from 'vue';
import TestComponent from './components/HelloWorld.vue';

const plugin = {
  install: (vue: typeof Vue, {}) => {
    console.log('Loading');
    vue.component('test-component', TestComponent);
  },
} as Vue.PluginObject<any>;

export default plugin;
