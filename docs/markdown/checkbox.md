# Checkbox 多选框
-----

## 基本多选框

独立使用时，需要单独绑定 `model`

:::demo
```html
<by-checkbox v-model="checkboxValue1" label="深圳">深圳</by-checkbox>
<p class="demo-desc">value：{{ checkboxValue1 }}</p>
```
:::


## 不可用的多选框

添加 `disabled` 属性禁用多选框

:::demo
```html
<by-checkbox v-model="checkboxValue2" label="深圳" disabled>深圳</by-checkbox>
<by-checkbox v-model="checkboxValue3" label="新仁类实验室" disabled checked>新仁类实验室</by-checkbox>
```
:::



## 多选框组

适用于多个多选框绑定同一个 `model` 的情景

:::demo
```html
<by-checkbox-group v-model="checkboxValue4">
    <by-checkbox label="深圳">深圳</by-checkbox>
    <by-checkbox label="北京">北京</by-checkbox>
    <by-checkbox label="上海">上海</by-checkbox>
    <by-checkbox label="广州" disabled>广州</by-checkbox>
    <by-checkbox label="香港" disabled>香港</by-checkbox>
</by-checkbox-group>
<p class="demo-desc">value：{{ checkboxValue4 }}</p>
```
:::


## Checkbox 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 选中状态的值 | String | - | - |
| disabled | 是否禁用按钮 | Boolean | - | false |
| checked | 是否已勾选 | Boolean | - | false |

## Checkbox 事件

| 事件名称      | 说明          | 返回值  |
|---------- |-------------- |---------- |
| on-change | 绑定的值变化时触发 | 选中的按钮的 label 值 |

## Checkbox Group 事件

| 事件名称      | 说明          | 返回值  |
|---------- |-------------- |---------- |
| on-change | 绑定的值变化时触发 | 选中的按钮的 label 值 |

<script lang="ts">
 import { Vue, Component } from "vue-property-decorator";

 @Component
 export default class MyComponent extends Vue {

     checkboxValue1 = true;

     checkboxValue2 = false;

     checkboxValue3 = true;

     checkboxValue4 = ['上海'];

 }
</script>
