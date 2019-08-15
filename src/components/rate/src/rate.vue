<template>
    <div class="by-rate">
        <ul class="by-rate__list"
            :class="{ 'by-rate--disabled': disabled }"
            @mouseover="overRateHandle"
            @mouseleave="leaveRateHandle">
            <li class="by-rate__item"
                :class="clacClass(index)"
                v-for="index in count"
                :key="index">
                <i :class="['icon', 'by-rate__icon', icon]"
                   :style="getActivityColor(index)"
                   @mousemove="moveStarHandle(index, $event)"
                   @click="confirmValue(index)">
                    <span :class="['icon', 'by-rate__left', icon]"
                          type="half"></span>
                </i>
            </li>
        </ul>
        <div class="by-rate__text"
             v-if="showText">
            <slot>{{ currentValue }}</slot>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    @Component
    export default class ByRate extends Vue {

        @Prop({
            default: 0,
            type: Number
        })
        value!: number;

        @Prop({
            default: false,
            type: Boolean
        })
        disabled?: boolean;

        @Prop({
            default: 'icon-star-on',
            type: String
        })
        icon?: string;

        @Prop({
            default: false,
            type: Boolean
        })
        showText?: boolean;

        @Prop({
            default: 5,
            type: Number
        })
        count!: number;

        @Prop({
            default: false,
            type: Boolean
        })
        allowHalf!: boolean;

        @Prop({
            default: '#FFC82C',
            type: String
        })
        activecolor!: string;

        hoverIndex = -1;

        lastHoverIndex = -1;

        isHoverRate = false;

        currentValue = this.value;

        isHalf = false;

        getActivityColor(index: number) {
            return this.currentValue >= index ? { color: this.activecolor } : '';
        }

        overRateHandle() {
            if (this.disabled) return
            this.isHoverRate = true
        }

        leaveRateHandle() {
            if (this.disabled) return
            this.isHoverRate = false
            this.hoverIndex = -1
            this.lastHoverIndex = -1
            this.checkIsHalf(this.currentValue)
        }

        moveStarHandle(index: number, event: any) {
            if (this.disabled) return;
            this.hoverIndex = index;


            if (this.allowHalf && event.target.getAttribute('type') === 'half') {
                this.isHalf = true
            } else {
                this.isHalf = false
            }

            // emit hover-change event
            const exactlyHoverIndex = this.isHalf ? index - 0.5 : index
            if (exactlyHoverIndex !== this.lastHoverIndex) {
                this.$emit('on-hover-change', exactlyHoverIndex)
            }

            this.lastHoverIndex = exactlyHoverIndex;
        }

        confirmValue(index: number) {
            if (this.disabled) return
            this.currentValue = this.isHalf ? index - 0.5 : index;
            this.$emit('on-change', this.currentValue)
            this.$emit('input', this.currentValue)
        }

        clacClass(index: number) {
            const STAR_ON_CLASS_NAME = 'by-rate__item--on'
            const STAR_OFF_CLASS_NAME = 'by-rate__item--off'
            const STAR_HALF_CLASS_NAME = 'by-rate__item--half'

            const isHalf = this.isHalf
            const isHoverStar = this.hoverIndex !== -1
            const currentIndex: number = isHoverStar ? this.hoverIndex : this.currentValue || -1;
            const lastItemIndex = Math.ceil(currentIndex)

            return {
                [STAR_ON_CLASS_NAME]: isHalf ? index < lastItemIndex : index <= lastItemIndex,
                [STAR_HALF_CLASS_NAME]: (index === lastItemIndex) && isHalf,
                [STAR_OFF_CLASS_NAME]: index > lastItemIndex
            }
        }

        checkIsHalf(val: number) {
            this.isHalf = this.allowHalf && val.toString().indexOf('.') >= 0
        }

        @Watch('value')
        onValChange(value: number) {
            this.currentValue = value;
        }

        @Watch('currentValue')
        onCurrentValueChange(value: number) {
            this.checkIsHalf(value);
        }
    }
</script>
