<template>
    <label class="by-radio-button"
           :class="[
      size ? `by-radio-button--${size}` : '',
      { 'by-radio--checked': store === label }
    ]">
        <input type="radio"
               class="by-radio-button__original"
               v-model="store"
               :value="label"
               :name="name"
               :disabled="disabled">
        <span class="by-radio-button__inner"
              :style="store === label ? activeStyle : null">
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
export default class ByRadioButton extends Vue {
    @Prop()
    name?: string;

    @Prop()
    label!: string | number;

    @Prop({
        default: false
    })
    disabled?: boolean;

    size = (this.$parent as any).size;

    get store() {
        return (this.$parent as any).value;
    }
    set store(newValue) {
        this.$parent.$emit("input", newValue);
    }


    get activeStyle() {
        const styles = {
            backgroundColor: "",
            borderColor: "",
            color: ""
        };

        if ((this.$parent as any).fill) {
            styles.backgroundColor = (this.$parent as any).fill;
            styles.borderColor = (this.$parent as any).fill;
        }
        if ((this.$parent as any).textColor) {
            styles.color = (this.$parent as any).textColor;
        }

        return styles;
    }
    mounted(){
        // console.log(this.$parent);
    }
}
// export default {
//   name: 'AtRadioButton',
//   props: {
//     name: String,
//     label: {
//       type: [String, Number],
//       required: true
//     },
//     disabled: {
//       type: Boolean,
//       default: false
//     }
//   },
//   data () {
//     return {
//       size: this.$parent.size
//     }
//   },
//   computed: {
//     store: {
//       get () {
//         return this.$parent.value
//       },
//       set (newValue) {
//         this.$parent.$emit('input', newValue)
//       }
//     },
//     activeStyle () {
//       const styles = {}

//       if (this.$parent.fill) {
//         styles.backgroundColor = this.$parent.fill
//         styles.borderColor = this.$parent.fill
//       }
//       if (this.$parent.textColor) {
//         styles.color = this.$parent.textColor
//       }

//       return styles
//     }
//   }
// }
</script>
