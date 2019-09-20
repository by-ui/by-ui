import FormItem from '../form/src/form-item.vue'

Object.defineProperty(FormItem, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-form-item', FormItem);
    }
})

export default FormItem;
