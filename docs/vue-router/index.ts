import Vue from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';

import routes from './routes';

Vue.use(VueRouter);

const options: RouterOptions = {
    // mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            };
        }
        return { x: 0, y: 0 };
    }
};

const router = new VueRouter(options);

console.log(router)

export default router;
