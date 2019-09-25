// import OptionGroup from '../select/src/option-group.vue'

// OptionGroup.install = function (Vue) {
//   Vue.component(OptionGroup.name, OptionGroup)
// }

// export default OptionGroup


import OptionGroup from '../select/src/option-group.vue'

Object.defineProperty(OptionGroup, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-option-group', OptionGroup);
    }
})

export default OptionGroup