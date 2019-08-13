import Vue, { PluginObject } from 'vue';
import InputNumber from './src/input-number.vue'

const ByInputNumber: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-input-number', InputNumber);
    }
}
export default ByInputNumber
