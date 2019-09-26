<template>
    <div>
        <transition name="fade">
            <div class="by-modal__mask"
                 v-show="visible"
                 @click="handleMaskClick"></div>
        </transition>
        <!-- / mask -->
        <div class="by-modal__wrapper"
             :class="{
        'by-modal--hidden': !wrapShow,
        'by-modal--confirm': isIconType,
        [`by-modal--confirm-${type}`]: isIconType
      }"
             @click.self="handleWrapperClick">
            <transition name="fade">
                <div class="by-modal"
                     :style="modalStyle"
                     v-show="visible">
                    <div class="by-modal__header"
                         v-if="showHead && ($slots.header || this.title)">
                        <div class="by-modal__title">
                            <slot name="header">
                                <p>{{ title }}</p>
                            </slot>
                        </div>
                    </div>
                    <div class="by-modal__body">
                        <slot>
                            <p>{{ content }}</p>
                            <div class="by-modal__input"
                                 v-if="showInput">
                                <by-input v-model="inputValue"
                                          :placeholder="inputPlaceholder"
                                          @keyup.enter.native="handleAction('confirm')"
                                          ref="input"></by-input>
                            </div>
                        </slot>
                    </div>
                    <div class="by-modal__footer"
                         v-if="showFooter">
                        <slot name="footer">
                            <by-button v-show="showCancelButton"
                                       @click.native="handleAction('cancel')">{{ localeCancelText }}</by-button>
                            <by-button type="primary"
                                       v-show="showConfirmButton"
                                       @click.native="handleAction('confirm')">{{ localeOKText }}</by-button>
                        </slot>
                    </div>
                    <i v-if="isIconType"
                       class="icon by-modal__icon"
                       :class="iconClass"></i>
                    <span v-if="showClose"
                          class="by-modal__close"
                          @click="handleAction('cancel')"><i class="icon icon-x"></i></span>
                </div>
            </transition>
        </div>
        <!-- / wrap -->
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, PropSync, Watch, Mixins } from "vue-property-decorator";
    import Emitter from "mixins/emitter";
    import { findComponentsUpward } from 'By-UI/utils/util';

    @Component
    export default class ByModal extends Mixins(Emitter) {
        @Prop()
        title?: string;

        @Prop()
        content?: string;

        @Prop({
            type: Boolean,
            default: false
        })
        value?: boolean;

        @Prop()
        cancelText?: string;

        @Prop()
        okText?: string;

        @Prop({
            type: Boolean,
            default: true
        })
        maskClosable?: boolean;

        @Prop({
            type: Boolean,
            default: true
        })
        showHead?: boolean;

        @Prop({
            type: Boolean,
            default: true
        })
        showClose?: boolean;

        @Prop({
            type: Boolean,
            default: true
        })
        showFooter?: boolean;

        @Prop({
            type: Boolean,
            default: true
        })
        showInput?: boolean;

        @Prop({
            type: [Number, String],
            default: 520
        })
        width?: [number, string];

        @Prop({
            type: Boolean,
            default: true
        })
        closeOnPressEsc?: boolean;

        @Prop({
            type: Object,
            default: () => { }
        })
        styles?: object;

        @Prop()
        type!: string;

        wrapShow = false;
        showCancelButton = true;
        showConfirmButton = true;
        action = '';
        visible = this.value;
        inputValue = null;
        inputPlaceholder = '';
        callback: any = null;
        timer: any = {};

        get iconClass() {
            const classArr = {
                'success': 'icon-check-circle',
                'error': 'icon-x-circle',
                'warning': 'icon-alert-circle',
                'info': 'icon-info'
            }

            return classArr[this.type] || ''
        }

        get isIconType() {
            return ['success', 'error', 'warning', 'info'].indexOf(this.type) > -1
        }

        get modalStyle() {
            const style = {}
            const styleWidth = {
                width: `${this.width}px`
            }

            Object.assign(style, styleWidth, this.styles)

            return style
        }

        get localeOKText() {
            return (typeof this.okText === 'undefined') ? "确定" : this.okText
        }

        get localeCancelText() {
            return (typeof this.cancelText === 'undefined') ? "取消" : this.cancelText
        }


        @Watch("value")
        watchValue(val: any) {
            this.visible = val
        }

        @Watch("visible")
        watchVisible(val: any) {
            if (val) {
                if (this.timer) {
                    clearTimeout(this.timer)
                }
                this.wrapShow = true
            } else {
                this.timer = setTimeout(() => {
                    this.wrapShow = false
                }, 300)
            }
        }

        doClose() {
            this.visible = false
            this.$emit('input', false)
            this.$emit('on-cancel')

            if (this.action && this.callback) {
                this.callback(this.action, this)
            }
        }

        handleMaskClick(evt: any) {
            if (this.maskClosable) {
                this.doClose()
            }
        }

        handleWrapperClick(evt: any) {
            if (this.maskClosable) {
                this.doClose()
            }
        }

        handleAction(action: any) {
            this.action = action

            if (action === 'confirm') {
                this.$emit('input', false)
                this.$emit('on-confirm')
            }

            this.doClose()
        }

        handleKeyCode(evt: any) {
            if (this.visible && this.showClose) {
                if (evt.keyCode === 27) { // Escape
                    this.doClose()
                }
            }
        }

        mounted() {
            if (this.visible) {
                this.wrapShow = true
            }

            document.addEventListener('keydown', this.handleKeyCode)
        }

        beforeDestory() {
            document.removeEventListener('keydown', this.handleKeyCode)
        }
    }
</script>
