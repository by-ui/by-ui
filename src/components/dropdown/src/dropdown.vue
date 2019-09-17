<template>
    <div class="by-dropdown"
         v-clickoutside="handleClose"
         ref="trigger">
        <div class="by-dropdown__trigger">
            <slot></slot>
        </div>
        <transition name="slide-up"
                    @after-leave="doDestory">
            <div class="by-dropdown__popover"
                 ref="popover"
                 v-show="show">
                <slot name="menu"></slot>
            </div>
        </transition>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Mixins, Watch } from "vue-property-decorator";

    import Clickoutside from 'By-UI/directives/clickoutside';
    import PopoverMixin from 'By-UI/mixins/popover';

    @Component({
        directives: {
            Clickoutside
        }
    })
    export default class ByDropdown extends Mixins(PopoverMixin) {

        @Prop({
            default: 'hover',
            validator: val => ['click', 'hover', 'focus'].indexOf(val) > -1
        })
        trigger?: string;

        @Prop({
            default: 'bottom',
            validator: val => ['top', 'top-left', 'top-right', 'left', 'left-top', 'left-bottom', 'right', 'right-top', 'right-bottom', 'bottom', 'bottom-left', 'bottom-right'].indexOf(val) > -1
        })
        placement!: string;

        handleClose() {
            this.show = false;
        }

        handleMenuItemClick(name: string) {
            this.show = false;
            // 触发时间
            this.$emit('on-dropdown-command', name);
        }

        mounted() {
            // 注册事件
            this.$on('menu-item-click', this.handleMenuItemClick);
        }
    }
</script>
