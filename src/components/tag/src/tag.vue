<template>
    <transition name="fade">
        <span class="by-tag"
              :class="[
                    colorClass
                ]"
              :style="colorStyle">
            <span class="by-tag__text">
                <slot></slot>
            </span>
            <i class="icon icon-x by-tag__close"
               v-if="closable !== false"
               @click="closeAction"></i>
               {{closable}}
        </span>
    </transition>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

const colorArr = ["default", "primary", "success", "error", "warning", "info"];

@Component
export default class ByTag extends Vue {
    @Prop()
    name!: string;

    @Prop()
    color!: string;

    @Prop({
        default: false
    })
    closable!: boolean | null;

    get colorClass() {
        return colorArr.indexOf(this.color) > -1 ? `by-tag--${this.color}` : "";
    }

    get colorStyle() {
        if (colorArr.indexOf(this.color) > -1) return "";
        return {
            borderColor: this.color,
            backgroundColor: this.color
        };
    }

    closeAction(evt: any) {
        if (typeof this.name === "undefined") {
            this.$emit("on-close", evt);
        } else {
            this.$emit("on-close", evt, this.name);
        }
    }
}
</script>
