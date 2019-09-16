import Vue, { PluginObject } from 'vue';
import Dropdown from './src/dropdown.vue'

const DropdownComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('ByDropdowm', Dropdown);
    }
}

export default DropdownComponent;
