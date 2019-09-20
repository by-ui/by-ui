import TabPane from '../tabs/src/tab-pane.vue'

Object.defineProperty(TabPane, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-tab-pane', TabPane);
    }
})

export default TabPane
