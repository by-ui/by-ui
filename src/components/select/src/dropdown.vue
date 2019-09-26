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
export default class ByDropdown extends Mixins(PopoverMixin) {
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
        if (this.$parent.$options.name === 'BySelect') {
            this.width = (this.$parent.$el as any).style.width | 0
        }
    }
    created() {
        this.$on('on-update-popper', this.update)
    }
}
</script>
