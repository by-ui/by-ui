<template>
    <div class="by-message__wrapper"
         :style="{
      top: top ? `${top}px` : 'auto'
    }">
        <transition name="move-up"
                    @after-leave="doDestory">
            <div class="by-message"
                 :class="{
          [`by-message--${type}`]: type
        }"
                 v-show="visible">
                <i class="icon by-message__icon"
                   :class="iconClass"></i>
                <span class="by-message__content">{{ message }}</span>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Alert extends Vue {
    message = "";
    duration = 3000;
    type = "info";
    icon = "";
    visible = false;
    timer: any = {};
    closed = false;
    onClose: any = {};
    top = null;

    get iconClass() {
        const classArr = {
            success: "icon-check-circle",
            error: "icon-x-circle",
            warning: "icon-alert-circle",
            info: "icon-info",
            loading: "icon-loader"
        };

        return this.icon || classArr[this.type];
    }

    @Watch("closed")
    watchCloses(value: boolean) {
        if (value) {
            this.visible = false;
        }
    }

    doDestory() {
        this.$destroy();
        (this.$el as any).parentNode.removeChild(this.$el);
    }

    close() {
        this.closed = true;
        if (typeof this.onClose === "function") {
            this.onClose();
        }
    }

    startTimer() {
        if (this.duration) {
            this.timer = setTimeout(() => {
                !this.closed && this.close();
            }, this.duration);
        }
    }

    clearTimer() {
        this.timer && clearTimeout(this.timer);
    }

    mounted() {
        this.startTimer();
    }
}
</script>
