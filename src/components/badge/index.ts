import Badge from './src/badge.vue'

Object.defineProperty(Badge, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-badge', Badge);
    }
})

export default Badge



