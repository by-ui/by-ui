<template>
    <div class="by-step"
         :class="stepStatusClass"
         :style="stepStyle">
        <div v-if="!isLastStep"
             class="by-step__line"></div>
        <div class="by-step__head">
            <div class="by-step__label"
                 :class="{ 'by-step__icon': icon }">
                <div v-if="icon">
                    <i :class="['icon', `${icon}`]"></i>
                </div>
                <template v-else>
                    <div v-if="['process', 'wait'].indexOf(finalStatus) > -1"
                         class="by-step__order">
                        {{ index + 1 }}
                    </div>
                    <div v-if="finalStatus === 'finish'">
                        <i class="icon icon-check"></i>
                    </div>
                    <div v-if="finalStatus === 'error'">
                        <i class="icon icon-x"></i>
                    </div>
                </template>
            </div>
        </div>
        <div class="by-step__main">
            <div class="by-step__title">{{ title }}</div>
            <div class="by-step__description"
                 v-if="description">{{ description }}</div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import Step from './step.vue';

    @Component
    export default class StepItem extends Vue {

        @Prop()
        title?: string;

        @Prop()
        icon?: string;

        @Prop()
        description?: string;

        @Prop({
            validator: val => ['wait', 'process', 'finish', 'error'].indexOf(val) > -1
        })
        status?: string;

        index = -1;

        internalStatus = '';

        nextError = false;

        get stepStyle() {
            const style: any = {};
            if ((this.$parent as Step).direction !== 'vertical') {
                style.width = `${1 / this.stepsTotal * 100}%`
            }
            return style
        }

        get stepsTotal() {
            return (this.$parent as Step).steps.length
        }

        get finalStatus() {
            return this.status || this.internalStatus
        }

        get isLastStep() {
            return this.index === this.stepsTotal - 1
        }

        get stepStatusClass() {
            const className = {}

            switch (this.finalStatus) {
                case 'process':
                    className['by-step--process'] = true
                    break
                case 'wait':
                    className['by-step--wait'] = true
                    break
                case 'finish':
                    className['by-step--finish'] = true
                    break
                case 'error':
                    className['by-step--error'] = true
                    break
            }

            if (this.nextError) {
                className['by-step--next-error'] = true
            }

            return className
        }

        beforeCreate() {
            (this.$parent as Step).steps.push(this);
        }

        beforeDestroy() {
            const steps = (this.$parent as Step).steps;
            const index = steps.indexOf(this);

            if (index >= 0) {
                steps.splice(index, 1)
            }
        }
    }
</script>
