import Vue, { PluginObject } from 'vue';
import Step from './src/step.vue'

const StepComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('ByStep', Step);
    }
}

export default StepComponent;
