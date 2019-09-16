import Textarea from './src/textarea.vue'

Object.defineProperty(Textarea, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-textarea', Textarea);
    }
})

export default Textarea

