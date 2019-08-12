import Vue, { PluginObject } from 'vue';
import Alert from './src/alert.vue'


const AlertComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-alert', AlertComponent);
    }
}

export default AlertComponent
