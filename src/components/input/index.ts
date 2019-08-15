import Vue, { PluginObject } from 'vue';
import Input from './src/input.vue'

const InputComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-input', Input);
    }
}
export default InputComponent
