<template>
    <li class="by-dropdown-menu__item"
        :class="{ 'by-dropdown-menu__item--disabled': disabled, 'by-dropdown-menu__item--divided': divided }"
        @click.stop="handleClick">
        <slot></slot>
    </li>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class ByDropdownItem extends Vue {

        @Prop()
        name?: string | number;

        @Prop({
            default: false
        })
        disabled?: boolean;

        @Prop({
            default: false
        })
        divided?: boolean;

        handleClick() {
            if (this.disabled) return;
            (this as any).dispatch('ByDropdown', 'menu-item-click', this.name);
        }

    }
</script>
