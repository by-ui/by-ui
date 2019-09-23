
/********** 基础组件 **********/
import Button from './components/button';
import ButtonGroup from './components/button-group';
import Tag from './components/tag';
import Icon from './components/icon';

/********** 表单组件 **********/
import Checkbox from './components/checkbox';
import CheckboxGroup from './components/checkbox-group';
import Textarea from './components/textarea';
import InputNumber from './components/input-number';
import Rate from './components/rate';
import Input from './components/input';
import Switch from './components/switch';
import Radio from './components/radio';
import RadioGroup from './components/radio-group';
import RadioButton from './components/radio-button';
import Form from './components/form';
import FormItem from './components/form-item';

/********** 视图组件 **********/
import Badge from './components/badge';
import Alert from './components/alert';
import Collapse from './components/collapse';
import CollapseItem from './components/collapse-Item';
import Message from './components/message';
import LoadingBar from './components/loading-bar';
import Notification from './components/notification';
import Progress from './components/progress';
import TimeLine from './components/timeline';
import TimeLineItem from './components/timeline-item';
import Step from './components/step';
import StepItem from './components/step-item';
import Table from './components/table';
import Dropdown from './components/dropdown';
import DropdownMenu from './components/dropdown-menu';
import DropdownItem from './components/dropdown-item';
import Drawer from './components/drawer';
import Tooltip from './components/tooltip';
import Popover from './components/popover';


/********** 导航组件 **********/
import Breadcrumb from './components/breadcrumb';
import BreadcrumbItem from './components/breadcrumb-item';
import Pagination from './components/pagination';
import Tabs from './components/tabs';
import TabPane from './components/tab-pane';
import Menu from './components/menu';
import MenuItem from './components/menu-item';
import MenuItemGroup from './components/menu-item-group';
import Submenu from './components/menu-sub';

function install(Vue: any, opts = {}) {
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
    Vue.component('by-form', Form);
    Vue.component('by-form-item', FormItem);

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
    Vue.component('by-step', Step);
    Vue.component('by-step-item', StepItem);
    Vue.component('by-table', Table);
    Vue.component('by-dropdown', Dropdown);
    Vue.component('by-dropdown-menu', DropdownMenu);
    Vue.component('by-dropdown-item', DropdownItem);
    Vue.component('by-drawer', Drawer);
    Vue.component('by-tabs', Tabs);
    Vue.component('by-tab-pane', TabPane);
    Vue.component('by-menu', Menu);
    Vue.component('by-menu-item', MenuItem);
    Vue.component('by-menu-item-group', MenuItemGroup);
    Vue.component('by-menu-sub', Submenu);
    Vue.component('by-tooltip', Tooltip);
    Vue.component('by-popover', Popover);




    Vue.prototype.$message = Message;
    Vue.prototype.$loadingBar = LoadingBar;
    Vue.prototype.$notify = Notification;
}

/**
 * Global Install
 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
const verion = 'v.0.0.3'
export { verion, install, Message, Button }
// export default { verion, install, Message, Button }
console.log({ verion, install, Message, Button });
