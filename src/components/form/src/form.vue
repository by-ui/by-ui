<template>
    <form class="el-form"
          :class="[ labelPosition ? 'el-form--label-' + labelPosition : '', { 'el-form--inline': inline }]">
        <slot></slot>
    </form>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Provide } from "vue-property-decorator";
    import objectAssign from '@/mixins/merge';

    @Component
    export default class ByForm extends Vue {

        @Prop()
        model?: any;

        @Prop()
        rules?: any;

        @Prop()
        labelPosition?: string;

        @Prop()
        labelWidth?: string;

        @Prop({
            default: ''
        })
        labelSuffix?: string;

        @Prop()
        inline?: boolean;

        @Prop()
        inlineMessage?: boolean;

        @Prop()
        statusIcon?: boolean;

        @Prop({
            default: true
        })
        showMessage?: boolean;

        @Prop()
        size?: string;

        @Prop()
        disabled?: boolean;

        @Prop({
            default: true
        })
        validateOnRuleChange?: boolean;

        @Prop({
            default: false
        })
        hideRequiredAsterisk?: boolean;

        @Provide()
        elForm = this;

        get autoLabelWidth() {
            if (!this.potentialLabelWidthArr.length) return 0;
            const max = Math.max(...this.potentialLabelWidthArr);
            return max ? `${max}px` : '';
        }

        fields: any[] = [];

        potentialLabelWidthArr: any[] = []; // use this array to calculate auto width

        resetFields() {
            if (!this.model) {
                console.warn('[Element Warn][Form]model is required for resetFields to work.');
                return;
            }
            this.fields.forEach(field => {
                field.resetField();
            });
        }

        clearValidate(props = []) {
            const fields = props.length ? (typeof props === 'string'
                ? this.fields.filter(field => props === field.prop)
                : this.fields.filter((field: any) =>{
                     return props.indexOf(field.prop) > -1
                })
            ) : this.fields;
            fields.forEach(field => {
                field.clearValidate();
            });
        }

        validate(callback: any) {
            if (!this.model) {
                console.warn('[Form]model is required for validate to work!');
                return;
            }

            let promise;
            // if no callback, return promise
            if (typeof callback !== 'function' && (window as window).Promise) {
                promise = new Promise((resolve: any, reject: any) => {
                    callback = function (valid: any) {
                        valid ? resolve(valid) : reject(valid);
                    };
                });
            }

            let valid = true;
            let count = 0;
            // 如果需要验证的fields为空，调用验证时立刻返回callback
            if (this.fields.length === 0 && callback) {
                callback(true);
            }
            let invalidFields = {};
            this.fields.forEach(field => {
                field.validate('', (message: any, field: any) => {
                    if (message) {
                        valid = false;
                    }
                    invalidFields = objectAssign({}, invalidFields, field);
                    if (typeof callback === 'function' && ++count === this.fields.length) {
                        callback(valid, invalidFields);
                    }
                });
            });

            if (promise) {
                return promise;
            }
        }

        validateField(props: any, cb: any) {
            props = [].concat(props);
            const fields = this.fields.filter(field => props.indexOf(field.prop) !== -1);
            if (!fields.length) {
                console.warn('[Element Warn]please pass correct props!');
                return;
            }

            fields.forEach(field => {
                field.validate('', cb);
            });
        }

        getLabelWidthIndex(width: string) {
            const index = this.potentialLabelWidthArr.indexOf(width);
            // it's impossible
            if (index === -1) {
                throw new Error('[ElementForm]unpected width');
            }
            return index;
        }

        registerLabelWidth(val: any, oldVal: any) {
            if (val && oldVal) {
                const index = this.getLabelWidthIndex(oldVal);
                this.potentialLabelWidthArr.splice(index, 1, val);
            } else if (val) {
                this.potentialLabelWidthArr.push(val);
            }
        }

        deregisterLabelWidth(val: any) {
            const index = this.getLabelWidthIndex(val);
            this.potentialLabelWidthArr.splice(index, 1);
        }

        created() {
            this.$on('el.form.addField', (field: any) => {
                if (field) {
                    this.fields.push(field);
                }
            });
            /* istanbul ignore next */
            this.$on('el.form.removeField', (field: any) => {
                if (field.prop) {
                    this.fields.splice(this.fields.indexOf(field), 1);
                }
            });
        }
    }
</script>
