<template>
    <li class="by-menu__item"
        :class="[
      this.active ? 'by-menu__item--active' : '',
      this.disabled ? 'by-menu__item--disabled' : ''
    ]"
        @click="handleClick">
        <router-link v-if="to && Object.keys(to).length"
                     class="by-menu__item-link"
                     ref="link"
                     :to="to">
            <slot></slot>
        </router-link>
        <div v-else
             class="by-menu__item-link">
            <slot></slot>
        </div>
    </li>
</template>

<script lang="ts">
    import { Vue, Component, Prop, PropSync, Watch, Mixins } from "vue-property-decorator";
    import Emitter from "mixins/emitter";
    import { findComponentsUpward } from 'By-UI/utils/util';

    @Component({
        name: 'ByMenuItem'
    })
    export default class ByMenuItem extends Mixins(Emitter) {
        @Prop()
        name?: [string, number];

        @Prop({
            type: [Object, String],
            default: () => { return {} }
        })
        to?: [object, string];

        @Prop({
            type: Boolean,
            default: false
        })
        replace?: boolean;

        @Prop({
            type: Boolean,
            default: false
        })
        disabled?: boolean;

        active = false;

        handleClick(evt: any) {
            evt.preventDefault()
            if (this.disabled) return
            const parents = findComponentsUpward(this, 'ByMenuSub')
            if (parents && parents.length) {
                parents.forEach(parent => {
                    parent.$emit('on-menu-item-select', this)
                })
            } else {
                this.dispatch('ByMenu', 'on-menu-item-select', this)
            }
        }

        mounted() {
            this.$on('on-update-active', (name: any) => {
                this.$nextTick(() => {
                    if (this.name === name || (this.$refs.link && (this.$refs.link as any).$el.classList.contains('router-link-active'))) {
                        this.active = true

                        const parents = findComponentsUpward(this, 'ByMenuSub')
                        if (parents && parents.length) {
                            parents.forEach(parent => {
                                parent.$emit('on-update-active', true)
                            })
                        }
                    } else {
                        this.active = false
                    }
                })
            })
        }
    }
</script>
