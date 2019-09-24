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

        // @Prop({
        //     default: false
        // })
        // showMessage?: boolean;

        get form() {
            let parent: any = this.$parent
            while (parent.$options.name !== 'ByForm') {
                parent = parent.$parent
            }
            return parent
        }

        get labelStyles() {
            const style:any = new Object();
            const labelWidth = this.labelWidth || (this.form as Form).labelWidth;

            if (labelWidth) {
                style.width = `${labelWidth}px`
            }
            console.log((this.form as Form).labelWidth);
            return style
        }

        get fieldValue() {
            const model = this.form.model
            if (!model || !this.prop) return

            let path = this.prop
            if (path.indexOf(':') !== -1) {
                path = path.replace(/:/, '.')
            }
            return getPropByPath(model, path).v
        }

        get contentStyles() {
            const style:any = new Object();
            const labelWidth = this.labelWidth || (this.form as Form).labelWidth;
            const labelPosition = (this.form as Form).labelPosition || '';

            if (labelWidth && this.label && labelPosition != 'top') {
                style.marginLeft = `${labelWidth}px`
            }

            return style
        }

        showMessage = false;

        isRequired = false;

        validateState = '';

        validateMessage = '';

        validateDisabled = false;

        validator = new Object();

        initialValue: any = null;

        getRules() {
            let formRules = this.form.rules
            const selfRules = this.rules

            formRules = formRules && this.prop ? formRules[this.prop] : []

            return [].concat(selfRules || formRules || [])
        }

        getFilteredRule(trigger: string) {
            const rules = this.getRules()
            return rules.filter((rule: any) => !rule.trigger || (rule.trigger.indexOf(trigger) !== -1))
        }

        validate(trigger: string, callback = function (message?: string) { }) {
            const rules = this.getFilteredRule(trigger)
            if (!rules || rules.length === 0) {
                callback()
                return true
            }

            this.validateState = 'validating'

            const descriptor = {}
            this.prop && (descriptor[this.prop] = rules);

            const validator = new AsyncValidator(descriptor);
            const model = {}

            this.prop && (model[this.prop] = this.fieldValue);
            validator.validate(model, (errors: any, fields: any) => {
                this.validateState = errors ? 'error' : 'success'
                this.validateMessage = errors ? errors[0].message : ''
                this.showMessage = true;
                callback(this.validateMessage);
            })
        }

        resetField() {
            this.validateState = ''
            this.validateMessage = ''

            const model = this.form.model
            const value = this.fieldValue
            let path = this.prop || '';
            if (path.indexOf(':') !== -1) {
                path = path.replace(/:/, '.')
            }

            const prop = getPropByPath(model, path)

            if (Array.isArray(value) && value.length > 0) {
                this.validateDisabled = true
                prop.o[prop.k] = []
            } else if (value !== this.initialValue) {
                this.validateDisabled = true
                prop.o[prop.k] = this.initialValue
            }
        }

        onFieldBlur() {
            this.validate('blur')
        }

        onFieldChange() {
            if (this.validateDisabled) {
                this.validateDisabled = false
                return
            }
            this.validate('change')
        }

        mounted() {
            if (this.prop) {
                this.dispatch('ByForm', 'on-form-item-add', this)

                Object.defineProperty(this, 'initialValue', {
                    value: this.fieldValue
                })

                const rules = this.getRules()

                if (rules.length) {
                    rules.every((rule: any) => {
                        if (rule.required) {
                            this.isRequired = true
                            return false
                        }
                        return true
                    })
                    this.$on('on-form-item-blur', this.onFieldBlur)
                    this.$on('on-form-item-change', this.onFieldChange)
                }
            }
        }

        beforeDestroy() {
            this.dispatch('AtForm', 'on-form-item-remove', this)
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


    function getPropByPath(obj: any, path: string) {
        let tmpObj = obj
        path = path.replace(/\[(\w+)\]/g, '.$1')
        path = path.replace(/^\./, '')

        const keyArr = path.split('.')
        let i = 0

        for (let len = keyArr.length; i < len - 1; i++) {
            const key = keyArr[i]
            if (key in tmpObj) {
                tmpObj = tmpObj[key]
            } else {
                throw new Error('Please transfer a valid prop path to form item')
            }
        }

        return {
            o: tmpObj,
            k: keyArr[i],
            v: tmpObj[keyArr[i]]
        }
    }

</script>
