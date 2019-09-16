import Vue, { PluginObject } from 'vue';
import TimeLine from './src/timeline.vue';

const TimeLineComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-time-line', TimeLine);
    }
}

export default TimeLineComponent;
