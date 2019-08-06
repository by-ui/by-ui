<template>
    <div class="guide">
        <by-header></by-header>
        <div class="by-container row">
            <div>
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

    import ByHeader from '@docs/components/header.vue';
    import BySlider from '@docs/components/slidebar.vue'
    import ByFooter from '@docs/components/footer.vue'

    @Component({
        components: { ByHeader, BySlider, ByFooter }
    })
    export default class Guide extends Vue {

        navs = navsConfig.guide;
    }
</script>
