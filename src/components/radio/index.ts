import Vue, { PluginObject } from 'vue';
import Radio from './src/radio.vue'

const InputComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-radio', Radio);
    }
}
export default Radio
