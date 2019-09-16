import CheckBox from './src/checkbox.vue'

Object.defineProperty(CheckBox, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-checkbox', CheckBox);
    }
})

export default CheckBox

