import Card from './src/card.vue'

Object.defineProperty(Card, 'install', {
    writable: false,
    value: (Vue: any) => {
        Vue.component('by-card', Card);
    }
})

export default Card
