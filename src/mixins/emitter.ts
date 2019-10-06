import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

function broadcast(this: any, componentName: any, eventName: any, params?: any) {
    this.$children.forEach((child: any) => {
        const name = child.$options.name
        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params))
        } else {
            let arg = new Array<any>();
            arg = [componentName, eventName].concat([params])
            broadcast.bind(child)(componentName, eventName, params)
        }
    })
}

@Component
export default class Emitter extends Vue {
    dispatch(this: any, componentName: any, eventName: any, params: any) {
        let parent = this.$parent || this.$root
        let name = parent.$options.name
        console.log(name)

        while (parent && (!name || name !== componentName)) {
            parent = parent.$parent

            if (parent) {
                name = parent.$options.name
            }
        }

        if (parent) {
            parent.$emit.apply(parent, [eventName].concat(params))
        }
    }
    broadcast(componentName: string, eventName: string, params?: any) {
        broadcast.call(this, componentName, eventName, params)
    }
}
