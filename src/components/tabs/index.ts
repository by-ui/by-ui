import Tabs from './src/tabs.vue'

Object.defineProperty(Tabs, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-tabs', Tabs);
    }
})

export default Tabs
