<template>
    <li
    class="by-menu__submenu"
    :class="[
      this.active ? 'by-menu__submenu--active' : '',
      this.isOpen ? 'by-menu__submenu--opened' : '',
      this.disabled ? 'by-menu__submenu--disabled' : ''
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="trigger">
    <div class="by-menu__submenu-title" ref="reference" @click.stop="handleClick">
      <slot name="title"></slot>
      <i class="icon icon-chevron-down by-menu__submenu-icon"></i>
    </div>
    <collapse-transition v-if="mode === 'inline'">
      <ul class="by-menu" v-show="isOpen"><slot></slot></ul>
    </collapse-transition>
    <transition name="slide-up" v-else>
      <div
        class="by-dropdown__popover"
        placement="placementValue"
        :style="dropStyle"
        ref="popover"
        v-show="isOpen">
        <ul class="by-dropdown-menu">
          <slot></slot>
        </ul>
      </div>
    </transition>
  </li>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";
    import CollapseTransition from 'utils/collapse-transition';
    import { getStyle, findComponentUpward } from 'utils/util';
    import Emitter from 'mixins/emitter';
  import PopoverMixin from 'mixins/popover';

    @Component
    export default class Progress extends Vue {
        @Prop()
        type?: string;

        @Prop({
            default: '',
            validator: val => ['', 'success', 'error'].indexOf(val) > -1
        })
        status?: string;

        @Prop({
            type: Number,
            default: 0
        })
        percent?: number;

        @Prop()
        strokeWidth?: number;

        currentStatus = this.status;

        get barStyle() {
            return {
                height: `${this.strokeWidth}px`
            };
        }

        get statusIconClass() {
            return this.currentStatus === "success"
                ? "icon-check-circle"
                : "icon-x-circle";
        }

        @Watch("percent")
        watchPercent(val: number) {
            this.handleChange(val | 0);
        }

        handleChange(val: number | undefined) {
            if (val === 100) {
                this.currentStatus = "success";
                this.$emit("on-status-success", this.percent);
            } else {
                this.currentStatus = this.status;
            }
        }
        mounted() {
            this.handleChange(this.percent);
        }
    }
</script>
