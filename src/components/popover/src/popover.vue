<template>
    <div class="by-popover" v-clickoutside="handleClose" ref="parent">
    <span class="by-popover__trigger" ref="trigger">
      <slot></slot>
    </span>

    <transition :name="transition" @after-leave="doDestory">
      <div
        class="by-popover__popper"
        :class="[
          placement ? 'by-popover--' + placement : 'by-popover--top'
        ]"
        v-if="show"
        ref="popover">
        <div class="by-popover__arrow"></div>
        <div class="by-popover__title" v-if="title">
          <slot name="title"><div v-html="title"></div></slot>
        </div>
        <div class="by-popover__content">
          <slot name="content"><div v-html="content"></div></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch, Mixins } from "vue-property-decorator";
    import PopoverMixin from 'mixins/popover'
    import Clickoutside from 'By-UI/directives/clickoutside'

    @Component({
        directives:{
            Clickoutside
        }
    })
    export default class ByPopover extends Mixins(PopoverMixin) {
        @Prop({
            type: String,
            default: 'click'
        })
        trigger?: string;

        @Prop({
            type: String,
            default: 'fade'
        })
        transition?: string;

        show:boolean = false;

        @Watch("value")
        watchValue(val: any) {
            this.show = val
        }

        handleClose () {
            this.show = false
        }
    }
</script>
