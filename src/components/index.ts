import Vue, { PluginObject } from 'vue';

import AppLayout from './the-layout/the-layout.vue';

import FrameListView from './frame-list-view/frame-list-view.vue'

const Components: PluginObject<never> = {
    install(Vue) {
        Vue.component('app-layout', AppLayout);
        Vue.component('frame-list-view', FrameListView);
    }
}

Vue.use(Components);