import Vue, { PluginObject } from 'vue';
import BreadcrumbItem from '../breadcrumb/src/breadcrumb-item.vue'


Object.defineProperty(BreadcrumbItem, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-breadcrumb-item', BreadcrumbItem);
    }
})

export default BreadcrumbItem
