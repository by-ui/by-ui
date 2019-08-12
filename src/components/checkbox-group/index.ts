import Vue, { PluginObject } from 'vue';
import CheckBoxGroup from '../checkbox/src/by-checkbox-group.vue'

const ByCheckboxGroup: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-checkbox-group', CheckBoxGroup);
    }
}
export default ByCheckboxGroup
