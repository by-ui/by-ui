import Option from '../select/src/option.vue'

Object.defineProperty(Option, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-option', Option);
    }
})

export default Option