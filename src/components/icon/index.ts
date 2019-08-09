import Vue, { PluginObject } from 'vue';
import Icon from './src/icon.vue'

const IconComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-icon', Icon);
    }
}
export default IconComponent
