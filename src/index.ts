
/********** 基础组件 **********/
import Button from './components/button/src/button.vue';
import Tag from './components/tag/src/tag.vue';
import Icon from './components/icon/src/icon.vue';

/********** 表单组件 **********/
import Checkbox from './components/checkbox/src/checkbox.vue';
import CheckboxGroup from './components/checkbox/src/by-checkbox-group.vue';
import Textarea from './components/textarea/src/textarea.vue';
import InputNumber from './components/input-number/src/input-number.vue';
import Rate from './components/rate/src/rate.vue';
import Switch from './components/switch/src/switch.vue';
import Input from './components/Input/src/input.vue';

/********** 视图组件 **********/
import Badge from './components/badge/src/badge.vue';
import Alert from './components/alert/src/alert.vue';
import Collapse from './components/collapse/src/collapse.vue';
import CollapseItem from './components/collapse/src/collapse-item.vue';

/********** 视图插件 **********/
import Message from './components/message/';
import LoadingBar from './components/loading-bar';

const install = (Vue:any, options:any) => {
    Vue.component('by-button', Button);
    Vue.component('by-tag', Tag);
    Vue.component('by-icon', Icon);

    Vue.component('by-checkbox', Checkbox);
    Vue.component('by-checkbox-group', CheckboxGroup);
    Vue.component('by-textarea', Textarea);
    Vue.component('by-input-number', InputNumber);
    Vue.component('by-rate', Rate);
    Vue.component('by-switch', Switch);

    Vue.component('by-input', Input);

    Vue.component('by-badge',Badge);
    Vue.component('by-alert', Alert);
    Vue.component('by-collapse', Collapse);
    Vue.component('by-collapse-item', CollapseItem);

    Vue.prototype.$message = Message;
    Vue.prototype.$loadingBar = LoadingBar;
}

const version = '0.0.1';
export { version, install, Message }
