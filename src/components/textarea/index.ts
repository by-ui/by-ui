import Vue, { PluginObject } from 'vue';
import Textarea from './src/textarea.vue'

const TextareaComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-textarea', Textarea);
    }
}

export default TextareaComponent
