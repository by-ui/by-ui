import Step from './src/step.vue'

Object.defineProperty(Step, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-step', Step);
    }
})

export default Step
