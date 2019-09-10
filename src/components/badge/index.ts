import Vue, { PluginObject } from 'vue';
import Badge from './src/badge.vue'

const BadgeComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-badge', Badge);
    }
}
export default BadgeComponent
