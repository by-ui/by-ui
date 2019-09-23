<template>
    <form class="by-form"
          :class="[ inline ? 'by-form--inline' : '']">
        <slot></slot>
    </form>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    @Component
    export default class ByForm extends Vue {

        @Prop()
        model?: object;

        @Prop()
        rules?: object;

        @Prop()
        labelWidth?: number;

        @Prop({
            validator: val => ['horizontal', 'vertical', 'inline'].indexOf(val) > -1
        })
        layout?: string;

        @Prop({
            default: true
        })
        showMessage?: boolean;

        @Prop({
            default: false
        })
        inline?: boolean;

        fields: any[] = [];

        /**
         * 重置表单
         */
        resetFields() {
            this.fields.forEach(field => {
                field.resetField()
            })
        }

        /**
         * 验证表单
         */
        validate(callback?: any) {
            let valid = true
            let count = 0
            this.fields.forEach((field: any) => {
                field.validate('', (errors: any) => {
                    if (errors) {
                        valid = false
                    }
                    if (typeof callback === 'function' && (++count) === this.fields.length) {
                        callback(valid)
                    }
                })
            })
        }

        /**
         * 验证表单字段
         */
        validateField(prop: string, callback: any) {
            const field: any = this.fields.filter((field: any) => field.prop === prop)[0];

            if (!field) {
                throw new Error('Must call validateField with valid prop string!')
            }

            field.validate('', callback);
        }

        @Watch('rules')
        onRulesChange(val: any) {
            this.validate();
        }

        created() {
            this.$on('on-form-item-add', (field: any) => {
                field && this.fields.push(field);
            })

            this.$on('on-form-item-remove', (field: any) => {
                field.prop && this.fields.splice(this.fields.indexOf(field), 1);
            })
        }
    }
</script>
<style lang="scss" scoped>
    .main-class {
    }
</style>
210.8
