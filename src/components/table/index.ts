import Table from './src/table.vue'

Object.defineProperty(Table, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-table', Table);
    }
})

export default Table
