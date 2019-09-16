import InputNumber from './src/input-number.vue'

Object.defineProperty(InputNumber, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-input-number', InputNumber);
    }
})

export default InputNumber

