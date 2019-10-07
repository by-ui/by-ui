<template>
    <span class="by-badge"
          :class="[ status ? `by-badge--${status}` : '', { 'by-badge--alone': !$slots.default }]">
        <slot></slot>
        <sup class="by-badge__content"
             :class="{ 'by-badge--corner': $slots.default, 'by-badge--dot': dot }"
             v-show="show"
             v-text="content"></sup>
    </span>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component({
        name: "ByBadge",
    })
    export default class ByBadge extends Vue {
        @Prop({
            default: ''
        })
        value!: string | number;

        @Prop({
            type: Number,
            default: 99
        })
        maxNum!: number;

        @Prop({
            type: Boolean,
            default: false
        })
        dot!: boolean;

        @Prop({
            type: Boolean,
            default: true
        })
        show!: boolean;

        @Prop({
            type: String,
            default: ''
        })
        status!: string;

        get content() {
            if (this.dot) return;

            const value = this.value;
            const maxNum = this.maxNum;

            if (typeof value === 'number' && typeof maxNum === 'number') {
                return value > maxNum ? `${maxNum}+` : value;
            }

            return value;
        }
    }
</script>
