import Tooltip from './src/tooltip.vue'

Object.defineProperty(Tooltip, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-tooltip', Tooltip);
    }
})

export default Tooltip
