<template>
    <div class="by-collapse__item"
         :class="{
      'by-collapse__item--active': isActive,
      'by-collapse__item--disabled': disabled
    }">
        <div class="by-collapse__header"
             @click="toggle">
            <i class="icon by-collapse__icon icon-chevron-right"></i>
            <slot name="title"
                  v-if="$slots.title"></slot>
            <div v-else>{{ title }}</div>
        </div>
        <collapse-transition>
            <div class="by-collapse__body"
                 v-show="isActive">
                <div class="by-collapse__content">
                    <slot></slot>
                </div>
            </div>
        </collapse-transition>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import CollapseTransition from "@/utils/collapse-transition";

@Component({
    components: {
        CollapseTransition
    }
})
export default class CollapseItem extends Vue {
    @Prop({
        default: ""
    })
    title?: string;

    @Prop({
        default: ""
    })
    name?: string;

    @Prop({
        default: false,
        type: Boolean
    })
    disabled?: boolean;

    index = 0;
    isActive = false;

    toggle() {
        if (this.disabled) return false;
        console.log(this.isActive);
        (this.$parent as any).toggle({
            name: this.name || this.index,
            isActive: this.isActive
        });
    }
}
</script>
