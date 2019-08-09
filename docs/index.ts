import Vue from 'vue'
import router from './vue-router';
import App from './app.vue';


/******** 公共包 ********/
import { i18n } from './packages/i18n';

/******** 文档全局组件 ********/
import './components'

/******** UI组件 ********/
import '../src'

/******** 公共UI及样式 ********/
import '../_intermediate/iconfonts/by-icon.scss';

import './styles/src/index.scss';
import '@docs/assets/style/docs.scss';

new Vue({
    el: '#by-ui',
    i18n,
    router,
    render: h => h(App),
});
