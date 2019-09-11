<template>
    <label class="by-radio">
        <span class="by-radio__input">
            <span class="by-radio__inner"
                  :class="{
          'by-radio--focus': focus,
          'by-radio--checked': currentValue === label,
          'by-radio--disabled': disabled
        }"></span>
            <input type="radio"
                   class="by-radio__original"
                   v-model="currentValue"
                   :name="name"
                   :value="label"
                   :disabled="disabled"
                   @focus="focus = true"
                   @blur="focus = false">
        </span>
        <span class="by-radio__label">
            <slot></slot>
        </span>
    </label>
</template>

<script lang="ts">
import {
    Vue,
    Component,
    Prop,
    PropSync,
    Watch,
    Mixins
} from "vue-property-decorator";

import TwoWay from "mixins/two-way";

@Component
export default class ByRadio extends Mixins(TwoWay) {

    /**
     * 绑定的值
     *
     */
    @Prop()
    value?: string | number

    @Prop()
    name?: string

    @Prop()
    label!: string | number


    @Prop({
        default:false
    })
    disabled?: boolean

    // store = this.value
    focus = false
    isGroup = false

    @Watch('value')
    watchValue(val:string | number) {
        this.currentValue = val
    }

    mounted() {
        console.log(this.currentValue);
    }
}
// export default {
//   name: 'AtRadio',
//   props: {
//     value: [String, Number],
//     name: String,
//     label: {
//       type: [String, Number],
//       required: true
//     },
//     disabled: Boolean
//   },
//   mixins: [Emitter],
//   data () {
//     return {
//       store: this.value,
//       focus: false,
//       isGroup: false
//     }
//   },
//   watch: {
//     store (store) {
//       this.$emit('input', store)

//       if (this.isGroup) {
//         // this.dispatch('AtRadioGroup', 'input', store)
//       }
//     },
//     value (val) {
//       this.store = val
//     }
//   },
//   mounted () {
//     this.$on('init-data', data => {
//       this.store = data
//       this.isGroup = true
//     })
//   }
// }
</script>
