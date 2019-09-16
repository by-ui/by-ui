import DropdownItem from '../dropdown/src/dropdown-item.vue'

Object.defineProperty(DropdownItem, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-dropdown-item', DropdownItem);
    }
})

export default DropdownItem

