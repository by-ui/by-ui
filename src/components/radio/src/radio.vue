<template>
    <label class="by-radio">
        <span class="by-radio__input">
            <span class="by-radio__inner"
                  :class="{
          'by-radio--focus': focus,
          'by-radio--checked': store === label,
          'by-radio--disabled': disabled
        }"></span>
            <input type="radio"
                   class="by-radio__original"
                   v-model="store"
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
import { Vue, Component, Prop, PropSync, Watch, Mixins } from "vue-property-decorator";
import Emitter from "mixins/emitter";
@Component
export default class ByRadio extends Mixins(Emitter) {
    @Prop()
    value?: [string, number];

    @Prop()
    name?: string;

    @Prop()
    label!: [string, number];

    @Prop({
        default: false
    })
    disabled?: boolean;
    store: any = '';
    focus = false;
    isGroup = false;

    @Watch("store")
    watchStore(store: [string, number]) {
        this.$emit("input", store);
        if (this.isGroup) {
            this.dispatch("ByRadioGroup", "input", store);
        }
    }

    @Watch("value")
    watchValue(val: [string, number]) {
        this.store = val;
    }

    mounted() {
        this.store = this.value
        this.$on("init-data", (data: [string, number]) => {
            this.store = data;
            this.isGroup = true;
        });
    }
}
</script>
