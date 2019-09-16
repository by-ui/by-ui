import Dropdown from './src/dropdown.vue'

Object.defineProperty(Dropdown, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-dropdown', Dropdown);
    }
})

export default Dropdown;
