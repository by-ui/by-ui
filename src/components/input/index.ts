import Input from './src/input.vue'

Object.defineProperty(Input, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-input', Input);
    }
})

export default Input


