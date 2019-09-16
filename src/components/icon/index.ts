import Icon from './src/icon.vue'

Object.defineProperty(Icon, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-icon', Icon);
    }
})

export default Icon

