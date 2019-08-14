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

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class ByRateMd extends Vue {
        value2 = 3;
    }
</script>
