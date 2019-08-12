<template>
    <label class="by-checkbox"
           :class="{
      'by-checkbox--focus': focus,
      'by-checkbox--checked': currentValue,
      'by-checkbox--disabled': disabled
    }">
        <span class="by-checkbox__input">
            <span class="by-checkbox__inner"></span>
            <!-- <input v-if="isGroup"
                   type="checkbox"
                   class="by-checkbox__original"
                   v-model="currentValue"
                   :name="name"
                   :value="label"
                   :disabled="disabled"
                   @change="change"
                   @focus="focus = true"
                   @blur="focus = false"> -->
            <input type="checkbox"
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
    import { Vue, Component, Mixins, Prop } from "vue-property-decorator";
    import TwoWay from "mixins/two-way";

    @Component
    export default class ByCheckbox extends Mixins(TwoWay) {

        @Prop({
            default: false,
            type: Boolean
        })
        disabled?: boolean;

        @Prop()
        name?: string;

        focus = false;

        change(){
            this.currentValue = !this.currentValue;
        }

        mounted() {
            console.log(this.currentValue);
        }

    }
</script>
<style lang="scss" scoped>
    .main-class {
    }
</style>
