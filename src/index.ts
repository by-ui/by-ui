import Vue, { PluginObject } from 'vue';

/********** 基础组件 **********/
import Button from './components/button/src/button.vue'
import Tag from './components/tag/src/tag.vue'
import Icon from './components/icon/src/icon.vue'
import Textarea from './components/textarea/src/textarea.vue'
import Alert from './components/alert/src/alert.vue'

/********** 表单组件 **********/
import Checkbox from './components/checkbox/src/checkbox.vue'
import CheckboxGroup from './components/checkbox/src/by-checkbox-group.vue'

const Components: PluginObject<never> = {
    install(Vue) {
        Vue.component('by-button', Button);
        Vue.component('by-tag', Tag);
        Vue.component('by-icon', Icon);
        Vue.component('by-checkbox', Checkbox);
        Vue.component('by-checkbox-group', CheckboxGroup);
        Vue.component('by-textarea', Textarea);
        Vue.component('by-alert', Alert);

    }
}

Vue.use(Components);
