<template>
    <ul class="by-menu"
        :class="[
      theme ? `by-menu--${theme}` : '',
      mode ? `by-menu--${mode}` : ''
    ]"
        :style="ulStyle">
        <slot></slot>
    </ul>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch, Mixins } from "vue-property-decorator";
    import Emitter from "mixins/emitter";
    import { findComponentsDownward } from 'By-UI/utils/util'

    @Component({
        name: 'ByMenu',
    })
    export default class ByMenu extends Mixins(Emitter) {
        @Prop({
            default: 'light',
            validator: val => ['light', 'dark'].indexOf(val) > -1
        })
        theme?: string;

        @Prop({
            default: 'inline',
            validator: val => ['inline', 'horizontal', 'vertical'].indexOf(val) > -1
        })
        mode?: string;

        @Prop({
            type: [String, Number]
        })
        activeName?: [string, number];

        @Prop({
            type: Boolean,
            default: false
        })
        inlineCollapsed?: boolean;

        @Prop({
            type: String,
            default: '240px'
        })
        width?: string;

        @Prop({
            type: Boolean,
            default: false
        })
        router?: boolean;

        currentActiveName: any = '';

        get ulStyle() {
            const style: any = {}

            if (this.mode === 'inline' || this.mode === 'vertical') {
                style.width = this.width
            }

            return style
        }

        @Watch("activeName")
        watchActiveName(val: any) {
            this.currentActiveName = val
        }

        @Watch("currentActiveName")
        watchCurrentActiveName(val: any) {
            this.updateActiveName()
        }

        updateActiveName() {
            if (typeof this.currentActiveName === 'undefined') {
                this.currentActiveName = -1
            }

            const submenus = findComponentsDownward(this, 'ByMenuSub')

            if (submenus && submenus.length) {
                submenus.forEach(submenu => {
                    submenu.$emit('on-update-active', false)
                })
            }
            this.broadcast('ByMenuItem', 'on-update-active', this.currentActiveName)
        }

        routeToMenuItem(item: any) {
            const route = item.to || {}
            item.replace ? this.$router.replace(route) : this.$router.push(route)
        }

        mounted() {
            this.currentActiveName = this.activeName
            this.updateActiveName()
            this.$on('on-menu-item-select', (item: any) => {
                this.currentActiveName = item.name
                this.$emit('on-select', item.name)

                if (this.router) {
                    this.routeToMenuItem(item)
                }
            })
        }
    }
</script>
