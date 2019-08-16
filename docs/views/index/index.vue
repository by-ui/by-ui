<template>
    <div class="index">
        <by-header class="by-header"></by-header>
        <div class="index-container">
            <span id="index-logo"
                  @click="replay"></span>
            <p class="desc">{{$t('by.index.h4')}}</p>
            <by-button round
                       class="start-button"
                       @click.native="$router.push({name: 'components'})">{{$t('by.index.button')}}</by-button>
            <video src="https://onsite-mp.oss-cn-hangzhou.aliyuncs.com/index.mp4"
                   autoplay loop></video>
            <div class="block-dv row at-row no-gutter flex-between">
                <div class="inner col-sm-12 col-md-6 col-lg-7"
                     v-for="(item, index) of list"
                     :key="index"
                     @click="$router.push({name: item.name})">
                    <img :src="item.imgUrl"
                         alt="">
                    <h4>{{$t(`by.index.btnGroup[${index}].title`)}}</h4>
                    <p>{{$t(`by.index.btnGroup[${index}].content`)}}</p>
                </div>
            </div>
        </div>
        <div>
            <img src="../../assets/image/img45.png"
                 class="circleLeft" />
            <img src="../../assets/image/decor-home-page-right.png"
                 class="circleRight" />
        </div>
        <by-footer></by-footer>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Vivus from "Vivus";

@Component
export default class Guide extends Vue {
    logo: any = "";

    list = [
        {
            imgUrl: require("../../assets/image/icon_zhinan@2x.png"),
            name: "guide"
        },
        {
            imgUrl: require("../../assets/image/icon_zujian@2x.png"),
            name: "components"
        },
        {
            imgUrl: require("../../assets/image/icon_ziyuan@2x.png"),
            name: "home"
        }
    ];

    replay() {
        this.logo.reset().play();
    }

    mounted() {
        this.logo = new Vivus("index-logo", {
            type: "oneByOne",
            file: require("../../assets/image/logo.svg"),
            duration: 600,
            animTimingFunction: Vivus.EASE
        });
    }
}
</script>
<style lang="scss" scoped>
.index {
    width: 100%;
    height: 100%;
    background-color: #f8faff;
    .by-header {
        background: transparent;
        box-shadow: none;
    }
    .index-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        #index-logo {
            display: flex;
            margin-top: 150px;
            /deep/ svg {
                width: 496px;
            }
        }
        .desc {
            font-size: 32px;
            color: #8994c6;
            margin-top: 108px;
        }
        .start-button {
            padding: 10px 50px;
            margin-top: 78px;
            background: linear-gradient(
                90deg,
                rgba(96, 192, 254, 1) 0%,
                rgba(55, 119, 233, 1) 100%
            );
            border-radius: 30px;
            color: #fff;
            font-size: 18px;
            box-shadow: 0px 4px 6px 0px rgba(28, 141, 243, 0.32);
            &:hover {
                cursor: pointer;
            }
        }
        video {
            margin-top: 90px;
            width: 70%;
            box-shadow: 0 14px 24px 0 rgba(160, 161, 188, 0.4);
            border-radius: 12px;
            overflow: hidden;
            backface-visibility: hidden;
        }
        .block-dv {
            width: 80%;
            position: relative;
            z-index: 2;
            .inner {
                background: #fff;
                border-radius: 6px;
                padding: 30px 53px 30px 33px;
                text-align: center;
                margin: 7% 0;
                transition: all 0.5s;
                &:hover {
                    cursor: pointer;
                    box-shadow: 0px 10px 23px 0px #6696b7;
                    img {
                        transform: rotate(360deg);
                    }
                }
                h4 {
                    font-size: 18px;
                    margin-top: 44px;
                }
                p {
                    font-size: 16px;
                    color: #8994c6;
                    margin-top: 17px;
                }
                img {
                    width: 60%;
                    max-width: 120px;
                    transition: all 0.7s;
                    transform-origin: center;
                }
            }
        }
    }
}
.circleLeft {
    animation-delay: -2.2s;
    animation-duration: 2.5s;
    transition-delay: 0.6s;
    animation-name: floating-2;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 30%;
    width: 300px;
}
.circleRight {
    animation-delay: -2.2s;
    animation-duration: 2.5s;
    transition-delay: 0.6s;
    animation-name: floating-2;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    position: absolute;
    z-index: 1;
    right: 0;
    top: 30%;
}
@keyframes floating-2 {
    from {
        transform: translateY(16px) rotate3d(0, 0, 1, 3deg);
    }

    to {
        transform: translateY(-16px) rotate3d(0, 0, 1, 0deg);
    }
}
@-webkit-keyframes floating-2 {
    from {
        transform: translateY(16px) rotate3d(0, 0, 1, 3deg);
    }

    to {
        transform: translateY(-16px) rotate3d(0, 0, 1, 0deg);
    }
}
</style>

