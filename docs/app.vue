<template>
    <div class="app">
        <transition name="fade"
                    mode="out-in"
                    @after-leave="afterLeave">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    import Scrollbar from 'smooth-scrollbar';
    import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

    @Component
    export default class App extends Vue {
        afterLeave() {
            window.scrollTo(0, 0)
        }
        mounted() {
            Scrollbar.use(OverscrollPlugin);

            Scrollbar.init(document.body, {
                plugins: {
                    overscroll: {
                        enable: true,
                        effect: 'glow',
                        damping: 0.2,
                        maxOverscroll: 150,
                        glowColor: '#6190E8',
                    }
                }
            });

        }
    }
</script>
<style lang="scss">
</style>

<style lang="scss" scoped>
    .app {
        height: 100%;
    }
</style>
