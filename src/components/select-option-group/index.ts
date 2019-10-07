import OptionGroup from '../select/src/option-group.vue'

Object.defineProperty(OptionGroup, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-option-group', OptionGroup);
    }
})

export default OptionGroup
