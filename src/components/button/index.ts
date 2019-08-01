import Vue, { PluginObject } from 'vue';
import Button from './src/button.vue'

const ButtonComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-button', Button);
    }
}
export default ButtonComponent
