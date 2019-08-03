<template>
    <div class="components">
        <b-header></b-header>
        <div class="by-container row">
            <b-slider :tree-data="navs"></b-slider>
            <div class="by-markdown col-sm-24 col-md-18 col-lg-20">
                <transition name="fade"
                            mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    import navsConfig from '@docs/vue-router/nav.config.yml'

    import BHeader from '@docs/components/header.vue';
    import BSlider from '@docs/components/slidebar.vue'

    @Component({
        components: { BHeader, BSlider }
    })
    export default class Components extends Vue {

        navs = navsConfig.components;
    }
</script>
