import Vue from 'vue'
import router from './vue-router';
import App from './app.vue';


/******** 公共包 ********/
import '../src/components'
import DemoBox from './components/demobox.vue'; // md文件代码块

/******** 公共UI及样式 ********/
import '../_intermediate/iconfonts/by-icon.scss';

import './styles/src/index.scss';
import '@docs/assets/style/docs.scss';


Vue.component('demo-box', DemoBox);

new Vue({
    el: '#by-ui',
    router,
    render: h => h(App),
});
