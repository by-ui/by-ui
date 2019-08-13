import Vue, { PluginObject } from 'vue';
import Rate from './src/rate.vue'

const RatereaComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-rate', Rate);
    }
}

export default RatereaComponent
