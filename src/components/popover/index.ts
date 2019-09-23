import Popover from './src/popover.vue'

Object.defineProperty(Popover, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-popover', Popover);
    }
})

export default Popover
