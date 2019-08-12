
import Vue, { PluginObject } from 'vue';
import Collapse from './src/collapse.vue'


const CollapseComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-collapse', Collapse);
    }
}

export default CollapseComponent
