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

    @Component
    export default class App extends Vue {
        afterLeave() {
            window.scrollTo(0, 0)
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
