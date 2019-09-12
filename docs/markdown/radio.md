# Radio 单选框

----

## 基本单选框

每个都是独立的单选按钮，各自需要单独绑定一个 `model`

:::demo
```html
<by-radio v-model="radio" label="1">选项一</by-radio>
<by-radio v-model="radio" label="2">选项二</by-radio>
```
:::

## 不可用状态

添加属性 `disabled`，设置按钮不可用

:::demo
```html
<by-radio v-model="radio2" label="3" :disabled="true">不可点且未选中</by-radio>
<by-radio v-model="radio2" label="4" :disabled="true">不可点且选中</by-radio>
```
:::

## 单选框组合

如果按钮存在互斥的情况，可用单选框组，但如果选项过多，建议使用下拉框组件。使用组合：`ByRadioGroup` 和 `ByRadio`

::: demo
```html
<by-radio-group v-model="radio3">
  <by-radio v-model="radio3" label="1">选项一</by-radio>
  <by-radio v-model="radio3" label="2">选项二</by-radio>
  <by-radio v-model="radio3" label="3">选项三</by-radio>
</by-radio-group>
```
:::


## 组合按钮

按钮样式的单选框组合，使用组合：`ByRadioGroup` 和 `ByRadioButton`

:::demo
```html
<by-radio-group v-model="radio4">
  <by-radio-button label="北京">北京</by-radio-button>
  <by-radio-button label="上海" :disabled="true">上海</by-radio-button>
  <by-radio-button label="深圳">深圳</by-radio-button>
  <by-radio-button label="凹凸实验室">凹凸实验室</by-radio-button>
</by-radio-group>
```
:::

## 自定义组合按钮样式

设置 `fill` 属性可更改选中按钮的背景颜色，设置 `text-color` 属性可更改选中按钮字体的颜色

:::demo
```html
<p class="demo-desc">更换背景色</p>
<div class="row">
  <by-radio-group v-model="radio5" fill="#FF6464">
    <by-radio-button label="北京">北京</by-radio-button>
    <by-radio-button label="上海" :disabled="true">上海</by-radio-button>
    <by-radio-button label="深圳">深圳</by-radio-button>
    <by-radio-button label="凹凸实验室">凹凸实验室</by-radio-button>
  </by-radio-group>
</div>
<p class="demo-desc">更换字体颜色</p>
<div class="row">
  <by-radio-group v-model="radio5" text-color="#4C5D73">
    <by-radio-button label="北京">北京</by-radio-button>
    <by-radio-button label="上海" :disabled="true">上海</by-radio-button>
    <by-radio-button label="深圳">深圳</by-radio-button>
    <by-radio-button label="凹凸实验室">凹凸实验室</by-radio-button>
  </by-radio-group>
</div>
```
:::

## 不同大小的组合按钮

提供大中小三种尺寸的组合按钮

:::demo
```html
<div class="row">
  <by-radio-group v-model="radio6" size="large">
    <by-radio-button label="北京">北京</by-radio-button>
    <by-radio-button label="上海" :disabled="true">上海</by-radio-button>
    <by-radio-button label="深圳">深圳</by-radio-button>
    <by-radio-button label="凹凸实验室">凹凸实验室</by-radio-button>
  </by-radio-group>
</div>
<div class="row">
  <by-radio-group v-model="radio6" size="normal">
    <by-radio-button label="北京">北京</by-radio-button>
    <by-radio-button label="上海" :disabled="true">上海</by-radio-button>
    <by-radio-button label="深圳">深圳</by-radio-button>
    <by-radio-button label="凹凸实验室">凹凸实验室</by-radio-button>
  </by-radio-group>
</div>
<div class="row">
  <by-radio-group v-model="radio6" size="small">
    <by-radio-button label="北京">北京</by-radio-button>
    <by-radio-button label="上海" :disabled="true">上海</by-radio-button>
    <by-radio-button label="深圳">深圳</by-radio-button>
    <by-radio-button label="凹凸实验室">凹凸实验室</by-radio-button>
  </by-radio-group>
</div>
```
::: 

## Radio 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
| :---------- | :-------------- | :---------- | :-----------------------------  | :-------- |
| label | 指定当前组件的 value 值 | String / Number | - | - |
| value | 用于跟 label 比较，判断是否选中（只在单独使用时有效） | String / Number | - | - |
| disabled | 是否禁用当前项 |Boolean | - | false |

## Radio Button 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
| :---------- | :-------------- | :---------- | :-----------------------------  | :-------- |
| label | 指定当前组件的 value 值 | String / Number | - | - |
| disabled | 是否禁用当前项 |Boolean | - | false |

## Radio Group 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| size | 按钮尺寸，仅适用于单选按钮样式 | String | small, normal, large | normal |
| value | 组合按钮的选中值，通常使用 `v-model` 绑定 | String / Number | - | - |
| fill | 选中按钮的背景色 | String，颜色的 Hex 值 | - | - |
| textColor | 选中按钮的字体颜色 | String，颜色的 Hex 值 | - | - |

## Radio Group 事件

| 事件名称      | 说明          | 返回值  |
|---------- |-------------- |---------- |
| radio-group-change | 绑定的值变化时触发 | 选择的按钮的 value 值 |

<style lang="scss" scoped>
  .row + .row {
    margin-top: 8px;
  }
</style>

<script>
  export default {
    data() {
      return {
        radio: '2',
        radio2: '4',
        radio3: '1',
        radio4: '深圳',
        radio5: '深圳',
        radio6: '深圳'
      }
    }
  }
</script>
