import RadioGroup from '../radio/src/radio-group.vue'

Object.defineProperty(RadioGroup, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-radio-group', RadioGroup);
    }
})

export default RadioGroup



