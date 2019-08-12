<template>
    <div class="by-collapse"
         :class="{
      'by-collapse--simple': simple
    }">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Collapse extends Vue {
    @Prop({
        default: false,
        type: Boolean
    })
    accordion?: boolean;

    @Prop({
        default: false,
        type: Boolean
    })
    simple?: boolean;

    @Prop()
    value?: [] | string | number;

    currentValue = this.inputValueCheck(this.value);

    @Watch("value")
    watchValue(value: string) {
        this.currentValue = this.inputValueCheck(value);
    }

    // @Watch("currentValue")
    // watchCurrentValue() {
    //     this.setActive();
    // }

    setActive() {
        const activeKey = this.getActiveKey();
        const accordion = this.accordion;

        console.log(this.$children);
        this.$children.forEach((item: any, index) => {
            const name = item.name || index.toString();

            if (accordion) {
                item.isActive = activeKey[0] === name;
            } else {
                item.isActive = activeKey.indexOf(name) >= 0;
            }

            item.index = index;
        });
    }

    getActiveKey() {
        let activeKey = this.currentValue || [];

        if (!Array.isArray(activeKey)) {
            activeKey = [activeKey];
        }

        if (this.accordion && activeKey.length > 1) {
            activeKey = [activeKey[0].toString()];
        } else {
            let i = activeKey.length;
            while (i--) {
                activeKey[i] = activeKey[i].toString();
            }
        }

        return activeKey;
    }

    toggle(itemData: any) {
        const name = itemData.name.toString();
        let newActiveKey = [];

        if (this.accordion && !itemData.isActive) {
            newActiveKey.push(name);
        } else {
            const activeKey = this.getActiveKey();
            const nameIndex = activeKey.indexOf(name);

            if (itemData.isActive && nameIndex >= 0) {
                activeKey.splice(nameIndex, 1);
            } else if (nameIndex < 0) {
                activeKey.push(name);
            }
            newActiveKey = activeKey;
        }

        console.log(newActiveKey);
        this.currentValue = newActiveKey;
        this.setActive();
        this.$emit("on-change", this.currentValue);
    }

    inputValueCheck(val: any) {
        return typeof val === "number" ? `${val}` : val;
    }

    mounted() {
        this.setActive();
    }
}
</script>
