import Vue, { PluginObject } from 'vue';
import StepItem from '../steps/src/step-item.vue'

const StepItemComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('ByStepItem', StepItem);
    }
}

export default StepItemComponent;
