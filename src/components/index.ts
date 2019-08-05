import Vue, { PluginObject } from 'vue';

import Button from './button/src/button.vue'
import Tag from './tag/src/tag.vue'

const Components: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-button', Button);
        Vue.component('by-tag', Tag);
    }
}

Vue.use(Components);
