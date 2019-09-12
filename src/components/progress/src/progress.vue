<template>
    <div class="at-progress"
         :class="[
      type ? `at-progress--${type}` : 'at-progress--bar',
      currentStatus ? `at-progress--${currentStatus}` : ''
    ]">
        <!-- S 环形进度条 -->
        <div class="at-progress-circle"
             v-if="type === 'circle'"></div>
        <!-- E 环形进度条 -->

        <!-- S 条状进度条 -->
        <div class="at-progress-bar"
             v-else>
            <div class="at-progress-bar__wraper"
                 :style="barStyle">
                <div class="at-progress-bar__inner"
                     :style="{ width: percent + '%' }"></div>
            </div>
        </div>
        <div class="at-progress__text">
            <span v-if="!currentStatus">{{ percent }}%</span>
            <i v-else
               class="icon"
               :class="statusIconClass"></i>
        </div>
        <!-- E 条状进度条 -->
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Progress extends Vue {
    @Prop()
    type?: string;

    @Prop()
    status?: string;

    @Prop()
    percent?: number;

    @Prop()
    strokeWidth?: number;

    currentStatus = this.status;

    get barStyle() {
        return {
            height: `${this.strokeWidth}px`
        };
    }

    get statusIconClass() {
        return this.currentStatus === "success"
            ? "icon-check-circle"
            : "icon-x-circle";
    }

    @Watch("percent")
    watchPercent(val: number) {
        this.handleChange(val | 0);
    }

    handleChange(val: number) {
        if (val === 100) {
            this.currentStatus = "success";
            this.$emit("on-status-success", this.percent);
        } else {
            this.currentStatus = this.status;
        }
    }
    mounted() {
        this.handleChange(this.percent);
    }
}
</script>
