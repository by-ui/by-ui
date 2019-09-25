<template>
    <ul class="by-option-group">
        <li class="by-option-group__label">{{ label }}</li>
        <ul class="by-option-group__list">
            <slot></slot>
        </ul>
    </ul>
</template>
<script lang="ts">
import { Vue, Component, Prop, PropSync, Watch, Mixins } from "vue-property-decorator";
@Component
export default class ByOptionGroup extends Vue {
    @Prop()
    label!: string
}
  // export default {
  //   name: 'AtOptionGroup',
  //   props: {
  //     label: {
  //       type: String,
  //       required: true
  //     }
  //   }
  // }
</script>
