<template>
    <div class="menu">
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Menu extends Vue {
}
</script>
<style lang="scss" scoped>
.menu {
}
</style>