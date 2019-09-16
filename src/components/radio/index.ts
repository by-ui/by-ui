import Radio from './src/radio.vue'

Object.defineProperty(Radio, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-radio', Radio);
    }
})

export default Radio


