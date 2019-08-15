<template>
    <div class="by-input"
         :class="[
      size ? `by-input--${size}` : '',
      status ? `by-input--${status}` : '',
      {
        'by-input-group': $slots.prepend || $slots.append,
        'by-input--disabled': disabled,
        'by-input--prepend': $slots.prepend,
        'by-input--append': $slots.append,
        'by-input--icon': icon
      }
    ]">
        <!-- S prepend element -->
        <div class="by-input-group__prepend"
             :class="{ 'by-input-group--button': prependButton }"
             v-if="$slots.prepend">
            <slot name="prepend"></slot>
        </div>
        <!-- E prepend element -->

        <!-- S input -->
        <input class="by-input__original"
               :type="type"
               :name="name"
               :value="currentValue"
               :placeholder="placeholder"
               :min="min"
               :max="max"
               :minlength="minlength"
               :maxlength="maxlength"
               :disabled="disabled"
               :readonly="readonly"
               :autofocus="autofocus"
               @focus="handleFocus"
               @blur="handleBlur"
               @input="handleInput">
        <!-- E input -->

        <!-- S icon -->
        <i class="by-input__icon icon"
           :class="iconClass"
           v-if="icon"></i>
        <!-- E icon -->

        <!-- S append element -->
        <div class="by-input-group__append"
             :class="{ 'by-input-group--button': appendButton }"
             v-if="$slots.append">
            <slot name="append"></slot>
        </div>
        <!-- E append element -->
    </div>
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
import TwoWay from "mixins/two-way"
// import Emitter from "@/mixins/emitter";

@Component
export default class ByInput extends Vue {
    /**
     * 类型
     * 输入框类型，原生属性
     */
    @Prop({
        default: "text"
    })
    type?: string;

    /**
     * 绑定的值
     *
     */
    @Prop({
        default: ""
    })
    value?: string | number;

    /**
     * 原生属性
     *
     */
    @Prop({
        default: ""
    })
    name?: string;

    /**
     * 占位文本（原生属性）
     */
    @Prop({
        default: ""
    })
    placeholder?: string;

    /**
     * 输入框尺寸
     * 可选值：small, normal, large
     *
     *
     */
    @Prop({
        default: "normal"
    })
    size?: string;

    /**
     * 输入框类型
     * 可选值：success, error, warning, info
     *
     *
     */
    @Prop()
    status?: string;

    /**
     * 图标的类名
     *
     *
     */
    @Prop({
        default: ""
    })
    icon?: string;

    /**
     * 前置元素是否包含可点击的按钮，用于复合型输入框
     *
     */
    @Prop({
        type: Boolean,
        default: false
        
    })
    prependButton?: boolean;

    /**
     * 后置元素是否包含可点击的按钮，用于复合型输入框
     *
     */
    @Prop({
        type: Boolean,
        default: false
    })
    appendButton?: boolean;

    /**
     * 是否只读（原生属性）
     *
     */
    @Prop({
        type: Boolean,
        default: false
    })
    readonly?: boolean;

    /**
     * 是否禁用（原生属性）
     *
     */
    @Prop({
        type: Boolean,
        default: false
    })
    disabled?: boolean;

    /**
     * 是否自动获取焦点（原生属性）
     *
     */
    @Prop({
        type: Boolean,
        default: false
    })
    autofocus?: boolean;

    /**
     * 	最大长度（原生属性）
     *
     */
    @Prop()
    maxlength?: number;

    /**
     * 	最小长度（原生属性）
     *
     */
    @Prop()
    minlength?: number;

    /**
     * 	最大值（原生属性）
     *
     */
    @Prop()
    max?: number;

    /**
     * 	最小值（原生属性）
     *
     */
    @Prop()
    min?: number;

    currentValue = this.value;

    get iconClass() {
        const name = this.icon || this.status;
        return name ? `icon-${name}` : "";
    }

    @Watch("value")
    watchValue(val: string | number) {
        this.setCurrentValue(val);
    }

    handleFocus(evt: any) {
        this.$emit("focus", evt);
    }
    handleBlur(evt: any) {
        this.$emit("blur", evt);
        // this.dispatch('AtFormItem', 'on-form-item-blur', this.currentValue)
    }
    handleInput(evt: any) {
        const value = evt.target.value;
        this.$emit("input", value);
        this.$emit("change", value);
    }
    setCurrentValue(val: string | number) {
        if (val === this.currentValue) return;
        this.currentValue = val;
        // this.dispatch('AtFormItem', 'on-form-item-change', this.currentValue)
    }
}
</script>
