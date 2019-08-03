import { RouteConfig } from 'vue-router';
import NavConfig from './nav.config.yml';

class Route {
    name: string;
    component: any;
    path: string;
    children?: Route[] = new Array();
    redirect?: any;

    constructor(name: string, component: any, path: string, children?: Route[], redirect?: any) {
        this.name = name;
        this.component = component;
        this.path = path;
        this.children ? new Array() : children;
        redirect && (this.redirect = redirect);
    }
}

const routes: any = [];
let currentIndex;

Object.keys(NavConfig).forEach((parent: string, index: number) => {
    // 制定父级路由
    const _name = parent.toLowerCase();
    currentIndex = index;

    routes.push(
        new Route(
            parent,
            () => import(/* webpackChunkName: "modules/${_name}" */ `../views/${_name}/${_name}.vue`),
            `/${_name}`,
            undefined,
            // 重定向到第一个子路由
            { name: NavConfig[parent][0].items[0].name.toLowerCase() }
        )
    );

    // 遍历子路由
    NavConfig[parent].forEach((item: any) => {
        const _itemName = item.name.toLowerCase();
        // 有组的情况
        if (item.groups) {
            item.groups.forEach(group => {
                group.items.forEach(item => {

                    const _name = item.name.toLowerCase();
                    routes[currentIndex].children.push(
                        new Route(
                            _name,
                            () => import(/* webpackChunkName: "modules/${_name}" */ `../markdown/${_name}.md`),
                            `${_name}`
                        )
                    )
                })
            })
        } else {
            item.items.forEach(group => {
                const _name = group.name.toLowerCase();
                routes[currentIndex].children.push(
                    new Route(
                        _name,
                        () => import(/* webpackChunkName: "modules/${_name}" */ `../markdown/${_name}.md`),
                        `${_name}`
                    )
                )
            })
        }
    })
})

routes.push({
    path: '/',
    redirect: { name: 'guide' }
})
export default routes;
