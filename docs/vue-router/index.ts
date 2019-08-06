import Vue from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';

import routes from './routes';

Vue.use(VueRouter);

const options: RouterOptions = {
    // mode: 'history',
    routes,
};

const router = new VueRouter(options);

export default router;
