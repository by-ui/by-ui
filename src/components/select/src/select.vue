<template>
    <div :class="[
    'by-select',
    {
      'by-select--visible': this.visible,
      'by-select--disabled': this.disabled,
      'by-select--multiple': this.multiple,
      'by-select--single': !this.multiple,
      'by-select--show-clear': this.showCloseIcon,
      [`by-select--${this.size}`]: !!this.size
    }
    ]"
         v-clickoutside="handleClose">
        <!-- S Selection -->
        <div class="by-select__selection"
             ref="trigger"
             @click="toggleMenu">
            <span class="at-tag"
                  v-for="(item, index) in selectedMultiple"
                  :key="index">
                <span class="at-tag__text">{{ item.label }}</span>
                <i class="icon icon-x at-tag__close"
                   @click.stop="removeTag(index)"></i>
            </span>
            <span class="by-select__placeholder"
                  v-show="showPlaceholder && !filterable">{{ localePlaceholder }}</span>
            <span class="by-select__selected"
                  v-show="!showPlaceholder && !multiple && !filterable">{{ selectedSingle }}</span>
            <input type="text"
                   class="by-select__input"
                   :placeholder="showPlaceholder ? localePlaceholder : ''"
                   v-if="filterable"
                   v-model="query"
                   @blur="handleBlur"
                   @keydown.delete="handleInputDelete"
                   ref="input">
            <i class="icon icon-chevron-down by-select__arrow"></i>
            <i class="icon icon-x by-select__clear"
               v-show="showCloseIcon"
               @click.stop="clearSingleSelect"></i>
        </div>
        <!-- E Selection -->

        <!-- S Dropdown -->
        <transition name="slide-up"
                    @after-leave="doDestory">
            <div class="by-select__dropdown"
                 :class="[
          placement ? `by-select__dropdown--${placement}` : 'by-select__dropdown--bottom'
        ]"
                 v-show="visible"
                 ref="popover">
                <ul v-show="notFound"
                    class="by-select__not-found">
                    <li>{{ localeNotFoundText }}</li>
                </ul>
                <ul v-show="!notFound"
                    class="by-select__list"
                    ref="options">
                    <slot></slot>
                </ul>
            </div>
        </transition>
        <!-- E Dropdown -->
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, PropSync, Watch, Mixins, Provide } from "vue-property-decorator";
    import PopoverMixin from 'By-UI/mixins/popover'

    import Clickoutside from 'By-UI/directives/clickoutside'
    import Emitter from 'By-UI/mixins/emitter'
    // import Locale from 'By-UI/mixins/locale'
    import { findComponentsDownward } from 'By-UI/utils/util'
    import { watch } from "fs";

    @Component({
        directives: {
            Clickoutside
        }
    })
    export default class BySelect extends Mixins(Emitter, PopoverMixin) {
        @Provide('select')
        select = this

        @Prop({
            default: ''
        })
        value?: any

        @Prop({
            default: 'click'
        })
        trigger?: string

        @Prop({
            default: false
        })
        multiple?: boolean


        @Prop({
            default: false
        })
        disabled?: boolean

        @Prop({
            default: false
        })
        clearable?: boolean

        @Prop()
        placeholder?: string

        @Prop({
            default: false
        })
        filterable?: boolean

        @Prop({
            default: 'normal',
            validator: val => ['normal', 'small', 'large'].indexOf(val) > -1
        })
        size?: string

        @Prop({
            default: false
        })
        valueWithLabel?: boolean

        @Prop({
            default: false
        })
        notFoundText?: boolean

        @Prop({
            default: 'bottom'
        })
        placement?: string



        visible = false
        options = new Array();
        optionInstances = new Array();
        selectedSingle = ''
        selectedMultiple = new Array();
        focusIndex = 0
        query = ''
        notFound = false
        model = this.value

        get showPlaceholder() {
            let status = false

            if (this.model === '') {
                status = true
            } else if (Array.isArray(this.model) && !this.model.length) {
                status = true
            }

            return status
        }

        get showCloseIcon() {
            return !this.multiple && this.clearable && !this.showPlaceholder
        }

        get localePlaceholder() {
            return (typeof this.placeholder === 'undefined') ? '请选择' : this.placeholder
        }
        get localeNotFoundText() {
            return (typeof this.notFoundText === 'undefined') ? '无匹配数据' : this.notFoundText
        }

        @Watch('value')
        watchValue(val: any) {
            this.model = val
            if (val === '') {
                this.query = ''
            }
        }
        @Watch('model')
        watchModel() {
            this.$emit('input', this.model)
            this.modelToQuery()

            if (this.multiple) {
                this.updateMultipleSelected()
            } else {
                this.updateSingleSelected()
            }
        }

        @Watch('visible')
        watchVisible(val: any) {
            if (val) {
                if (this.multiple && this.filterable) {
                    (this.$refs.input as HTMLInputElement).focus()
                } else if (this.filterable) {
                    (this.$refs.input as HTMLInputElement).select()
                }
            } else {
                if (this.filterable) {
                    (this.$refs.input as HTMLInputElement).blur()

                    setTimeout(() => {
                        this.broadcastQuery('')
                    }, 300)
                }
                this.broadcast('Dropdown', 'on-destroy-popper')
            }
        }

        @Watch('query')
        watchQuery(val: any) {
            this.broadcast('AtOption', 'on-query-change', val)

            let isHidden = true

            this.$nextTick(() => {
                const options = findComponentsDownward(this, 'AtOption')
                options.forEach(option => {
                    if (!option.hidden) {
                        isHidden = false
                    }
                })
                this.notFound = isHidden
            })

            this.broadcast('Dropdown', 'on-update-popper')
        }
        toggleMenu() {
            if (this.disabled) return
            this.visible = !this.visible
        }
        hideMenu() {
            this.visible = false
            this.focusIndex = 0
            this.broadcast('AtOption', 'on-select-close')
        }
        handleClose() {
            this.hideMenu()
        }
        handleKeydown(evt: any) {
            if (this.visible) {
                const keyCode = evt.keyCode

                if (keyCode === 27) { // escape
                    evt.preventDefault()
                    this.hideMenu()
                } else if (keyCode === 40) { // down arrow
                    evt.preventDefault()
                    this.navigateOptions('next')
                } else if (keyCode === 38) { // up arrow
                    evt.preventDefault()
                    this.navigateOptions('prev')
                } else if (keyCode === 13) { // enter
                    evt.preventDefault()

                    let hasFocus = false

                    const options = findComponentsDownward(this, 'AtOption')
                    options.forEach(option => {
                        if (option.isFocus) {
                            hasFocus = true
                            option.doSelect()
                        }
                    })

                    if (!hasFocus) {
                        this.selectFirstOption()
                    }
                }
            }
        }
        selectFirstOption() {
            let firstOption: any = null;

            const options = findComponentsDownward(this, 'AtOption')
            options.forEach(option => {
                if (!firstOption && !option.hidden) {
                    firstOption = option
                    option.doSelect()
                }
            })
        }
        updateOptions() {
            const options: any = [];

            const optionsEle = findComponentsDownward(this, 'AtOption')
            optionsEle.forEach((option: any) => {
                options.push({
                    value: option.value,
                    label: (typeof option.label === 'undefined') ? option.$el.innerHTML : option.label
                })

                this.optionInstances.push(option)
            })

            this.options = options

            this.updateSingleSelected(true)
            this.updateMultipleSelected(true)
        }
        onOptionDestroy(index: number) {
            this.options.splice(index, 1)
            this.optionInstances.splice(index, 1)
        }
        updateSingleSelected(init = false) {
            const type = typeof this.model

            if (type === 'string' || type === 'number') {
                for (let i = 0; i < this.options.length; i++) {
                    if (this.model === this.options[i].value) {
                        this.selectedSingle = this.options[i].label
                        break
                    }
                }
            }

            this.toggleSingleSelected(this.model, init)
        }
        updateMultipleSelected(init = false) {
            if (this.multiple && Array.isArray(this.model)) {
                const selected = []

                for (let i = 0; i < this.model.length; i++) {
                    const model = this.model[i]

                    for (let j = 0; j < this.options.length; j++) {
                        const option = this.options[j]

                        if (model === option.value) {
                            selected.push({
                                value: option.value,
                                label: option.label
                            })
                        }
                    }
                }

                this.selectedMultiple = selected
            }

            this.toggleMultipleSelected(this.model, init)
        }
        clearSingleSelect() {
            if (this.showCloseIcon) {
                const options = findComponentsDownward(this, 'AtOption')
                options.forEach(option => {
                    option.selected = false
                })

                this.model = ''

                if (this.filterable) {
                    this.query = ''
                }
            }
        }
        removeTag(index: number) {
            if (this.disabled) return false
            this.model.splice(index, 1)

            if (this.filterable && this.visible) {
                (this.$refs.input as HTMLInputElement).focus()
            }

            this.broadcast('Dropdown', 'on-update-popper')
        }
        toggleSingleSelected(value: any, init = false) {
            if (this.multiple) return

            let label = ''

            const options = findComponentsDownward(this, 'AtOption')
            options.forEach(option => {
                if (option.value === value) {
                    option.selected = true
                    label = (typeof option.label === 'undefined') ? option.$el.innerHTML : option.label
                } else {
                    option.selected = false
                }
            })

            this.hideMenu()

            if (!init) {
                if (this.valueWithLabel) {
                    this.$emit('on-change', {
                        value,
                        label
                    })
                } else {
                    this.$emit('on-change', value)
                }
            }
        }
        toggleMultipleSelected(values: any, init = false) {
            if (!this.multiple) return

            const valueLabelArr = new Array()

            for (let i = 0; i < values.length; i++) {
                valueLabelArr.push({
                    value: values[i]
                })
            }

            const options = findComponentsDownward(this, 'AtOption')

            options.forEach(option => {
                const index = values.indexOf(option.value)

                if (index > -1) {
                    option.selected = true
                    valueLabelArr[index].label = (typeof option.label === 'undefined') ? option.$el.innerHTML : option.label
                } else {
                    option.selected = false
                }
            })

            if (!init) {
                if (this.valueWithLabel) {
                    this.$emit('on-change', valueLabelArr)
                } else {
                    this.$emit('on-change', values)
                }
            }
        }
        navigateOptions(direction: string) {
            if (direction === 'next') {
                const next = this.focusIndex + 1
                this.focusIndex = (this.focusIndex === this.options.length) ? 1 : next
            } else if (direction === 'prev') {
                const prev = this.focusIndex - 1
                this.focusIndex = (this.focusIndex <= 1) ? this.options.length : prev
            }

            let isValid = false
            let hasValidOption = false // avoid infinite loops

            const options = findComponentsDownward(this, 'AtOption')

            options.forEach((option, idx) => {
                if ((idx + 1) === this.focusIndex) {
                    isValid = !option.disabled && !option.hidden

                    if (isValid) {
                        option.isFocus = true
                    }
                } else {
                    option.isFocus = false
                }

                if (!option.hidden && !option.disabled) {
                    hasValidOption = true
                }
            })

            if (!isValid && hasValidOption) {
                this.navigateOptions(direction)
            }

            this.resetScrollTop()
        }
        resetScrollTop() {
            const index = this.focusIndex - 1
            const bottomOverflowDistance = this.optionInstances[index].$el.getBoundingClientRect().bottom - (this.$refs.popover as HTMLDivElement).getBoundingClientRect().bottom

            if (bottomOverflowDistance) {
                (this.$refs.popover as HTMLDivElement).scrollTop += bottomOverflowDistance
            }
        }
        handleFocus() {
            (this.$refs.input as HTMLInputElement).select()
        }
        handleBlur() {
            setTimeout(() => {
                if (!this.multiple && this.model !== '') {
                    const options = findComponentsDownward(this, 'AtOption')
                    options.forEach(option => {
                        if (option.value === this.model) {
                            this.query = (typeof option.label === 'undefined') ? option.searchLabel : option.label
                        }
                    })
                } else {
                    this.query = ''
                }
            }, 300)
        }
        handleInputDelete() {
            if (this.multiple && this.model.length && this.query === '') {
                this.removeTag(this.model.length - 1)
            }
        }
        modelToQuery() {
            if (!this.multiple && this.filterable && typeof this.model !== 'undefined') {
                const options = findComponentsDownward(this, 'AtOption')
                options.forEach(option => {
                    if (this.model === option.value) {
                        this.query = option.label || option.searchLabel || option.value
                    }
                })
            }
        }
        broadcastQuery(val: any) {
            this.broadcast('AtOption', 'on-query-change', val)
        }

        mounted() {
            this.modelToQuery()
            this.updateOptions()

            document.addEventListener('keydown', this.handleKeydown)

            this.$on('on-select-selected', (value: any) => {
                if (this.model === value) {
                    this.hideMenu()
                } else if (this.multiple) {
                    const index = this.model.indexOf(value)

                    if (index > -1) {
                        this.removeTag(index)
                    } else {
                        this.model.push(value)
                        this.broadcast('Dropdown', 'on-update-popper')
                    }

                    if (this.filterable) {
                        this.query = '';
                        (this.$refs.input as HTMLInputElement).focus()
                    }
                } else {
                    this.model = value

                    if (this.filterable) {
                        const options = findComponentsDownward(this, 'AtOption')
                        options.forEach(option => {
                            if (option.value === value) {
                                this.query = (typeof option.label === 'undefined') ? option.searchLabel : option.label
                            }
                        })
                    }
                }
            })
        }
        beforeDestory() {
            document.removeEventListener('keydown', this.handleKeydown)
        }
    }
</script>
