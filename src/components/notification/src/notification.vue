<template>
    <transition name="notification-fade"
                @after-leave="doDestory">
        <div class="by-notification"
             :class="{[
                        `by-notification--${type}`]: type,
                        'by-notification--with-message': message,
                        'by-notification--hover': !showClose
                    }"
             :style="{ top: top ? top + 'px' : 'auto' }"
             v-show="isShow"
             @click="!showClose && handleClose()"
             @mouseleave="startTimer"
             @mouseenter="clearTimer">
            <i class="icon by-notification__icon"
               :class="iconClass"
               v-if="showIcon"></i>
            <div class="by-notification__content">
                <p class="by-notification__title"
                   v-if="title"
                   v-text="title"></p>
                <p class="by-notification__message"
                   v-if="message"
                   v-text="message"></p>
            </div>
            <i class="icon icon-x by-notification__close"
               v-show="showClose"
               @click="handleClose"></i>
        </div>
    </transition>
</template>
<script lang="ts">
    import { Vue, Component, Watch } from "vue-property-decorator";

    @Component({
        name: 'Notification'
    })
    export default class Notification extends Vue {

        type = '';

        title = '';

        message = '';

        isShow = false;

        duration = 4000;

        icon = '';

        showClose = true;

        onClose: any = null;

        top = null;

        timer: any = null;

        closed = false;

        get iconClass() {
            const classArr = {
                'success': 'icon-check-circle',
                'error': 'icon-x-circle',
                'warning': 'icon-alert-circle',
                'info': 'icon-info'
            }
            return classArr[this.type] || this.icon;
        }

        get showIcon() {
            return this.type;
        }

        doDestory() {
            this.$destroy();
            (this.$el.parentNode as HTMLElement).removeChild(this.$el);
        }

        handleClose() {
            this.closed = true;
            if (typeof this.onClose === 'function') {
                this.onClose()
            }
        }

        startTimer() {
            if (this.duration > 0) {
                this.timer = setTimeout(() => {
                    if (!this.closed) {
                        this.handleClose()
                    }
                }, this.duration);
            }
        }

        clearTimer() {
            clearTimeout(this.timer);
        }

        mounted() {
            this.startTimer()
        }

        @Watch('closed')
        onWatchClosedChange(val: boolean) {
            val && (this.isShow = false);
        }
    }
</script>
