<template>
    <header class="page-header"
            :class="{collapse:collapse}"
            id="J-page-header">
        <div class="nav-container">
            <div class="nav-left">
                <div class="logo">
                    <router-link :to="'/'"
                                 id="by-ui-logo"></router-link>
                </div>
                <i class="icon icon-menu nav-icon"></i>
            </div>
            <div class="nav-right">
                <ul class="navbar">
                    <li>
                        <router-link :to="{ name: 'guide' }"
                                     v-text="$t('by.header.guide')"></router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'components' }"
                                     v-text="$t('by.header.component')"></router-link>
                    </li>
                    <li>
                        <a href="javascript:void(0)"
                           v-text="$t('by.header.adminSystem')"></a>
                    </li>
                </ul>
                <div class="btn-language"
                     v-if="$i18n.locale === 'en'"
                     @click="switchLang('cn')">EN</div>
                <div class="btn-language"
                     v-if="$i18n.locale === 'cn'"
                     @click="switchLang('en')">中文</div>
            </div>
        </div>
    </header>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Vivus from "Vivus";

@Component
export default class Header extends Vue {
    collapse = true;

    mounted() {
        new Vivus('by-ui-logo', {
            type: 'delayed',
            file: "/docs/assets/image/logo.svg",
            duration: 300,
            animTimingFunction: Vivus.EASE
        });
    }
    switchLang(lang) {
        this.$i18n.locale = lang;
        this.$i18n.fallbackLocale
    }
}
</script>
<style lang="scss" scoped>
@import "~@docs/styles/src/variables/index.scss";

$header-height: 80px;

.page-header {
    @include clearfix();
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $header-height;
    background-color: transparent;
    transition: all 0.3s;
    z-index: 100;

    &.collapse {
        background-color: #fff;
        box-shadow: 0 10px 60px 0 rgba(29, 29, 31, 0.07);
        opacity: 0.98;
        position: relative;
    }
    &.open {
        background-color: #fff;
    }
}
.nav-container {
    margin: 0 auto;
    width: 90%;
    color: #1d1d1f;

    .nav-left {
        float: left;

            .logo {
                position: relative;
                height: $header-height;
                line-height: $header-height;
                a {
                    display: flex;
                    height: 100%;
                    align-items: center;
                    margin-left: 5px;
                    font-weight: bold;
                    font-size: 16px;
                    /deep/ svg {
                        width: 150px;
                        * {
                            fill: none;
                            stroke: currentColor;
                        }
                    }
                }
            }
            .icon-logo {
                font-size: 40px;
            }
            span {
                margin-left: 5px;
                color: #3473e7;
                font-weight: bold;
                font-size: 16px;
            }
        }
        .nav-icon {
            display: none;
            position: absolute;
            top: 50%;
            right: 0;
            margin-top: -10px;
            font-size: 20px;
        }
    }
    .nav-right {
        float: right;

        .navbar {
            display: inline-block;
            margin: 0;
            padding: 0;
            height: $header-height;
            font-size: 14px;
            line-height: $header-height;
            list-style-type: none;

            a {
                display: inline-block;
                color: #1d1d1f;

                &::after {
                    content: "";
                    display: none;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 2px;
                    width: 100%;
                    background-color: #6190e8;
                }
                &.router-link-active {
                    color: $brand-blue-500;

                    &::after {
                        display: inline-block;
                    }
                }
            }
            li {
                position: relative;
                display: inline-block;
                margin: 0 24px;
                cursor: pointer;
                transition: color 0.3s;

                &:hover {
                    color: $brand-blue-500;

                    a {
                        color: $brand-blue-500;
                    }
                }
                &.disabled {
                    color: #c9c9c9;
                    cursor: not-allowed;
                }
            }
        }
        .btn-language {
            display: inline-block;
            margin: 0 24px;
            padding: 2px 12px;
            border: 1px solid #1d1d1f;
            border-radius: 2px;
            cursor: pointer;
            transition: color 0.3s, border 0.3s;

            &:hover {
                color: $brand-blue-500;
                border-color: $brand-blue-500;
            }
        }
}

@media screen and (max-width: $screen-sm-max) {
    .page-header {
        height: 60px;

        &.open {
            .nav-right {
                height: 220px;
            }
        }
    }
    .nav-container {
        width: initial;

        .nav-left {
            position: relative;
            margin: 0 20px;
            float: none;
            text-align: center;

            .logo {
                display: inline-block;
                height: 60px;
                line-height: 60px;
            }
            .nav-icon {
                display: inline-block;
            }
        }
        .nav-right {
            float: none;
            height: 0;
            text-align: center;
            background-color: #fff;
            box-shadow: 0 10px 60px 0 rgba(29, 29, 31, 0.07);
            transition: all 0.3s;
            overflow: hidden;

            .navbar {
                display: block;
                height: initial;
                line-height: 50px;

                li {
                    display: block;
                }
                a {
                    width: 100%;

                    &.router-link-active::after {
                        display: none;
                    }
                }
            }
            .btn-language {
                margin: 16px;
            }
        }
    }
}
</style>
