<template>
    <label class="by-checkbox"
           :class="{
      'by-checkbox--focus': focus,
      'by-checkbox--checked': currentValue,
      'by-checkbox--disabled': disabled
    }">
        <span class="by-checkbox__input">
            <span class="by-checkbox__inner"></span>
            <input v-if="isGroup"
                   type="checkbox"
                   class="by-checkbox__original"
                   v-model="model"
                   :name="name"
                   :value="label"
                   :disabled="disabled"
                   @change="change"
                   @focus="focus = true"
                   @blur="focus = false">
            <input v-else
                   type="checkbox"
                   class="by-checkbox__original"
                   :name="name"
                   :disabled="disabled"
                   :checked="currentValue"
                   @change="change"
                   @focus="focus = true"
                   @blur="focus = false">
        </span>
        <span class="by-checkbox__label">
            <slot></slot>
        </span>
    </label>
</template>
<script lang="ts">
    import { Vue, Component, Mixins, Prop, Watch } from "vue-property-decorator";

    import { findComponentUpward } from '@docs/utils/util';
    import ByCheckboxGroup from './by-checkbox-group.vue';

    @Component
    export default class ByCheckbox extends Vue {

        @Prop({
            default: false,
            type: Boolean
        })
        disabled?: boolean;

        @Prop()
        name?: string;

        @Prop({
            default: false,
        })
        value?: any;

        @Prop()
        label?: string | number | boolean;

        @Prop({
            default: false,
            type: Boolean
        })
        checked?: boolean;

        focus = false;

        isGroup = false;

        model = [];

        currentValue = this.value;

        updateModel() {
            this.currentValue = this.value
        }

        change(evt: any) {
            if (this.disabled) return false;

            const checked = evt.target.checked;
            this.currentValue = checked;

            const value = checked;
            this.$emit('input', value);

            if (this.isGroup) {
                (this.$parent as ByCheckboxGroup).change(this.model);
            } else {
                this.$emit('on-change', value);
            }
        }

        mounted() {
            const parent = findComponentUpward(this, 'ByCheckboxGroup');

            if (parent) {
                this.isGroup = true;
                (this.$parent as ByCheckboxGroup).updateModel();
            } else {
                this.updateModel();
            }

            if (this.checked) {
                this.currentValue = this.checked;
            }
        }
    }
</script>
