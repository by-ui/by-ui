<template>
    <div class="by-btn">
        <span class="by-btn__text">
            mybutton
            <slot></slot>
        </span>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class ByButton extends Vue {
    }
</script>
<style lang="scss" scoped>
    .button {
    }
</style>
