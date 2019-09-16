import Pagination from './src/pagination.vue'

Object.defineProperty(Pagination, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-pagination', Pagination);
    }
})

export default Pagination
