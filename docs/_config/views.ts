import { RouteConfig } from 'vue-router';

const views: RouteConfig[] = [
    {
        path: 'index',
        name: 'index',
        meta: {
            title: '首页'
        },
        component: () => import(/* webpackChunkName: "modules/index" */ '@/pages/index/index.vue'),
    },
    {
        path: 'company-list',
        name: 'company-list',
        meta: {
            title: '企业列表'
        },
        component: () => import(/* webpackChunkName: "modules/company-list" */ '@/pages/company-list/company-list.vue'),
        children: [
            {

                path: 'company-detail',
                name: 'company-detail',
                meta: {
                    title: '企业详情'
                },
                component: () => import(/* webpackChunkName: "modules/company-list" */ '@/pages/company-list/company-detail.vue'),
            }
        ]
    },
    {
        path: 'project-list',
        name: 'project-list',
        meta: {
            title: '项目列表'
        },
        component: () => import(/* webpackChunkName: "modules/project-list" */ '@/pages/project-list/project-list.vue'),
    },
];

export default views;
