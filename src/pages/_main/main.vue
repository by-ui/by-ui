<template>
    <div class="app-main">
        <app-layout>
            <router-view></router-view>
        </app-layout>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class AppMain extends Vue {
}
</script>
<style lang="scss" scoped>
.app-main {
    height: 100%;
}
</style>
