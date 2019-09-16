import Switch from './src/switch.vue'

Object.defineProperty(Switch, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-switch', Switch);
    }
})

export default Switch


