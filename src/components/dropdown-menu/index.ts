import DropdownMenu from '../dropdown/src/dropdown-menu.vue'

Object.defineProperty(DropdownMenu, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-dropdown-menu', DropdownMenu);
    }
})

export default DropdownMenu;
