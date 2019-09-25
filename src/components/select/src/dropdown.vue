<template>
    <div class="by-select__dropdown"
         :style="styles">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync, Watch, Mixins } from "vue-property-decorator";
import PopoverMixin from 'By-UI/mixins/popover'
@Component
export default class Dropdown extends Mixins(PopoverMixin) {
    @Prop({
        default: 'bottom'
    })
    placement?: string

    popper: any = null
    width: any = ''

    get styles() {
        const style = {
            width: ''
        }
        if (this.width) {
            style.width = `${this.width}px`
        }
        return style
    }

    update() {
        if (this.$parent.$options.name === 'AtSelect') {
            this.width = (this.$parent.$el as any).style.width | 0
        }
    }
    created() {
        this.$on('on-update-popper', this.update)
    }
}
// export default {
//   name: 'Dropdown',
//   props: {
//     placement: {
//       type: String,
//       default: 'bottom'
//     }
//   },
//   mixins: [PopoverMixin],
//   data () {
//     return {
//       popper: null,
//       width: ''
//     }
//   },
//   computed: {
//     styles () {
//       const style = {}
//       if (this.width) {
//         style.width = `${this.width}px`
//       }
//       return style
//     }
//   },
//   methods: {
//     update () {
//       if (this.$parent.$options.name === 'AtSelect') {
//         this.width = this.$parent.$el.style.width | 0
//       }
//     }
//   },
//   created () {
//     this.$on('on-update-popper', this.update)
//   }
// }
</script>
