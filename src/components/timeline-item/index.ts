import Vue, { PluginObject } from 'vue';
import TimeLineItem from '../timeline/src/timeline-item.vue';

const TimeLineItemComponent: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-timeline-item', TimeLineItem);
    }
}

export default TimeLineItemComponent;
