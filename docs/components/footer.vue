<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-logo"></div>
      <div class="footer-desc">
        <div class="footer-copyright">© 2019 Created by<a href="javascript:void(0)" target="_blank"> 新仁类实验室</a></div>
      </div>
      <div class="github-logo"><a href="https://github.com/by-ui" target="_blank">Github</a></div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
    @import "~@docs/styles/src/variables/index.scss";

    /**
     * Footer
     */
    .footer {
        padding: 30px 0 30px;
        color: #6190e8;
        text-align: center;
        background-color: #fff;

        .container {
            position: relative;
            width: 90%;
        }
        &-logo {
            margin: 10px 0 14px;
            width: 198px;
            height: 35px;
            background-image: url("../assets/image/logo.svg");
            background-size: 100% auto;
        }
        &-desc {
            text-align: left;
            font-size: 12px;
            color: #6190e8;
        }
        &-copyright {
            letter-spacing: 1px;
            font-weight: 300;

            a {
                color: #6190e8;
                text-decoration: none;
            }
        }
        .github-logo {
            position: absolute;
            right: 20px;
            top: 20px;
            width: 41px;
            height: 41px;
            background-image: url("../assets/image/github.png");
            transition: transform 0.3s;

            &:hover {
                transform: scale(1.1);
            }
            a {
                display: inline-block;
                width: 100%;
                height: 100%;
                text-indent: -9999px;
            }
        }
    }

    @media screen and (max-width: $screen-sm-max) {
        .footer {
            padding: 20px 0;

            &-logo {
                margin: 8px 0;
                height: 20px;
                width: 100px;
            }
            &-desc {
                font-size: 10px;
            }
            .github-logo {
                top: 0;
                right: 0;
            }
        }
    }
</style>
