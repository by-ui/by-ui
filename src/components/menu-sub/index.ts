import MenuSub from '../menu/src/menu-sub.vue'

Object.defineProperty(MenuSub, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-menu-sub', MenuSub);
    }
})

export default MenuSub
