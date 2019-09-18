import Drawer from './src/drawer.vue'

Object.defineProperty(Drawer, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-drawer', Drawer);
    }
})

export default Drawer;
