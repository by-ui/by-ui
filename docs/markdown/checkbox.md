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
<script lang="ts">
 import { Vue, Component } from "vue-property-decorator";

 @Component
 export default class MyComponent extends Vue {
     checkboxValue1 = true;
 }
</script>
