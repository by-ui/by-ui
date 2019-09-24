
# Tooltips 文字提示

----

文字提示框类似于 `HTML` 的 `title` 属性，当鼠标悬浮在元素上方时，会出现一个文字提示框

## 基本用法

鼠标悬停时，文字提示框默认显示在顶上的位置

:::demo
```html
<by-tooltip placement="top" content="提示信息">
  <by-button>按钮</by-button>
</by-tooltip>
<by-tooltip content="提示信息"><span>一段文字</span></by-tooltip>
```
:::

## 自定义文字提示的内容

可通过 `slot="content"` 的方式设置文字提示的内容

:::demo
```html
<by-tooltip>
  <span>文字提示</span>
  <template slot="content">
    <p>文字1</p>
    <p>文字2</p>
  </template>
</by-tooltip>
```
:::

## 不同的展示方向

`placement` 属性可设置文字提示框出现的位置，默认提供9种不同的方向

:::demo
```html
<div class="show-box">
  <div class="top row col-md-16 flex-center">
    <by-tooltip class="item" content="Top Left 提示文字" placement="top-left"><by-button>上左</by-button></by-tooltip>
    <by-tooltip class="item" content="Top 提示文字" placement="top"><by-button>上边</by-button></by-tooltip>
    <by-tooltip class="item" content="Top Right 提示文字" placement="top-right"><by-button>上右</by-button></by-tooltip>
  </div>
  <div class="center row col-md-16 flex-between">
    <div class="left col-md-4">
      <by-tooltip class="item" content="Left Top 提示文字" placement="left-top"><by-button>左上</by-button></by-tooltip>
      <by-tooltip class="item" content="Left 提示文字" placement="left"><by-button>左边</by-button></by-tooltip>
      <by-tooltip class="item" content="Left Bottom 提示文字" placement="left-bottom"><by-button>左下</by-button></by-tooltip>
    </div>
    <div class="right col-md-4">
      <by-tooltip class="item" content="Right Top 提示文字" placement="right-top"><by-button>右上</by-button></by-tooltip>
      <by-tooltip class="item" content="Right 提示文字" placement="right"><by-button>右边</by-button></by-tooltip>
      <by-tooltip class="item" content="Right Bottom 提示文字" placement="right-bottom"><by-button>右下</by-button></by-tooltip>
    </div>
  </div>
  <div class="bottom row col-md-16 flex-center">
    <by-tooltip class="item" content="Bottom Left 提示文字" placement="bottom-left"><by-button>下左</by-button></by-tooltip>
    <by-tooltip class="item" content="Bottom 提示文字" placement="bottom"><by-button>下边</by-button></by-tooltip>
    <by-tooltip class="item" content="Bottom Right 提示文字" placement="bottom-right"><by-button>下右</by-button></by-tooltip>
  </div>
</div>
```
:::

## Tooltip 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| content | 提示文字 | String | - | - |
| placement | 气泡框位置 | String | `top`, `top-left`, `top-right`, `left`, `left-top`, `left-bottom`, `right`, `right-top`, `right-bottom`, `bottom`, `bottom-left`, `bottom-right` | `top` |

<style lang="scss" scoped>
.by-tooltip {
  & + .by-tooltip {
    margin-left: 16px;
  }
  span {
    font-size: 12px;
  }
  p {
    color: #fff;
    font-size: 12px;
  }
}
.show-box {
  max-width: 600px;

  .by-tooltip + .by-tooltip {
    margin: 0;
  }
}
.top,
.bottom {
  padding: 20px;
  width: 100%;

  .item + .item {
    margin-left: 30px;
  }
}
.center {
  width: 100%;

  .item + .item {
    margin-top: 20px;
  }
}
.left {
  flex-direction: column;
}

.item > span {
  display: inline-block;
  width: 60px;
  height: 32px;
  line-height: 32px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    color: #a0c1ff;
    border-color: #a0c1ff;
  }
}
</style>
