<template>
    <span class="by-tag by-tag--default">
        <span class="at-tag__text">标签四</span>
        <i class="icon icon-x at-tag__close"></i>
    </span>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class MyComponent extends Vue {}
</script>
<style lang="scss" scoped>
.by-tag {
}
</style>