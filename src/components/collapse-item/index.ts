
import Vue, { PluginObject } from 'vue';
import CollapseItem from '../collapse/src/collapse-item.vue'


const CollapseItemComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-collapse-item', CollapseItem);
    }
}

export default CollapseItemComponent
