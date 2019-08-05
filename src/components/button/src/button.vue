<template>
    <button class="by-btn"
            :class="[
                type && `by-btn--${type}`,
                size && `by-btn--${size}`,
                plain && `by-btn--${type}--plain`,
                circle && 'by-btn--circle',
                round && 'by-btn--round',
            ]"
            :disabled="disabled">
        <i class="by-btn__icon icon"
           :class="icon"
           v-if="icon"></i>
        <i class="by-btn__loading icon icon-loader"
           v-if="loading"></i>
        <span class="by-btn__text"
              v-if="$slots.default">
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

        /**
         * 是否圆角
         * 可选值： true false
         */
        @Prop({
            default: false,
            type: Boolean
        })
        round?: boolean;

        /**
         * 按钮是否圆形
         */
        @Prop({
            default: false,
            type: Boolean
        })
        circle?: boolean;

        /**
         * 图标 类名
         */
        @Prop()
        icon?: string;

        /**
         * 加载图标
         */
        @Prop({
            default: false,
            type: Boolean
        })
        loading?: boolean;

        /**
         * 尺寸
         * 可选值
         */
    }
</script>
<style lang="scss" scoped>
    .button {
    }
</style>
