<template>
    <div class="menu-1-1">
        <bread-crumb></bread-crumb>
        menu-1-1
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import BreadCrumb from "@/components/breadcrumb/breadcrumb.vue"

@Component({
    components: {
        BreadCrumb
    }
})
export default class Menu1_1 extends Vue {
}
</script>
<style lang="scss" scoped>
.menu-1-1 {
}
</style>