<template>
    <ul class="at-icon-list row">
        <li v-for="(name, index) in icons"
            :key="index"
            class="by-icon-list__item col-sm-6 col-md-4 col-lg-3 flex flex-middle flex-center"
            v-clipboard="name">
            <div class="">
                <i class="icon"
                   :class="name"></i>
                <p>{{name}}</p>
            </div>
        </li>
    </ul>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import IconData from "./config.json";

    @Component
    export default class IconList extends Vue {

        @Prop()
        type!: any;

        get icons() {
            return IconData[this.type];
        }
    }
</script>
<style lang="scss">
    .by-icon-list__item {
        position: relative;
        height: 100px;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
        div {
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
                0 1px 2px 0 rgba(0, 0, 0, 0.06);
            width: 100%;
            padding: 20px 0;
            i {
                font-size: 26px;
                padding: 0 24px;
            }
            p {
                margin-top: 5px;
                font-size: 12px;
            }

            &:hover {
                i {
                    transform: scale(1.2);
                }
            }
        }
    }
</style>
