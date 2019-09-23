<template>
    <div :class="[
    'by-form-item',
    {
      ['by-form-item--required']: this.required || this.isRequired,
      ['by-form-item--error']: this.validateState === 'error',
      ['by-form-item--validating']: this.validateState === 'validating'
    }]">
        <label class="by-form-item__label"
               :style="labelStyles"
               v-if="label">
            <slot name="label">{{ label }}</slot>
        </label>
        <div class="by-form-item__content"
             :style="contentStyles">
            <slot></slot>
            <transition name="fade">
                <div class="by-form-item__error-tip"
                     v-if="validateState === 'error' && showMessage && form.showMessage">
                    {{ validateMessage }}
                </div>
            </transition>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Mixins, Watch } from "vue-property-decorator";
    import AsyncValidator from 'async-validator';
    import Emitter from "mixins/emitter";

    import Form from './form.vue'

    @Component
    export default class ByFormItem extends Mixins(Emitter) {

        @Prop({
            default: ''
        })
        label?: string;

        @Prop()
        labelWidth?: number;

        @Prop()
        prop?: string;

        @Prop({
            default: false
        })
        required?: boolean;

        @Prop()
        rules?: object | any[];

        @Prop()
        error?: string;

        @Prop()
        validateStatus?: boolean;

        @Prop({
            default: false
        })
        showMessage?: boolean;

        get form() {
            let parent: any = this.$parent
            while (parent.$options.name !== 'ByForm') {
                parent = parent.$parent
            }
            return parent
        }

        get labelStyles() {
            const style = {
                width: ''
            };
            const labelWidth = this.labelWidth || (this.form as Form).labelWidth;

            if (labelWidth) {
                style.width = `${labelWidth}px`
            }
            return style
        }

        get fieldValue() {
            return ''
        }

        get contentStyles() {
            const style = {
                marginLeft: ''
            }
            const labelWidth = this.labelWidth || (this.form as Form).labelWidth;

            if (labelWidth) {
                style.marginLeft = `${labelWidth}px`
            }

            return style
        }

        isRequired = false;

        validateState = '';

        validateMessage = '';

        validateDisabled = false;

        validator = new Object();

        getRules() {
            let formRules = (this.form as Form).rules;
            const selfRules = Array.isArray(this.rules) ? this.rules : [];

            formRules = formRules && this.prop ? formRules[this.prop] : [];

            let temp: any[] = [];

            return temp.concat(selfRules || formRules || [])
        }

        getFilteredRule(trigger: string) {
            const rules = this.getRules()
            return rules.filter(rule => !rule.trigger || (rule.trigger.indexOf(trigger) !== -1))
        }

        validate(trigger: string, callback = function (message?:string) { }) {
            const rules = this.getFilteredRule(trigger)

            if (!rules || rules.length === 0) {
                callback()
                return true
            }

            this.validateState = 'validating'

            const descriptor = {}
            this.prop && (descriptor[this.prop] = rules);

            const validator = new AsyncValidator(descriptor)
            const model = {}

            this.prop && (model[this.prop] = this.fieldValue);

            validator.validate(model, { firstFields: true }, (errors: any) => {
                this.validateState = errors ? 'error' : 'success'
                this.validateMessage = errors ? errors[0].message : ''
                callback(this.validateMessage)
            })
        }

        @Watch('error')
        onErrorChange(val: string) {
            this.validateMessage = val
            this.validateState = 'error'
        }

        @Watch('validateStatus')
        onValidateStatusChange(val: string) {
            this.validateState = val;
        }
    }
</script>
