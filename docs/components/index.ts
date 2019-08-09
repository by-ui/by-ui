import Vue, { PluginObject } from 'vue';

import ByHeader from './header/index.vue';
import ByFooter from './footer/index.vue';
import BySlider from './slidebar/index.vue';

import IconList from './icon-list/index.vue';
import DemoBox from './demobox/index.vue'; // md文件代码块

const Components: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-header', ByHeader);
        Vue.component('by-footer', ByFooter);
        Vue.component('by-slider', BySlider);
        Vue.component('icon-list', IconList);
        Vue.component('demo-box', DemoBox);
    }
}

Vue.use(Components);
