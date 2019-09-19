import Vue from 'vue'
import router from './vue-router';
import App from './app.vue';


/******** 公共包 ********/
import { i18n } from './packages/i18n';

/******** 文档全局组件 ********/
import './components'


/******** 公共UI及样式 ********/
// import '../_intermediate/iconfonts/by-icon.scss';

import '@/by-ui-style/src/index.scss';
import '@docs/assets/style/docs.scss';

/******** 公共directives ********/
import './directives'

/******** UI组件 ********/
import * as ByUI from 'By-UI/index';

/******** scrollBar ********/
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

Vue.use(ByUI)

new Vue({
    el: '#by-ui',
    i18n,
    router,
    render: h => h(App),
    mounted: () => {
        // Scrollbar.use(OverscrollPlugin);
        // Scrollbar.init(document.body);
    }
});
