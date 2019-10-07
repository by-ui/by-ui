<template>
    <ul class="by-dropdown-menu">
        <slot></slot>
    </ul>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component({
        name: 'ByDropdownMenu'
    })
    export default class ByDropdownMenu extends Vue {
        mounted(){

            this.$on('test', (name: string) => {
                console.log(name);
            });

        }
    }
</script>
