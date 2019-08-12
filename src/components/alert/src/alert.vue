<template>
    <transition name="fade">
        <div class="by-alert"
             :class="[
        type ? `by-alert--${type}` : '',
        description ? 'by-alert--with-description' : ''
      ]"
             v-show="isShow">
            <i class="icon by-alert__icon"
               :class="[ iconClass ]"
               v-if="showIcon"></i>
            <div class="by-alert__content">
                <p class="by-alert__message"
                   v-if="message"
                   v-text="message"></p>
                <p class="by-alert__description"
                   v-if="description"
                   v-text="description"></p>
            </div>
            <i class="icon by-alert__close"
               :class="[
          closeText ? 'by-alert__close--custom' : 'icon-x'
        ]"
               v-show="closable || closeText"
               @click="handleClose"
               v-text="closeText"></i>
        </div>
    </transition>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Alert extends Vue {
    @Prop({
        default: "info"
    })
    type!: string;

    @Prop({
        default: ""
    })
    message!: string;

    @Prop({
        default: ""
    })
    description?: string;

    @Prop({
        default: false,
        type: Boolean
    })
    closable?: boolean;

    @Prop({
        default: false,
        type: Boolean
    })
    showIcon?: boolean;

    @Prop({
        default: "info"
    })
    icon?: string;

    @Prop({
        default: ""
    })
    closeText?: string;

    isShow = false;

    get iconClass() {
        const classArr = {
            success: "icon-check-circle",
            error: "icon-x-circle",
            warning: "icon-alert-circle",
            info: "icon-info"
        };
        return classArr[this.type] || this.icon;
    }

    handleClose () {
      this.isShow = false
      this.$emit('on-close')
    }
}
</script>
