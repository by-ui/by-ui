<template>
    <li class="by-menu__submenu"
        :class="[
      this.active ? 'by-menu__submenu--active' : '',
      this.isOpen ? 'by-menu__submenu--opened' : '',
      this.disabled ? 'by-menu__submenu--disabled' : ''
    ]"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        ref="trigger">
        <div class="by-menu__submenu-title"
             ref="reference"
             @click.stop="handleClick">
            <slot name="title"></slot>
            <i class="icon icon-chevron-down by-menu__submenu-icon"></i>
        </div>
        <collapse-transition v-if="mode === 'inline'">
            <ul class="by-menu"
                v-show="isOpen">
                <slot></slot>
            </ul>
        </collapse-transition>
        <transition name="slide-up"
                    v-else>
            <div class="by-dropdown__popover"
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
    import { Vue, Component, Prop, Watch, Mixins } from "vue-property-decorator";
    import CollapseTransition from 'By-UI/utils/collapse-transition';
    import { getStyle, findComponentUpward } from 'By-UI/utils/util';
    import Emitter from 'mixins/emitter';
    import PopoverMixin from 'mixins/popover';

    @Component({
        components: {
            CollapseTransition
        }
    })
    export default class ByMenuSub extends Mixins(Emitter, PopoverMixin) {

        @Prop({
            type: Boolean,
            default: false
        })
        disabled?: boolean;

        @Prop({
            type: Boolean,
            default: false
        })
        opened?: boolean;

        active = false;
        isOpen = this.opened;
        dropWidth = getStyle(this.$el, 'width');
        parentMenu = findComponentUpward(this, 'ByMenu');
        timeout:any = {};

        get mode() {
            return this.parentMenu.mode
        }

        get inlineCollapsed() {
            return this.parentMenu.inlineCollapsed
        }

        get dropStyle() {
            return {
                'min-width': this.dropWidth
            }
        }

        get placementValue() {
            return this.mode === 'vertical' ? 'right-top' : 'bottom'
        }

        @Watch("mode")
        watchMode(val: any) {
            if (val !== 'inline') {
                this.isOpen = false
                // this.handleMouseLeave()
            }
        }

        @Watch("isOpen")
        watchIsOpen(val: any) {
            if (this.mode === 'inline') return
            if (val) {
                this.dropWidth = getStyle(this.$el, 'width')
                this.resetDropdownPosition()
            }
        }

        resetDropdownPosition() {
            const popover = (this.$refs.popover as any)
            const trigger = (this.$refs.trigger as any)
            const parent = this.$parent
            const name = parent.$options.name

            if (this.mode === 'vertical') {
                popover.style.left = 'initial'
                popover.style.right = `-${trigger.offsetWidth + 4}px`
                popover.style.top = '0'
            } else if (parent && name !== 'BySubmenu') {
                popover.style.left = '0'
                popover.style.right = 'initial'
                popover.style.top = `${trigger.offsetHeight + 2}px`
            } else {
                popover.style.left = 'initial'
                popover.style.right = `-${trigger.offsetWidth + 4}px`
                popover.style.top = '0'
            }
        }

        handleClick() {
            if (this.disabled || this.mode !== 'inline') return

            const opened = this.isOpen
            if (this.inlineCollapsed) {
                this.parentMenu.$children.forEach((item:any) => {
                    if (item.$options.name === 'BySubmenu') {
                        item.isOpen = false
                    }
                })
            }
            this.isOpen = !opened
        }

        handleMouseEnter() {
            if (this.disabled || this.mode === 'inline') return

            // handle mousemove event
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.isOpen = true
            }, 200)
        }

        handleMouseLeave() {
            if (this.disabled || this.mode === 'inline') return

            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.isOpen = false
            }, 200)
        }

        mounted() {
            this.$on('on-menu-item-select', (name: any) => {
                if (this.mode !== 'inline') {
                    this.isOpen = false
                }
                this.dispatch('ByMenu', 'on-menu-item-select', name)
            })
            this.$on('on-update-active', (status: any) => {
                this.active = status
            })
        }
    }
</script>
