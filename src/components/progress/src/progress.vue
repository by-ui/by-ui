<template>
    <div class="by-progress"
         :class="[
      type ? `by-progress--${type}` : 'by-progress--bar',
      currentStatus ? `by-progress--${currentStatus}` : ''
    ]">
        <!-- S 环形进度条 -->
        <div class="by-progress-circle"
             v-if="type === 'circle'"></div>
        <!-- E 环形进度条 -->

        <!-- S 条状进度条 -->
        <div class="by-progress-bar"
             v-else>
            <div class="by-progress-bar__wraper"
                 :style="barStyle">
                <div class="by-progress-bar__inner"
                     :style="{ width: percent + '%' }"></div>
            </div>
        </div>
        <div class="by-progress__text">
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

    @Component({
        name: 'ByProgress',
    })
    export default class ByProgress extends Vue {
        @Prop()
        type?: string;

        @Prop({
            default: '',
            validator: val => ['', 'success', 'error'].indexOf(val) > -1
        })
        status?: string;

        @Prop({
            type: Number,
            default: 0
        })
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

        handleChange(val: number | undefined) {
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
