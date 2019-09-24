<template>
    <ul class="by-menu__item-group">
        <li class="by-menu__item-group-title">{{ title }}</li>
        <ul class="by-menu__item-group-list">
            <slot></slot>
        </ul>
    </ul>
</template>

<script lang="ts">
    import { Vue, Component, Prop, PropSync, Watch } from "vue-property-decorator";

    @Component
    export default class ByMenuItemGroup extends Vue {
        @Prop({
            default: ''
        })
        title?: string;
    }
</script>
