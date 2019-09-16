import Tag from './src/tag.vue'

Object.defineProperty(Tag, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-tag', Tag);
    }
})

export default Tag
