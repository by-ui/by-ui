import TimeLine from './src/timeline.vue';

Object.defineProperty(TimeLine, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-time-line', TimeLine);
    }
})

export default TimeLine





