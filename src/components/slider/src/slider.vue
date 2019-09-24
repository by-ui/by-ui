<template>
    <div class="by-slider">
        <!-- S InputNumber -->
        <by-input-number class="by-slider__input"
                         v-model="inputValue"
                         v-show="false"
                         :step="step"
                         :disabled="disabled"
                         :min="min"
                         :max="max"
                         @keyup.native="onInputChange"></by-input-number>
        <!-- E InputNumber -->

        <!-- S slider track -->
        <div class="by-slider__track"
             :class="{
        'by-slider--disabled': disabled
      }"
             @click="onSliderClick"
             ref="slider">
            <div class="by-slider__bar"
                 :style="{ 'width': currentPosition }"></div>

            <!-- S tooltip and dot -->
            <div class="by-slider__dot-wrapper"
                 :class="{
          'by-slider__dot-wrapper--hover': isHover,
          'by-slider__dot-wrapper--drag': isDrag
        }"
                 :style="{ 'left': currentPosition }"
                 @mouseenter="handleMouseEnter"
                 @mouseleave="handleMouseLeave"
                 @mousedown="handleMouseDown">
                <by-tooltip placement="top"
                            trigger="click"
                            content="Top value"
                            ref="tooltip">
                    <div class="by-slider__dot"
                         :class="{
              'by-slider__dot--hover': isHover,
              'by-slider__dot--drag': isDrag
            }"></div>
                    <span slot="content">{{ value }}</span>
                </by-tooltip>
            </div>
            <!-- E tooltip and dot -->
        </div>
        <!-- E slider track -->
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync, Watch, Mixins } from "vue-property-decorator";
import ByTooltip from 'By-UI/components/tooltip'
import ByInputNumber from 'By-UI/components/input-number'
import { getStyle } from 'By-UI/utils/utils'

@Component({
    components: {
        ByInputNumber,
        ByTooltip
    }
})
export default class BySlider extends Vue {
    @Prop({
        default: 0
    })
    value?: Number | string

    @Prop({
        default: false
    })
    disabled?: Boolean

    @Prop({
        default: 0
    })
    min?: Number

    @Prop({
        default: 100
    })
    max?: Number

    @Prop({
        default: 1
    })
    step?: Number

    inputValue: any = null
    isHover = false
    isDrag = false
    startX = 0
    currentX = 0
    oldValue = this.value
    startPos = 0
    newPos: any = null
    _timer: any = null
    currentPosition = `${(Number(this.value) - Number(this.min)) * 100 / (Number(this.max) - Number(this.min))}%`


    @Watch('inputValue')
    watchInputValue(newVal: any) {
        this.$emit('input', Number(newVal))
    }

    @Watch('value')
    watchValue(val: number) {
        if (typeof val !== 'number' || isNaN(val) || val < Number(this.min)) {
            this.$emit('input', this.min)
            return
        }

        if (val > Number(this.max)) {
            this.$emit('input', this.max)
            return
        }

        this.inputValue = val
        this.setPosition((val - Number(this.min)) * 100 / (Number(this.max) - Number(this.min)))
    }

    get sliderWidth() {
        return parseInt(getStyle(this.$refs.slider, 'width'))
    }

    handleMouseEnter() {
        clearTimeout(this._timer)
        this.isHover = true;
        (this.$refs.tooltip as ByTooltip).showPopover()
    }
    handleMouseLeave() {
        if (this.isDrag) return
        this.isHover = false
        this._timer = setTimeout(() => {
            (this.$refs.tooltip as ByTooltip).show = false
        }, 200)
    }
    handleMouseDown(evt: any) {
        if (this.disabled) return
        this.onDragStart(evt)

        window.addEventListener('mousemove', this.onDragging)
        window.addEventListener('mouseup', this.onDragEnd)
    }
    onDragStart(evt: any) {
        this.isDrag = true
        this.startX = evt.clientX
        this.startPos = parseInt(this.currentPosition)
    }
    onDragging(evt: any) {
        if (this.isDrag) {
            let diff = 0;

            (this.$refs.tooltip as ByTooltip).showPopover()
            this.currentX = evt.clientX
            diff = (this.currentX - this.startX) * 100 / this.sliderWidth
            this.newPos = this.startPos + diff
            this.setPosition(this.newPos)
        }
    }
    onDragEnd() {
        if (this.isDrag) {
            (this.$refs.tooltip as ByTooltip).show = false
            this.isDrag = false
            this.setPosition(this.newPos)

            window.removeEventListener('mousemove', this.onDragging)
            window.removeEventListener('mouseup', this.onDragEnd)
        }
    }
    setPosition(pos: number) {
        if (pos < 0) {
            pos = 0
        } else if (pos > 100) {
            pos = 100
        }

        const lengthPerStep = 100 / ((Number(this.max) - Number(this.min)) / Number(this.step))
        const steps = Math.round(pos / lengthPerStep)
        let value = (steps * lengthPerStep * (Number(this.max) - Number(this.min)) * 0.01) + Number(this.min)

        value = parseFloat(value.toFixed(0))

        this.$emit('input', value)
        this.currentPosition = `${(Number(this.value) - Number(this.min)) * 100 / (Number(this.max) - Number(this.min))}%`

        if (!this.isDrag && this.value !== this.oldValue) {
            this.$emit('change', this.value)
            this.oldValue = this.value
        }
    }
    onSliderClick(evt: any) {
        if (this.disabled || this.isDrag) return
        const sliderOffsetLeft = (this.$refs.slider as HTMLDivElement).getBoundingClientRect().left
        this.setPosition((evt.clientX - sliderOffsetLeft) / this.sliderWidth * 100)
    }
    onInputChange() {
        if (this.value === '') return
        if (this.value) {
            this.setPosition((Number(this.value) - Number(this.min)) * 100 / (Number(this.max) - Number(this.min)))
        }
    }
    created() {
        if (typeof this.value !== 'number' || isNaN(this.value) || this.value < Number(this.min)) {
            this.$emit('input', this.min)
        } else if (this.value > Number(this.max)) {
            this.$emit('input', this.max)
        }

        this.inputValue = this.inputValue || this.value
    }
}
</script>
