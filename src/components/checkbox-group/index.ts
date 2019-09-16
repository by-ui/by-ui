import CheckBoxGroup from '../checkbox/src/by-checkbox-group.vue'

Object.defineProperty(CheckBoxGroup, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-checkbox-group', CheckBoxGroup);
    }
})

export default CheckBoxGroup

