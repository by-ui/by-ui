import Vue, { PluginObject } from 'vue';
import Breadcrumb from './src/breadcrumb.vue'


Object.defineProperty(Breadcrumb, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-breadcrumb', Breadcrumb);
    }
})

export default Breadcrumb
