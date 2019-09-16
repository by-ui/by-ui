<template>
    <div class="by-breadcrumb">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    @Component
    export default class Breadcrumb extends Vue {
        @Prop({
            default: '/'
        })
        separator?: string;

    }
</script>
