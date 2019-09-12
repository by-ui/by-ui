import Vue, { PluginObject } from 'vue';
import Progress from './src/progress.vue'

const ProgressComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-progress', Progress);
    }
}
export default ProgressComponent
