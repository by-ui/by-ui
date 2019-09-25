import Slider from './src/slider.vue'

Object.defineProperty(Slider, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-slider', Slider);
    }
})

export default Slider


