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
<style lang="scss" scoped>
    .at-icon-list {
        div{
            width: 100%;
            box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06);
            padding: 15px 0;
            margin-bottom:15px;
            p{
                margin-top:10px;
            }
        }
    }
</style>
