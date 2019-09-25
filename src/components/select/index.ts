import Select from './src/select.vue'

Object.defineProperty(Select, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-select', Select);
    }
})

export default Select



