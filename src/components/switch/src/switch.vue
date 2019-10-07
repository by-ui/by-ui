<template>
    <span class="by-switch"
          :class="[size ? `by-switch--${size}` : '',{
            'by-switch--disabled': disabled,
            'by-switch--checked': checkStatus
        }]"
          @click="toggleSwitch">
        <span class="by-switch__text">
            <slot v-if="checkStatus"
                  name="checkedText"></slot>
            <slot v-if="!checkStatus"
                  name="unCheckedText"></slot>
        </span>
    </span>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component({
        name: 'BySwitch'
    })
    export default class BySwitch extends Vue {
        @Prop({
            default: false,
            type: Boolean
        })
        value!: boolean;

        @Prop({
            default: false,
            type: Boolean
        })
        disabled!: boolean;

        @Prop()
        size?: string;

        checkStatus = this.value;

        toggleSwitch() {
            if (this.disabled) return;

            this.checkStatus = !this.checkStatus;
            console.log(this.checkStatus );
            this.$emit('change', this.checkStatus);
        }
    }
</script>
