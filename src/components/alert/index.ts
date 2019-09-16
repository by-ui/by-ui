import Alert from './src/alert.vue'

Object.defineProperty(Alert, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-alert', Alert);
    }
})

export default Alert



