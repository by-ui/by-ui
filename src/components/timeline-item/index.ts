import TimeLineItem from '../timeline/src/timeline-item.vue';

Object.defineProperty(TimeLineItem, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-time-line-item', TimeLineItem);
    }
})

export default TimeLineItem
