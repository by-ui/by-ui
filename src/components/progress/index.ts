import Progress from './src/progress.vue'

Object.defineProperty(Progress, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-progress', Progress);
    }
})

export default Progress
