import { DirectiveOptions } from 'vue';
const clickoutsideContext = '@@clickoutsideContext';

const ClickOutside: DirectiveOptions = {
    bind(el: any, binding, vnode: any) {
        const documentHandler = function (e: any) {
            if (!vnode.context || el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                vnode.context[el[clickoutsideContext].methodName](e);
            } else {
                el[clickoutsideContext].bindingFn(e);
            }
        };
        el[clickoutsideContext] = {
            documentHandler,
            methodName: binding.expression,
            bindingFn: binding.value,
        };
        setTimeout(() => {
            document.addEventListener('click', documentHandler);
        }, 0);
    },
    update(el: any, binding) {
        el[clickoutsideContext].methodName = binding.expression;
        el[clickoutsideContext].bindingFn = binding.value;
    },
    unbind(el: any) {
        document.removeEventListener('click', el[clickoutsideContext].documentHandler);
    },
};

export default ClickOutside;
