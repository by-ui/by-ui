import Vue, { PluginObject } from 'vue';
import DropdownMenu from '../dropdown/src/dropdown-menu.vue'

const DropdownMenuComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('ByDropdownMenu', DropdownMenu);
    }
}

export default DropdownMenuComponent;
