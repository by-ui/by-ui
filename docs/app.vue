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

    /******** scrollBar ********/
    import Scrollbar from 'smooth-scrollbar';
    import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

    @Component
    export default class App extends Vue {
        afterLeave() {
            window.scrollTo(0, 0)
        }
        mounted() {
            Scrollbar.use(OverscrollPlugin);

            (window as any).scrollbar = Scrollbar.init(document.body, {
                // plugins: {
                //     overscroll: {
                        // effect: 'glow',
                //         glowColor: '#6190E8',
                //     }
                // }
            });
            if (window.location.href.split('#').length == 3) {
                let id = window.location.href.split('#')[2]
                setTimeout(_ => {
                    let offsetTop = (document.getElementById(id) as HTMLElement).offsetTop
                    // window.scrollTo(0, offsetTop + 120)
                    scrollbar.scrollTo(0,offsetTop + 120,800)

                }, 300);
            }
        }
    }
</script>
<style lang="scss">
</style>

<style lang="scss" scoped>
    .app {
        height: 100%;
        background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23b9f4bc' fill-opacity='0.13' fill-rule='evenodd'/%3E%3C/svg%3E");
    }
</style>
