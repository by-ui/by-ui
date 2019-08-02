# Typography 字体

----

统一字体规范，力求在各个操作系统上都有最佳的展示效果   1231233213221332132

## 字体家族

css 代码如下：

```css
font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
```


## 中文字体

<div class="row">
  <div class="by-component__container col-sm-24 col-md-8">
    <div class="by-component-typo typo-pingfang">
      <div class="by-component-typo__show">新仁类实验室</div>
      <div class="by-component-typo__detail">
        <p>苹方 / PingFang SC</p>
        <p class="note">MacOS, IOS 优选字体</p>
      </div>
    </div>
  </div>

  <div class="by-component__container col-sm-24 col-md-8">
    <div class="by-component-typo typo-dongqing">
      <div class="by-component-typo__show">新仁类实验室</div>
      <div class="by-component-typo__detail">
        <p>冬青黑体 / Hiragino Sans GB</p>
        <p class="note">MacOS 备选字体</p>
      </div>
    </div>
  </div>

  <div class="by-component__container col-sm-24 col-md-8">
    <div class="by-component-typo typo-yahei">
      <div class="by-component-typo__show">新仁类实验室</div>
      <div class="by-component-typo__detail">
        <p>微软雅黑 / Microsoft YaHei</p>
        <p class="note">次级备选字体</p>
      </div>
    </div>
  </div>
</div>

<div class="type-demo-container">
  <div class="row flex-middle typo-pingfang">
    <div class="col-md-5 type">苹方 / PingFang SC</div>
    <div class=" content">新仁类实验室(xrl.io 英文简称XRL) 始建于2015年10月，是一个年轻基情的技术团队</div>
  </div>
  <div class="row flex-middle typo-dongqing">
    <div class="col-md-5 type">冬青黑体 / Hiragino Sans GB</div>
    <div class=" content">新仁类实验室(xrl.io 英文简称XRL) 始建于2015年10月，是一个年轻基情的技术团队</div>
  </div>
  <div class="row flex-middle typo-yahei">
    <div class="col-md-5 type">微软雅黑 / Microsoft YaHei</div>
    <div class=" content">新仁类实验室(xrl.io 英文简称XRL) 始建于2015年10月，是一个年轻基情的技术团队</div>
  </div>
</div>

<style lang="scss" scoped>
  .type-demo-container {
    .row {
      margin-top: 8px;
      margin-bottom: 8px;
    }
    .type {
      color: #7E95A7;
      font-size: 13px;
      text-align: right;
    }
    .content {
      font-size: 15px;
      padding-left: 24px;
      word-break: break-all;
    }
  }
</style>
