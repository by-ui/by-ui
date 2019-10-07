<template>
    <span class="by-breadcrumb__item">
        <a v-if="href || (to && Object.keys(to).length)"
           class="by-breadcrumb__link"
           @click="handleClick">
            <slot></slot>
        </a>
        <span v-else
              class="by_breadcrumb__text">
            <slot></slot>
        </span>
        <span class="by-breadcrumb__separator"
              v-html="separator"></span>
    </span>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    @Component({
        name: "ByBreadcrumbItem",
    })
    export default class ByBreadcrumbItem extends Vue {
        @Prop()
        href?: string;

        @Prop({
            default: function(){
                return {}
            }
        })
        to?: object | string;

        @Prop({
            type: Boolean,
            default: false
        })
        replace?: boolean;

        separator = '';

        handleClick() {
            const to = this.to || {}
            const href = this.href

            if (href) {
                window.location.href = href
            } else {
                this.replace ? this.$router.replace(to) : this.$router.push(to)
            }
        }

        mounted() {
            this.separator = this.$parent["separator"]
        }
    }
</script>
