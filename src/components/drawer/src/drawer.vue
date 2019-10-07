<template>
    <transition name="by-drawer-fade"
                @after-enter="afterEnter"
                @after-leave="afterLeave">
        <div class="by-dialog__wrapper"
             v-show="visible">
            <div class="by-drawer__container"
                 :class="visible && 'by-drawer__open'"
                 @click.self="handleWrapperClick"
                 tabindex="-1">
                <div aria-modal="true"
                     aria-labelledby="by-drawer__title"
                     class="by-drawer"
                     :class="[direction, customClass]"
                     :style="isHorizontal ? `width: ${size}` : `height: ${size}`"
                     ref="drawer">
                    <header class="by-drawer__header"
                            id="by-drawer__title">
                        <slot name="title">
                            <span role="heading">{{ title }}</span>
                        </slot>
                        <button :aria-label="`close ${title || 'drawer'}`"
                                class="by-drawer__close-btn"
                                type="button"
                                v-if="showClose"
                                @click="closeDrawer">
                            <i class="by-dialog__close by-icon by-icon-close"></i>
                        </button>
                    </header>
                </div>
            </div>
        </div>
    </transition>
</template>
<script lang="ts">
    import { Vue, Component, Prop, PropSync, Watch, Mixins } from "vue-property-decorator";
    import Emitter from "mixins/emitter";
    import Popup from "mixins/popup";

    @Component({
        name: 'ByDrawer'
    })
    export default class ByDrawer extends Mixins(Emitter, Popup) {
        @Prop({
            default: true
        })
        appendToBody?: boolean;

        @Prop()
        beforeClose?: Function;

        @Prop({
            default: ''
        })
        customClass?: string;

        @Prop({
            default: false
        })
        destroyOnClose?: boolean;

        @Prop({
            default: true
        })
        modal?: boolean;

        @Prop({
            default: 'rtl',
            validator: (val) => {
                return ['ltr', 'rtl', 'ttb', 'btt'].indexOf(val) !== -1;
            }
        })
        direction?: string;

        @Prop({
            default: true
        })
        showClose?: boolean;

        @Prop({
            default: '30%'
        })
        size?: string;

        @Prop({
            default: ''
        })
        title?: string;

        @Prop()
        visible?: boolean;

        @Prop({
            default: true
        })
        wrapperClosable?: boolean;

        get isHorizontal() {
            return this.direction === 'rtl' || this.direction === 'ltr';
        }

        closed = false;

        @Watch('visible')
        onVisibleChange(val: boolean) {
            if (val) {
                this.closed = false;
                this.$emit('open');
                if (this.appendToBody) {
                    document.body.appendChild(this.$el);
                    this.open();
                }
            } else {
                if (!this.closed) this.$emit('close');
                else{ this.close(); }
            }
        }

        afterEnter() {
            this.$emit('opened');
        }

        afterLeave() {
            this.$emit('closed');
        }

        hide(cancel?: boolean) {
            if (cancel !== false) {
                this.$emit('update:visible', false);
                this.$emit('close');
                if (this.destroyOnClose === true) {
                    this.rendered = false;
                }
                this.closed = true;
            }
        }

        handleWrapperClick() {
            if (this.wrapperClosable) {
                this.closeDrawer();
            }
        }

        closeDrawer() {
            if (typeof this.beforeClose === 'function') {
                this.beforeClose(this.hide);
            } else {
                this.hide();
            }
        }

        mounted() {
            if (this.visible) {
                this.rendered = true;
                this.open();
            }
        }

        destroyed() {
            // if appendToBody is true, remove DOM node after destroy
            if (this.appendToBody && this.$el && this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .drawer {
    }
</style>
