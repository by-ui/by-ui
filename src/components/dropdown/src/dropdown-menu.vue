<template>
    <ul class="by-dropdown-menu">
        <slot></slot>
    </ul>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class ByDropdownMenu extends Vue {
    }
</script>
