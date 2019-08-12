<template>
    <div class="by-checkbox-group">
        <slot></slot>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Mixins, Watch } from "vue-property-decorator";
    import TwoWay from "mixins/two-way";

    import { findComponentsDownward } from '@docs/utils/util'

    @Component
    export default class ByCheckboxGroup extends Vue {

        @Prop({
            default: [],
            type: Array
        })
        value?: any[];

        childrens = [];

        currentValue = this.value;

        change(data: any) {
            this.currentValue = data
            this.$emit('input', data)
            this.$emit('on-change', data)
        }

        updateModel() {
            const value = this.currentValue || [];
            this.childrens = findComponentsDownward(this, 'ByCheckbox');
            if (Object.keys(this.childrens).length > 0) {
                this.childrens.forEach((child: any) => {
                    child.model = value;
                    child.currentValue = value.indexOf(child.label) >= 0;
                    child.isGroup = true;
                })
            }
        }

        @Watch('value')
        onWatchValue(val: any) {
            this.updateModel();
        }

        mounted() {
            this.updateModel()
        }
    }
</script>
<style lang="scss" scoped>
    .main-class {
    }
</style>
