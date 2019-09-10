import Vue, { PluginObject } from 'vue';
import Switch from './src/switch.vue'

const SwitchComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-switch', Switch);
    }
}
export default SwitchComponent
