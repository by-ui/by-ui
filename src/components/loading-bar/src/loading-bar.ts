import Vue from 'vue';
import LoadingBarVue from './loading-bar.vue';

import { LoadingBarOption } from '../model';

let instance: any;
const LoadingBarConstructor = Vue.extend(LoadingBarVue);

class LoadingBar {

    constructor(options: LoadingBarOption) {

        options = options || {}

        instance = new LoadingBarConstructor({
            data: options
        })

        instance.vm = instance.$mount()

        document.body.appendChild(instance.vm.$el)
    }

    update(newOptions: LoadingBarOption) {
        newOptions.width && (instance.width = newOptions.width);
        newOptions.color && (instance.color = newOptions.color);
        newOptions.percent && (instance.percent = newOptions.percent);
        newOptions.status && (instance.status = newOptions.status);
        newOptions.show && (instance.show = newOptions.show);
    }

    destroy() {
        document.body.removeChild(instance.vm.$el)
    }
}

export default LoadingBar;
