<template>
    <button class="by-btn"
            :class="[
                type && `by-btn--${type}`,
                size && `by-btn--${size}`,
                plain && `by-btn--${type}--plain`,
                {
                    'is-round': round
                }
            ]"
            :disabled="disabled">
        <span class="by-btn__text">
            <slot></slot>
        </span>
    </button>
</template>
<script lang="ts">
    import { Vue, Component, Prop, PropSync, Watch } from "vue-property-decorator";

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
         * 是否空心
         * 可选值： true false
         */
        @Prop({
            default: false,
            type: Boolean
        })
        plain?: boolean;

        /**
         * 是否禁用
         * 可选值： true false
         */
        @Prop({
            default: false,
            type: Boolean
        })
        disabled?: boolean;

        @Prop({
            default: false,
            type: Boolean
        })
        round?: boolean;
    }
</script>
<style lang="scss" scoped>
    .button {
    }
</style>
