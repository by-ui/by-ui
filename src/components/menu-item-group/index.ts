import MenuItemGroup from '../menu/src/menu-item-group.vue'

Object.defineProperty(MenuItemGroup, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-menu-item-group', MenuItemGroup);
    }
})

export default MenuItemGroup
