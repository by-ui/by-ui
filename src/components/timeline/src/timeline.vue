<template>
    <div class="by-timeline"
         :class="{ 'by-timeline--pending': pending }">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    @Component
    export default class TimeLine extends Vue {

        @Prop({
            type: Boolean,
            default: false
        })
        pending?: Boolean;

        @Watch('pending')
        onPendingChange(newVal: any) {
            this.$children.forEach((child: any) => {
                child.checkForLast()
            })
        }

    }
</script>
