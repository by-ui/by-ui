// import Slider from './src/slider.vue'

// Slider.install = function (Vue) {
//   Vue.component(Slider.name, Slider)
// }

// export default Slider

import Slider from './src/slider.vue'

Object.defineProperty(Slider, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-slider', Slider);
    }
})

export default Slider


