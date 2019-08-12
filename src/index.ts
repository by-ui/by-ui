import Vue, { PluginObject } from 'vue';

/********** 基础组件 **********/
import Button from './components/button/src/button.vue'
import Tag from './components/tag/src/tag.vue'
import Icon from './components/icon/src/icon.vue'

/********** 表单组件 **********/
import ByCheckbox from './components/checkbox/src/checkbox.vue'

const Components: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-button', Button);
        Vue.component('by-tag', Tag);
        Vue.component('by-icon', Icon);
        Vue.component('by-checkbox', ByCheckbox);

    }
}

Vue.use(Components);
