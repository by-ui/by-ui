# Rate 评分

---

评分组件

## 基础用法

最简单的用法。

:::demo
```html
    <by-rate></by-rate>
```
:::


## 文案展现

给评分组件加上文案展示。

:::demo
```html
<by-rate :show-text="true" v-model="value2">
    <span>{{ value2 }} 星</span>
</by-rate>
```
:::

## 其他图标

可以将星星替换为其他图标。

:::demo
```html
    <by-rate icon="icon-heart-on"></by-rate>
```
:::


## 半星

支持选中半星。

:::demo
```html
<by-rate :allow-half="true"
            :show-text="true"
            :value="valueHalfStar"
            @on-change="onStarChange"
            @on-hover-change="onHoverChange">
</by-rate>
```
:::


## 只读

只读，无法进行鼠标交互。

:::demo
```html
<by-rate :allow-half="true"
            :show-text="true"
            :value="valueReadonly"
            :disabled="true">
</by-rate>
```
:::

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class ByRateMd extends Vue {
        value2 = 3;

        value1 = 2.5;

        valueHalfStar = 1;

        valueReadonly = 3;

        onStarChange(val:number){
            console.log(val);
        }

        onHoverChange(val:number){
            console.log(val);
        }
    }
</script>



## Rate 参数

| 参数       | 说明               | 类型    | 可选值 | 默认值      |
|------------|--------------------|---------|--------|-------------|
| count      | star 总数          | Number  | -      | 5           |
| value      | 当前值             | String  | -      | 0           |
| allow-half | 是否允许选择半颗星 | Boolean | -      | `false`     |
| disabled   | 只读，无法进行交互 | Boolean | -      | `false`     |
| icon       | 指定图标           | String  | -      | `icon-star` |
| show-text  | 实现显示辅助文案   | Boolean | -      | `false`     |

## Rate 事件

| 事件名称        | 说明                                 | 返回值     |
|-----------------|--------------------------------------|------------|
| on-change       | star 数目改变时触发                  | 改变后的值 |
| on-hover-change | 鼠标在 star 上移动导致数值变化时触发 | 改变后的值 |


## Rate slot

| 名称 | 说明                 |
|------|----------------------|
| -    | 自定义展示文案的内容 |
