import Vue, { PluginObject } from 'vue';
import RadioButton from '../radio/src/radio-button.vue'

const InputComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-radio-button', RadioButton);
    }
}
export default RadioButton
