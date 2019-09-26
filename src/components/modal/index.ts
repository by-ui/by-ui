import Model from './src/modal.vue';
import Dialog from './src/dialog';

Object.defineProperty(Model, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-model', Model);
    }
})

Object.assign(Model,Dialog)

export default Model
