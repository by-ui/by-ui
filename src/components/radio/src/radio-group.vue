<template>
    <div class="by-radio-group">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    Vue,
    Component,
    Prop,
    PropSync,
    Watch,
    Mixins
} from "vue-property-decorator";

import TwoWay from "mixins/two-way";

@Component
export default class ByRadio extends Mixins(TwoWay)  {
    // @Prop()
    // value?: string | number;

    @Prop({
        default:'normal'
    })
    size?: string;

    @Prop()
    fill?: string;

    @Prop()
    textColor?: string;

    @Watch("currentValue")
    watchValue(value: string | number) {
        console.log(value);
        this.$emit("radio-group-change", value);
    }

    mounted() {
        // this.broadcast("AtRadio", "init-data", this.value);
    }
}
// import Emitter from 'at-ui/src/mixins/emitter'

// export default {
//   name: 'AtRadioGroup',
//   props: {
//     value: [String, Number],
//     size: String,
//     fill: String,
//     textColor: String
//   },
//   mixins: [Emitter],
//   watch: {
//     value (value) {
//       this.$emit('radio-group-change', value)
//       this.broadcast('AtRadio', 'init-data', value)
//     }
//   },
//   mounted () {
//     this.broadcast('AtRadio', 'init-data', this.value)
//   }
// }
</script>
