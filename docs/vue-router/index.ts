import Vue from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';

import routes from './routes';

Vue.use(VueRouter);

const options: RouterOptions = {
    routes,
};

const router = new VueRouter(options);
router.beforeEach((to, from, next) => {
    next();
    (window as any).scrollbar && (window as any).scrollbar.scrollTo(0, 0, 200)
})

export default router;
