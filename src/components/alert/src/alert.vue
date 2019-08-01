<template>
    <div class="alert"></div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class Alert extends Vue {
        mounted() {
            alert(213);
        }
    }
</script>
<style lang="scss" scoped>
    .alert {
    }
</style>
