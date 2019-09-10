
# Badge 徽标

----

## 独立使用

不包裹任何元素，类似 `Tag` 标签

:::demo
```html
<by-badge value="3" ></by-badge>
<by-badge value="23"></by-badge>
<by-badge value="199"></by-badge>
<by-badge value="2019"></by-badge>
```
:::

## 文本内容

徽标既可以数字，也可以是文本内容

:::demo
```html
<by-badge value="new"></by-badge>
<by-badge value="hot"></by-badge>
```
:::


## 不同状态

设置属性 `status` 指定不同的状态徽标

:::demo
```html
<by-badge value="123"></by-badge>
<by-badge value="123" status="success"></by-badge>
<by-badge value="123" status="warning"></by-badge>
<by-badge value="123" status="info"></by-badge>
```
:::

## 设定最大值

设置属性 `max-num` 可自定义徽标的最大值，超过最大值则显示 `+`

:::demo
```html
<by-badge :value="value"  :max-num="maxNum"></by-badge>
```
:::

## 组合用法

与其他组件组合使用，用于展示消息数量等

:::demo
```html
    <by-badge value="3">
        <by-button>回复</by-button>
    </by-badge><br /><br />
    <by-badge :value="value" :max-num="maxNum">
        <by-button>回复</by-button>
    </by-badge><br /><br />
    <by-badge value="new">
        <by-button>回复</by-button>
    </by-badge>
```
:::

## 小红点

设置属性 `dot` 不显示具体的数字

:::demo
```html
    <by-badge :value="12" dot></by-badge>
    <by-badge :value="12" dot>
        <by-button>回复</by-button>
    </by-badge>
    <by-badge :value="12" dot>
        <i class="icon icon-inbox"></i>
    </by-badge>
    <by-badge :value="12" dot>
        <span>消息</span>
    </by-badge>
```
:::


## 动态展示

动态展示变化的效果

:::demo
```html
<by-badge :value="num" :max-num="60">
    <span class="badge-example"></span>
</by-badge>
<by-badge :value="num" :show="show" dot>
    <span class="badge-example"></span>
</by-badge>
<br>
<by-button @click="num -= 1">-</by-button>
<by-button @click="num += 1">+</by-button>
<by-button size="small" @click="toggleDot">{{show ? '隐藏' : '显示'}}小红点</by-button>
```
:::

## Badge 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 绑定的值 | String / Number | - | - |
| maxNum | 允许的最大值，超出则用 `+` 号显示 | Number | - | 99 |
| dot | 是否显示为小红点 | Boolean | - | false |
| status | 徽标的类型 | String | `success` `warning` `info` | - |
| show | 是否显示徽标 | Boolean | - | true |


<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class ByBadgeMd extends Vue {
        maxNum = 99;

        value = 123;

        num = 50;

        show = true;

        toggleDot() {
            this.show = !this.show;
        }
    }

</script>

<style lang="scss" scoped>

    .badge-example{
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 6px;
        background: #EEE;
        cursor: pointer;
    }

    .by-badge + .by-badge {
        margin-left: 24px;
    }

</style>
