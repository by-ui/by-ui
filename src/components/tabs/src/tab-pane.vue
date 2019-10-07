<template>
    <div class="by-tabs__pane"
         v-show="show">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    @Component({
        name: 'ByTabPane'
    })
    export default class ByTabPane extends Vue {
        @Prop()
        name?: string;

        @Prop()
        label?: string;

        @Prop()
        icon?: string;

        @Prop({
            type: Boolean,
            default: false
        })
        disabled?: boolean;

        @Prop({
            type: Boolean,
            default: true
        })
        closable?: boolean;

        currentName = this.name;
        show = true;

        get isClosable() {
            return this.closable ? (this.$parent as any).closable : false
        }

        @Watch("name")
        watchName(val: any) {
            this.currentName = val
        }

        mounted() {
            (this.$parent as any).updateNav()
        }
    }
</script>
