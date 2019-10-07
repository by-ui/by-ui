<template>
    <div class="by-steps"
         :class="[ direction === 'vertical' ? 'by-steps--vertical' : 'by-steps--horizontal', size === 'small' ? 'by-steps--small' : '' ]">
        <slot></slot>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    @Component({
        name: 'BySteps',
    })
    export default class BySteps extends Vue {
        @Prop({
            default: 0,
            validator: val => val >= 0
        })
        current!: number;

        @Prop({
            default: 'process',
            validator: val => ['wait', 'process', 'finish', 'error'].indexOf(val) > -1
        })
        status!: string;

        @Prop({
            default: 'default',
            validator: val => ['default', 'small'].indexOf(val) > -1
        })
        size!: string;

        @Prop({
            default: 'horizontal',
            validator: val => ['horizontal', 'vertical'].indexOf(val) > -1
        })
        direction!: string;

        steps: any[] = [];

        updateStepsStatus() {
            const current = this.current
            const status = this.status

            this.steps.forEach((child: any, index: number) => {
                const prevChild: any = this.steps[index - 1]

                if (index === current) {
                    if (status === 'error') {
                        child.internalStatus = 'error'
                        prevChild && (prevChild.nextError = true)
                    } else {
                        child.internalStatus = 'process'
                    }
                } else if (index < current) {
                    child.internalStatus = 'finish'
                } else {
                    child.internalStatus = 'wait'
                }

                if (child.finalStatus !== 'error' && prevChild) {
                    prevChild.nextError = false
                }
            })
        }

        @Watch('current')
        onCurrentChange(newVal: string) {
            this.updateStepsStatus()
        }

        @Watch('steps')
        onStepstChange(newVal: any[]) {
            newVal.forEach((step, index) => {
                step.index = index
            })
            this.updateStepsStatus()
        }

        mounted() {
            this.updateStepsStatus()
        }

    }
</script>
