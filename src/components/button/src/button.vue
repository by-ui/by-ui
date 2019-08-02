<template>
    <div class="by-btn"
         :disabled="disabled"
         :class="[
            type && `by-btn--${type}`,
            size && `by-btn--${size}`,
         ]">
        <span class="by-btn__text">
            <slot></slot>
        </span>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, PropSync } from "vue-property-decorator";

    @Component
    export default class ByButton extends Vue {
        /**
         * 类型
         * 可选值：default primary success error warning info text
         */
        @Prop({
            default: 'default'
        })
        type?: string;

        /**
         * 尺寸
         * 可选值： large small smaller
         */
        @Prop()
        size?: string;

        /**
         * 是否禁用
         * 可选值： true false
         */
        @Prop({
            default: false,
            type: Boolean
        })
        disabled?: boolean;
    }
</script>
<style lang="scss" scoped>
    .button {
    }
</style>
