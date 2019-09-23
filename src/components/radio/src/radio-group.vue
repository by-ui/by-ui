<template>
    <div class="by-radio-group">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync, Watch, Mixins } from "vue-property-decorator";
import Emitter from "mixins/emitter";

@Component
export default class ByRadioGroup extends Mixins(Emitter) {
    @Prop()
    value?: [string, number];

    @Prop({
        default:'normal'
    })
    size?: string;

    @Prop()
    fill?: string;

    @Prop()
    textColor?: string;

    @Watch("value")
    wathcValue(value: [string, number]) {
        this.$emit("radio-group-change", value);
        this.broadcast("ByRadio", "init-data", value);
    }

    mounted(){
        this.broadcast("ByRadio", "init-data", this.value);
    }
}
</script>
