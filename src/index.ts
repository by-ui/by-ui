import Vue, { PluginObject } from 'vue';

import Button from './components/button/src/button.vue'
import Tag from './components/tag/src/tag.vue'
import Icon from './components/icon/src/icon.vue'
import Textarea from './components/textarea/src/textarea.vue'
import Alert from './components/alert/src/alert.vue'
import Collapse from './components/collapse/src/collapse.vue'
import CollapseItem from './components/collapse/src/collapse-item.vue'

const Components: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-button', Button);
        Vue.component('by-tag', Tag);
        Vue.component('by-icon', Icon);
        Vue.component('by-textarea', Textarea);
        Vue.component('by-alert', Alert);
        Vue.component('by-collapse', Collapse);
        Vue.component('by-collapse-item', CollapseItem);

    }
}

Vue.use(Components);
