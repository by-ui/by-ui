import MenuItem from '../menu/src/menu-item.vue'

Object.defineProperty(MenuItem, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-menu-item', MenuItem);
    }
})

export default MenuItem
