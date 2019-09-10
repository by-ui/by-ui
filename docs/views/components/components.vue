<template>
    <div class="components">
        <by-header></by-header>
        <div class="by-container row">
            <by-slider :tree-data="navs"></by-slider>
            <div class="by-markdown col-sm-24 col-md-18 col-lg-20">
                <transition name="fade"
                            mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
        <by-footer></by-footer>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    import navsConfig from '@docs/vue-router/nav.config.yml'

    @Component
    export default class Components extends Vue {

        navs = navsConfig.components;
    }
</script>
