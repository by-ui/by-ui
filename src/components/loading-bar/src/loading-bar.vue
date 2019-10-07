<template>
    <div class="by-loading-bar"
         :class="{  [`by-loading-bar--${status}`]: status }"
         :style="barStyle"
         v-show="show">
        <div class="by-loading-bar__inner"
             :style="innerBarStyle"></div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component({
        name: 'LoadingBar'
    })
    export default class LoadingBar extends Vue {

        show = false;

        percent = 0;

        status = 'success';

        width = 4;

        color = '';

        get barStyle() {
            return {
                'height': `${this.width || 4}px`
            }
        }

        get innerBarStyle() {
            let color = {};
            this.color && (color = { background: `${this.color || '#fff'}` });
            return {
                width: this.percent + '%',
                ...color
            }
        }
    }
</script>
