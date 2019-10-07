<template>
    <div class="by-card"
         :class="{
      'by-card--bordered': bordered,
      'by-card--no-hover': noHover
    }">
        <div class="by-card__head"
             v-if="!(!$slots.title && !$slots.extra)">
            <div class="by-card__title"
                 v-if="$slots.title">
                <slot name="title"></slot>
            </div>
            <div class="by-card__extra"
                 v-if="$slots.extra">
                <slot name="extra"></slot>
            </div>
        </div>
        <div class="by-card__body"
             :style="bodyStyle">
            <slot v-if="!loading"></slot>
            <slot v-else
                  name="loading">
                <div class="by-card__body--loading">
                    <div>
                        <span style="width: 95%"></span>
                    </div>
                    <div>
                        <span style="width: 32%"></span>
                        <span style="width: 58%"></span>
                    </div>
                    <div>
                        <span style="width: 23%"></span>
                        <span style="width: 65%"></span>
                    </div>
                    <div>
                        <span style="width: 59%"></span>
                        <span style="width: 32%"></span>
                    </div>
                    <div>
                        <span style="width: 26%"></span>
                        <span style="width: 10%"></span>
                        <span style="width: 50%"></span>
                    </div>
                </div>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    @Component({
        name: 'ByCard'
    })
    export default class ByCard extends Vue {
        @Prop({
            type: Boolean,
            default: true
        })
        bordered?: boolean;

        @Prop({
            type: Boolean,
            default: false
        })
        noHover?: boolean;

        @Prop({
            type: Boolean,
            default: false
        })
        loading?: boolean;

        @Prop()
        bodyStyle?: object;
    }
</script>
