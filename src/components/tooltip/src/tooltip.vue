<template>
    <div class="by-tooltip">
        <span class="by-tooltip__trigger"
              ref="trigger">
            <slot></slot>
        </span>

        <transition :name="transition"
                    @after-leave="doDestory">
            <div class="by-tooltip__popper"
                 :class="[
          placement ? 'by-tooltip--' + placement : 'by-tooltip--top'
        ]"
                 v-if="show"
                 ref="popover">
                <div class="by-tooltip__arrow"></div>
                <div class="by-tooltip__content">
                    <slot name="content">
                        <div v-text="content"></div>
                    </slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch, Mixins } from "vue-property-decorator";
    import PopoverMixin from 'mixins/popover'

    @Component
    export default class ByTooltip extends Mixins(PopoverMixin) {
        @Prop({
            type: String,
            default: 'hover'
        })
        trigger?: string;

        @Prop({
            type: String,
            default: 'fade'
        })
        transition?: string;
    }
</script>
