import StepItem from '../step/src/step-item.vue'

Object.defineProperty(StepItem, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-step-item', StepItem);
    }
})

export default StepItem
