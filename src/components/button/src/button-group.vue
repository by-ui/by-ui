<template>
    <div class="by-btn-group"
         :class="[ size ? `at-btn-group--${size}` : '']">
        <slot></slot>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class MyComponent extends Vue {

        @Prop()
        size?: string;

    }
</script>
