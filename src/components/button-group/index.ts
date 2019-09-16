import ButtonGroup from '../button/src/button-group.vue'

Object.defineProperty(ButtonGroup, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-button-group', ButtonGroup);
    }
})

export default ButtonGroup
