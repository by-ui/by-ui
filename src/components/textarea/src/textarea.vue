<template>
    <div class="by-textarea"
         :class="{
      'by-textarea--disabled': disabled
    }">
        <textarea class="by-textarea__original"
                  v-model="store"
                  :name="name"
                  :placeholder="placeholder"
                  :disabled="disabled"
                  :style="textareaStyle"
                  :readonly="readonly"
                  :rows="rows"
                  :autofocus="autofocus"
                  :maxlength="maxlength"
                  :minlength="minlength"
                  @input="handleInput"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  ref="textarea"></textarea>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Mixins, Watch } from "vue-property-decorator";
import { calcTextareaHeight } from "./utils";

@Component({
    name: 'ByTextarea'
})
export default class ByTextarea extends Vue {
    @Prop()
    value?: string;

    @Prop()
    name?: string;

    @Prop()
    placeholder?: string;

    @Prop({
        default: false,
        type:Boolean
    })
    readonly?: boolean;

    @Prop({
        default: false,
        type:Boolean
    })
    disabled?: boolean;

    @Prop({
        default: 2
    })
    rows?: number;

    @Prop()
    minlength?: number;

    @Prop()
    maxlength?: number;

    @Prop({
        default: false,
        type:Boolean
    })
    autofocus?: boolean;

    @Prop({
        default: false,
        type:Boolean
    })
    autosize?: boolean;

    @Prop()
    minRows?: number;

    @Prop()
    maxRows?: number;

    @Prop({
        default: "vertical"
    })
    resize?: string;

    store = this.value;

    calculateStyle = {};

    get textareaStyle() {
        return Object.assign({}, this.calculateStyle, {
            resize: this.resize
        });
    }

    @Watch("value")
    watchValue(value: string) {
        this.store = value;
    }

    @Watch("store")
    watchStore(value: string) {
        this.$nextTick(() => {
            this.resizeTextarea();
        });
        this.$emit("input", value);
        this.$emit("change", value);
    }

    handleFocus(evt: any) {
        this.$emit("focus", evt);
    }

    handleBlur(evt: any) {
        this.$emit("blur", evt);
    }

    handleInput(evt: any) {
        this.store = evt.target.value;
    }

    resizeTextarea() {
        if (!this.autosize && !this.minRows && !this.maxRows) return;
        this.calculateStyle = calcTextareaHeight(
            this.$refs.textarea,
            this.minRows,
            this.maxRows
        );
    }

    mounted() {
        console.log(this.autosize)
        this.resizeTextarea();
    }
}
</script>
