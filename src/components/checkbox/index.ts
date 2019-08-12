import Vue, { PluginObject } from 'vue';
import CheckBox from './src/checkbox.vue'

const ByCheckbox: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-checkbox', CheckBox);
    }
}
export default ByCheckbox
