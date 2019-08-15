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
            :value="value1">
</by-rate>
```
:::


## 只读

只读，无法进行鼠标交互。

:::demo
```html
<by-rate :allow-half="true"
            :show-text="true"
            :value="value1"
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
    }
</script>
