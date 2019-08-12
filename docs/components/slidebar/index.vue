<template>
    <div class="slide-bar by-sidebar col-sm-24 col-md-6 col-lg-4">
        <nav class="by-nav">
            <div v-for="(item,index) in treeData"
                 :key="index">
                <h2 class="by-nav__title">{{ $t('by.nav.'+item.title) }}</h2>
                <!-- 没有组的情况 -->
                <ul class="by-nav__items">
                    <div v-if="item.items">
                        <li class="by-nav__item"
                            v-for="(navItem,index) in item.items"
                            :key="index">
                            <router-link class="by-nav__page"
                                         :to="linkUrl(item.name,navItem.name)">{{ $t('by.nav.'+navItem.title) }}</router-link>
                        </li>
                    </div>
                    <div v-else>
                        <ul class="by-nav__items">
                            <li class="by-nav__item active"
                                v-for="(group,index) in item.groups"
                                :key="index">
                                <a class="by-nav__group"
                                   @click="toggleMenu">{{ $t('by.nav.'+group.title) }} <i class="icon icon-chevron-down"></i></a>
                                <ul class="by-nav__child-items">
                                    <li class="by-nav__child-item"
                                        v-for="(navItem,index) in group.items"
                                        :key="index">
                                        <router-link class="by-nav__component"
                                                     :to="linkUrl(item.name,navItem.name)">{{ $t('by.nav.'+navItem.title) }}</router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    @Component
    export default class SlideBar extends Vue {
        @Prop()
        treeData!: any;

        linkUrl(parent: string, path: string) {
            return `/${parent}/${path}`.toLowerCase()
        }

        toggleMenu(event: any) {
            const parentNode = event.target.parentNode
            if (parentNode.classList.contains('active')) {
                parentNode.classList.remove('active')
            } else {
                parentNode.classList.add('active')
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "~@docs/styles/src/variables/index.scss";

    .by-sidebar {
        display: inline-block;
        margin: 32px 0;
        padding: 0;
        // max-width: 264px;
        color: #3f536e;
        background-color: #fff;
        border-right: 1px solid $grey-100;
        z-index: 99;
    }

    .by-nav {
        font-size: 14px;

        &__title {
            padding: 0 24px 8px;
            color: #8dabc4;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        &__group {
            display: block;
            position: relative;
            padding: 10px 0 10px 24px;
            color: #2c405a;
            font-weight: normal;

            &:hover {
                color: $brand-blue-700;
            }
            i {
                position: absolute;
                top: 50%;
                right: 16px;
                margin-top: -7px;
                color: #a8c6df;
                font-size: 14px;
                transition: all 0.3s;
            }
            .active & {
                font-weight: bold;
            }
            .active & i {
                transform: rotate(-180deg);
            }
        }
        &__items {
            margin: 0 0 32px;
            font-size: 14px;
            font-weight: normal;
            line-height: 1.8;
        }
        &__item {
            position: relative;
        }
        &__child-items {
            display: none;

            .active & {
                display: block;
            }
        }
        &__page {
            display: block;
            position: relative;
            padding: 8px 24px;
            color: #3f536e;
            font-weight: normal;
            line-height: 1.5;
            cursor: pointer;

            &:after {
                content: "";
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 5px;
                height: 100%;
                background: #6190e8;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                box-shadow: 1px 0 12px 0 #6190e8;
            }

            &:hover {
                color: $brand-blue-400;
                background-color: rgba(236, 242, 252, 0.25);
            }
            &.active,
            &.router-link-active {
                background-color: rgba(236, 242, 252, 0.2);

                &:after {
                    display: inline-block;
                }
                &:hover {
                    color: #3f536e;
                }
            }
        }
        &__component {
            display: block;
            position: relative;
            padding: 10px 24px 10px 32px;
            color: #616367;
            font-size: 14px;

            &:after {
                content: "";
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 6px;
                height: 100%;
                background: #6190e8;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                box-shadow: 1px 0 12px 0 #6190e8;
            }
            &:hover {
                color: $brand-blue-400;
                background-color: rgba(236, 242, 252, 0.25);
            }
            &.active,
            &.router-link-active {
                background-color: rgba(236, 242, 252, 0.2);

                &:after {
                    display: inline-block;
                }
                &:hover {
                    color: #3f536e;
                }
            }
            span {
                padding-left: 6px;
                font-size: 12px;
                opacity: 0.6;
                // color: rgba(255,255,255,.6)
            }
        }
    }
    .by-nav__arrow {
        position: absolute;
        top: 18px;
        right: 12px;
        width: 16px;
        opacity: 0.25;
        margin: -4px 0 0;

        .active & {
            transform: rotate(180deg);
        }
    }
    .by-nsc,
    .by-nsc:focus,
    .by-nsc:hover,
    .by-nsc:active,
    .by-nsc:visited {
        color: #fff;
    }
</style>
