import Rate from './src/rate.vue'

Object.defineProperty(Rate, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-rate', Rate);
    }
})

export default Rate


