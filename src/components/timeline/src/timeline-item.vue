<template>
    <div class="by-timeline__item"
         :class="{  'by-timeline__item--last': isLastItem,
                    'by-timeline__item--pending': isPendingItem,
                    'by-timeline__item--custom': !!this.$slots.dot,
                    [`by-timeline__item--${status}`]: status }">
        <div class="by-timeline__tail"></div>
        <div class="by-timeline__dot">
            <slot name="dot"></slot>
        </div>
        <div class="by-timeline__content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component({
        name: 'ByTimeLineItem'
    })
    export default class ByTimeLineItem extends Vue {

        @Prop({
            type: String,
            default: 'blue'
        })
        color?: String;

        colors = {
            blue: 'default',
            red: 'error',
            green: 'success',
            yellow: 'warning'
        };

        defaultColor = 'blue';

        isLastItem = false;

        isPendingItem = false;

        get status() {
            const colorKey = this.color || '';
            const status = this.colors[`${colorKey}`] || this.colors[this.defaultColor];

            return status;
        }

        checkForLast() {
            const children = this.$parent.$children;
            const index = children.indexOf(this);
            const isPending = (this.$parent as any).pending;
            const lastItemIndex = isPending ? (children.length - 2) : (children.length - 1);

            this.isLastItem = index === lastItemIndex;

            if (isPending) {
                this.isPendingItem = (index === lastItemIndex + 1);
            }
        }

        mounted() {
            this.checkForLast()
        }
    }
</script>
