<template>
    <div class="by-input-number"
         :class="[size ? `by-input-number--${size}` : '',
                 {'by-input-number--disabled': disabled }]">
        <div class="by-input-number__input">
            <input type="number"
                   class="by-input-number__original"
                   :value="currentValue"
                   :name="name"
                   :disabled="disabled"
                   :readonly="readonly"
                   :max="max"
                   :min="min"
                   :autofocus="autofocus"
                   @focus="handleFocus"
                   @blur="handleBlur"
                   @keydown.up.stop.prevent="increaseNum"
                   @keydown.down.stop.prevent="decreaseNum">
        </div>
        <div class="by-input-number__handler">
            <span class="by-input-number__up"
                  :class="{ 'by-input-number__up--disabled': upDisabled }"
                  @click="increaseNum">
                <i class="icon icon-chevron-up"></i>
            </span>
            <span class="by-input-number__down"
                  :class="{'by-input-number__down--disabled': downDisabled }"
                  @click="decreaseNum">
                <i class="icon icon-chevron-down"></i>
            </span>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Mixins } from "vue-property-decorator";
    import TwoWay from "mixins/two-way";

    @Component
    export default class InputNumber extends Mixins(TwoWay) {

        @Prop()
        name?: string;

        @Prop({
            type: String,
            default: 'normal'
        })
        size?: string;

        @Prop({
            default: false,
            type: Boolean
        })
        disabled?: boolean;

        @Prop({
            default: false,
            type: Boolean
        })
        readonly?: boolean;

        @Prop({
            default: false,
            type: Boolean
        })
        autofocus?: boolean;

        @Prop()
        min?: number;

        @Prop()
        max?: number;

        @Prop({
            default: 1,
            type: Number
        })
        step!: number | string;

        get upDisabled() {
            // 没有最大值，可以无限递加
            if (!this.max) { return false; }
            return Number(this.currentValue) + Number(this.step) > this.max;
        }

        get downDisabled() {
            // 没有最小值，可以无限递减
            if (!this.min) { return false; }
            return Number(this.currentValue) - Number(this.step) < this.min;
        }

        handleFocus(evt: HTMLElement) {
            this.$emit('focus', evt)
        }

        handleBlur(evt: HTMLElement) {
            this.$emit('blur', evt)
        }

        /**
         * 判断是否可操作递加
         */
        increaseNum() {
            const value = this.currentValue || 0;
            if ((this.max && value >= this.max) || this.disabled) return
            this.calculateStep('up')
        }

        /**
         * 判断是否可操作性递减
         */
        decreaseNum() {
            const value = this.currentValue || 0
            if ((this.min && value <= this.min) || this.disabled) return
            this.calculateStep('down')
        }

        /**
         * 计算步数
         */
        calculateStep(type: string) {
            if (this.disabled) return

            let value = Number(this.currentValue)
            const stepNum = Number(this.step)

            if (type === 'up') {
                value = this.calculateNumber(value, stepNum, '+') || 0
            } else if (type === 'down') {
                value = this.calculateNumber(value, stepNum, '-') || 0
            }

            if ((this.max && value > this.max) || (this.min && value < this.min)) return;

            this.currentValue = value;

            this.$emit('change', value);
            // this.dispatch('AtFormItem', 'on-form-item-change', value)
        }

        /**
         * 计算操作后的值
         * num currentvalue
         * stepNum 步数
         * symbol 类型
         */
        calculateNumber(num: number, stepNum: number, symbol: string) {
            let decimal1, decimal2

            try {
                decimal1 = num.toString().split('.')[1].length
            } catch (e) {
                decimal1 = 0
            }

            try {
                decimal2 = stepNum.toString().split('.')[1].length
            } catch (e) {
                decimal2 = 0
            }

            const quantity = Math.pow(10, Math.max(decimal1, decimal2))

            if (symbol === '+') {
                return ((num * quantity) + (stepNum * quantity)) / quantity
            } else if (symbol === '-') {
                return ((num * quantity) - (stepNum * quantity)) / quantity
            }
        }
    }
</script>
