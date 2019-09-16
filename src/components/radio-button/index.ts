import RadioButton from '../radio/src/radio-button.vue'

Object.defineProperty(RadioButton, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-radio-button', RadioButton);
    }
})

export default RadioButton



