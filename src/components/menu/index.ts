import Menu from './src/menu.vue'

Object.defineProperty(Menu, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-menu', Menu);
    }
})

export default Menu
