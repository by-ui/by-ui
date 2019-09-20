<template>
    <div class="by-form-item">
        <label class="el-form-item__label"
               :style="labelStyle"
               v-if="label || $slots.label">
            <slot name="label">{{label + form.labelSuffix}}</slot>
        </label>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class MyComponent extends Vue {
        @Prop({
            default: ''
        })
        label?: string;

        @Prop()
        labelWidth?: string;

        get labelStyle() {
            const ret: any = {};
            const labelWidth = this.labelWidth || this.form.labelWidth;
            if (labelWidth) {
                ret.width = labelWidth;
            }
            return ret;
        }

        get form() {
            let parent = this.$parent;
            let parentName = parent.$options.componentName;
            while (parentName !== 'ElForm') {
                if (parentName === 'ElFormItem') {
                    this.isNested = true;
                }
                parent = parent.$parent;
                parentName = parent.$options.componentName;
            }
            return parent;
        }
    }
</script>
<style lang="scss" scoped>
    .main-class {
    }
</style>
