# InputNumber 数字输入框

----

## 基础用法

支持传入 `step` 精度，以及指定取值范围 `max` , `min`。默认 `step` 取整数 1

:::demo
```html
<p class="demo-desc">基本输入框，范围可以无递加或递减</p>
<div class="row no-gutter">
    <div class="col-md-4">
        <by-input-number v-model="num1"></by-input-number><br>
    </div>
</div>
<p class="demo-desc">有精度输入框，step=5，step=0.5</p>
<div class="row no-gutter">
    <div class="col-md-4">
        <by-input-number :step="5" v-model="num2"></by-input-number>
    </div>
    <div class="col-md-4 col-md-offset-1">
        <by-input-number :step="0.5" v-model="num3"></by-input-number>
    </div>
</div>
<p class="demo-desc">有取值范围的输入框，min=0, max=20</p>
<div class="row no-gutter">
    <div class="col-md-4">
        <by-input-number :min="0" :max="20" v-model="num4"></by-input-number>
    </div>
</div>
```
:::

## 不可用状态

设置属性 `disabled` 禁用输入框

:::demo
```html
<div class="row no-gutter">
    <div class="col-md-4">
        <by-input-number disabled  v-model="num5"></by-input-number>
    </div>
</div>
```
:::


## 不同尺寸

配置属性 `size`，可控制输入框的尺寸，默认支持三种尺寸：`large`，`normal`，`small`

:::demo
```html
<div class="row">
    <div class="col-sm-12 col-md-4">
        <by-input-number size="small" v-model="num6"></by-input-number>
    </div>
    <div class="col-sm-12 col-md-4">
        <by-input-number v-model="num6"></by-input-number>
    </div>
    <div class="col-sm-12 col-md-4">
        <by-input-number size="large" v-model="num6"></by-input-number>
    </div>
</div>
```
:::


## InputNumber 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 输入框的值，可通过 `v-model` 绑定 | Number | - | - |
| size | 输入框尺寸 | String | `small`  `normal`  `large` | normal |
| step | 每次递增或递减的数目 | Number | - | 1 |
| min | 最小值 | Number | - | -Infinity |
| max | 最大值 | Number | - | Infinity |
| disabled | 是否禁用输入框 | Boolean | - | false |
| readonly | 是否设置成只读 | Boolean | - | false |
| autofocus | 是否自动聚焦到输入框 | Boolean | - | false |

## InputNumber 事件

| 事件名称      | 说明          | 返回值  |
|---------- |-------------- |---------- |
| focus | 获得焦点时触发 | event |
| blur | 失去焦点时触发 | event |
| change | 绑定的值有变化时触发 | 输入框的值 |

<script lang="ts">
 import { Vue, Component } from "vue-property-decorator";

 @Component
 export default class InputNumber extends Vue {

     num1 = 0;

     num2 = 0;

     num3= 0;

     num4 = 10;

     num5 = 999.99;

     num6 = 100;
 }
</script>
