import Vue, { PluginObject } from 'vue';
import DropdownItem from '../dropdown/src/dropdown-menu.vue'

const DropdownItemComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('ByDropdownItem', DropdownItem);
    }
}

export default DropdownItemComponent;
