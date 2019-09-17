import Vue from 'vue';
import MessageVue from './message.vue';
const MessageConstructor = Vue.extend(MessageVue);

const messageType = ['info', 'success', 'warning', 'error', 'loading'];
const instances: any = [];
let seed = 1;
let zindexSeed = 1010;

const Message = (options: any) => {
    if (Vue.prototype.$isServer) return;
    options = options || {};

    if (typeof options === 'string') {
        options = {
            message: options
        };
    }

    const customCloseFunc = options.onClose;
    const id: string = `message_${seed++}`;

    options.onClose = () => {
        Message.close(id, customCloseFunc);
    };

    const instance = new MessageConstructor({
        data: options
    });

    instance.id = id;
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.vm.visible = true;
    instance.dom = instance.vm.$el;
    instance.dom.style.zIndex = zindexSeed++;

    const offset = 0;
    const len = instances.length;
    let topDist = offset;

    for (let i = 0; i < len; i++) {
        topDist += instances[i].$el.offsetHeight + 8;
    }

    topDist += 8;
    instance.top = topDist;

    instances.push(instance);

    // 返回关闭方法，用于手动消除
    return function() {
        instance.vm.close(id);
    };
}

Message.close = (id: string, customCloseFunc: any) => {
    const len = instances.length;
    let index: number = 0,
        removedHeight;

    for (let i: number = 0; i < len; i++) {
        if (id === instances[i].id) {
            if (typeof customCloseFunc === 'function') {
                customCloseFunc(instances[i]);
            }
            index = i;
            removedHeight = instances[i].dom.offsetHeight;
            instances.splice(i, 1);
            break;
        }
    }

    if (len > 1) {
        for (let i: number = index; i < len - 1; i++) {
            instances[i].dom.style.top = `${parseInt(
                instances[i].dom.style.top
            ) -
                removedHeight -
                8}px`;
        }
    }
}

Message.closeAll = () => {
    instances.forEach((elem: any, idx: any) => {
        elem.close();
    });
}

Message.info = (options:any) => newMessage(options, 'info')
Message.success = (options:any) => newMessage(options, 'success')
Message.warning = (options:any) => newMessage(options, 'warning')
Message.error = (options:any) => newMessage(options, 'error')
Message.loading = (options:any) => newMessage(options, 'loading')

function newMessage(options:any , type: string){
    if (typeof options === 'string') {
        options = {
            message: options
        };
    }
    options.type = type;
    options.icon = options.icon;
    return Message(options);
}

export default Message;
