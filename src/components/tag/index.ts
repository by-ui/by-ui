import Vue, { PluginObject } from 'vue';
import Tag from './src/tag.vue'

const TagComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-tag', Tag);
    }
}
export default TagComponent
