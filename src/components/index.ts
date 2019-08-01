import Vue, { PluginObject } from 'vue';

import Button from './button/src/button.vue'

const Components: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-button', Button);
    }
}

Vue.use(Components);
