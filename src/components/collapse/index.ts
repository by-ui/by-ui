import Collapse from './src/collapse.vue'

Object.defineProperty(Collapse, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-collapse', Collapse);
    }
})

export default Collapse




