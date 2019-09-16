import CollapseItem from '../collapse/src/collapse-item.vue'

Object.defineProperty(CollapseItem, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-collapse-item', CollapseItem);
    }
})

export default CollapseItem




