import Model from './src/model.vue'

Object.defineProperty(Model, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-model', Model);
    }
})

export default Model
