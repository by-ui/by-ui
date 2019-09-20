import Form from './src/form.vue'

Object.defineProperty(Form, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-form', Form);
    }
})

export default Form;
