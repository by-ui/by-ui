<template>
    <li class="at-select__option"
        :class="[
      disabled ? 'at-select__option--disabled' : '',
      selected ? 'at-select__option--selected' : '',
      isFocus ? 'at-select__option--focus' : ''
    ]"
        @click.stop="doSelect"
        @mouseout.stop="blur"
        v-show="!hidden"
        ref="option">
        <slot>{{ showLabel }}</slot>
    </li>
</template>

<script lang="ts">
    import { Vue, Component, Prop, PropSync, Watch, Mixins, Provide, Inject } from "vue-property-decorator";
    import Emitter from "mixins/emitter";
    @Component({
        beforeDestroy() {
            debugger
            (this as ByOption).select.options.forEach((option: any, idx: any) => {
                if (option._instance === this) {
                    (this as ByOption).select.onOptionDestroy(idx)
                }
            })
        }
    })
    export default class ByOption extends Mixins(Emitter) {
        @Inject('select')
        select: any;
        
        @Prop({
            type: [String, Number],
            required: true
        })
        value!: [String, Number]

        @Prop({
            type: [String, Number],
            required: true
        })
        label!: [String, Number]

        @Prop({
            type: Boolean,
            default: false
        })
        disabled?: boolean

        selected = false
        index = 0
        isFocus = false
        hidden = false
        searchLabel = ''

        get showLabel() {
            return this.label ? this.label : this.value
        }

        doSelect() {
            if (this.disabled) return false
            this.dispatch('AtSelect', 'on-select-selected', this.value)
        }
        blur() {
            this.isFocus = false
        }
        queryChange(val: any) {
            const parsedQuery = val.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1')
            this.hidden = !new RegExp(parsedQuery, 'i').test(this.searchLabel)
        }

        mounted() {
            this.select.optionInstances.push(this)
            this.select.options.push({
                _instance: this,
                value: this.value,
                label: (typeof this.label === 'undefined') ? this.$el.innerHTML : this.label
            })
            this.searchLabel = this.$el.innerHTML
            this.$on('on-select-close', () => {
                this.isFocus = false
            })
            this.$on('on-query-change', (val: any) => {
                this.queryChange(val)
            })
        }
    }


// export default {
//   name: 'AtOption',
//   mixins: [Emitter],
//   inject: ['select'],
//   props: {
//     value: {
//       type: [String, Number],
//       required: true
//     },
//     label: {
//       type: [String, Number]
//     },
//     disabled: {
//       type: Boolean,
//       default: false
//     }
//   },
//   data () {
//     return {
//       selected: false,
//       index: 0,
//       isFocus: false,
//       hidden: false,
//       searchLabel: ''
//     }
//   },
//   computed: {
//     showLabel () {
//       return this.label ? this.label : this.value
//     }
//   },
//   methods: {
//     doSelect () {
//       if (this.disabled) return false
//       this.dispatch('AtSelect', 'on-select-selected', this.value)
//     },
//     blur () {
//       this.isFocus = false
//     },
//     queryChange (val) {
//       const parsedQuery = val.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1')
//       this.hidden = !new RegExp(parsedQuery, 'i').test(this.searchLabel)
//     }
//   },
//   mounted () {
//     this.select.optionInstances.push(this)
//     this.select.options.push({
//       _instance: this,
//       value: this.value,
//       label: (typeof this.label === 'undefined') ? this.$el.innerHTML : this.label
//     })
//     this.searchLabel = this.$el.innerHTML
//     this.$on('on-select-close', () => {
//       this.isFocus = false
//     })
//     this.$on('on-query-change', val => {
//       this.queryChange(val)
//     })
//   },
//   beforeDestroy () {
//     this.select.options.forEach((option, idx) => {
//       if (option._instance === this) {
//         this.select.onOptionDestroy(idx)
//       }
//     })
//   }
// }
</script>
