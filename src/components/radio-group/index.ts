import Vue, { PluginObject } from 'vue';
import RadioGroup from '../radio/src/radio-group.vue'

const InputComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-radio-group', RadioGroup);
    }
}
export default RadioGroup
