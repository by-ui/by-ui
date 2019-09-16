
/********** 基础组件 **********/
import Button from './components/button/src/button.vue';
import ButtonGroup from './components/button/src/button-group.vue';
import Tag from './components/tag/src/tag.vue';
import Icon from './components/icon/src/icon.vue';

/********** 表单组件 **********/
import Checkbox from './components/checkbox/src/checkbox.vue'
import CheckboxGroup from './components/checkbox/src/by-checkbox-group.vue'
import Textarea from './components/textarea/src/textarea.vue'
import InputNumber from './components/input-number/src/input-number.vue'
import Rate from './components/rate/src/rate.vue'
import Input from './components/input/src/input.vue'
import Switch from './components/switch/src/switch.vue';
import Radio from './components/radio/src/radio.vue'
import RadioGroup from './components/radio/src/radio-group.vue'
import RadioButton from './components/radio/src/radio-button.vue'

/********** 视图组件 **********/
import Badge from './components/badge/src/badge.vue';
import Alert from './components/alert/src/alert.vue';
import Collapse from './components/collapse/src/collapse.vue';
import CollapseItem from './components/collapse/src/collapse-item.vue';
import Message from './components/message/';
import LoadingBar from './components/loading-bar';
import Notification from './components/notification';
import Progress from './components/progress';
import TimeLine from './components/timeline/src/timeline.vue';
import TimeLineItem from './components/timeline/src/timeline-item.vue';

/********** 导航组件 **********/
import Breadcrumb from './components/breadcrumb';
import BreadcrumbItem from './components/breadcrumb-item';
import Pagination from './components/pagination';

const install = (Vue: any, options: any) => {
    Vue.component('by-button', Button);
    Vue.component('by-button-group', ButtonGroup);

    Vue.component('by-tag', Tag);
    Vue.component('by-icon', Icon);

    Vue.component('by-checkbox', Checkbox);
    Vue.component('by-checkbox-group', CheckboxGroup);
    Vue.component('by-textarea', Textarea);
    Vue.component('by-input-number', InputNumber);
    Vue.component('by-rate', Rate);
    Vue.component('by-switch', Switch);

    Vue.component('by-input', Input);
    Vue.component('by-radio', Radio);
    Vue.component('by-radio-group', RadioGroup);
    Vue.component('by-radio-button', RadioButton);

    Vue.component('by-badge', Badge);
    Vue.component('by-alert', Alert);
    Vue.component('by-collapse', Collapse);
    Vue.component('by-collapse-item', CollapseItem);
    Vue.component('by-progress', Progress);
    Vue.component('by-breadcrumb', Breadcrumb);
    Vue.component('by-breadcrumb-item', BreadcrumbItem)
    Vue.component('by-time-line', TimeLine);
    Vue.component('by-timeline-item', TimeLineItem);
    Vue.component('by-pagination', Pagination);


    Vue.prototype.$message = Message;
    Vue.prototype.$loadingBar = LoadingBar;
    Vue.prototype.$notify = Notification;
}

const version = '0.0.1';
export { version, install, Message, Progress,Pagination }
