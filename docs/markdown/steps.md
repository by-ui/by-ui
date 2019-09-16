# Steps 步骤条

---

用于引导用户按照流程完成任务的导航条。

## 基础用法

简单的步骤条
:::demo
```html
<by-step :current='current'>
    <by-step-item title="Step1" description="This is a description."></by-step-item>
    <by-step-item title="Step2" description="This is a description."></by-step-item>
    <by-step-item title="Step3"></by-step-item>
</by-step>

<by-button type="primary" @click="prev" style="margin-top: 12px;">Prev</by-button>
<by-button type="primary" @click="next" style="margin-top: 12px;">Next</by-button>
```
:::


## 迷你版

迷你版的步骤条

:::demo
```html
<by-step size="small" :current='current'>
  <by-step-item title="Step1" description="This is a description."></by-step-item>
  <by-step-item title="Step2" description="This is a description."></by-step-item>
  <by-step-item title="Step3"></by-step-item>
</by-step>

<by-button type="primary" @click="prev" style="margin-top: 12px;">Prev</by-button>
<by-button type="primary" @click="next" style="margin-top: 12px;">Next</by-button>
```
:::

## 带图标的步骤条

通过设置 `Step` 的 `icon` 属性，可自定义图标。

:::demo
```html
<by-step :current='current'>
  <by-step-item title="Step1" description="This is a description." icon="icon-user"></by-step-item>
  <by-step-item title="Step2" description="This is a description." icon="icon-airplay"></by-step-item>
  <by-step-item title="Step3" icon="icon-pocket"></by-step-item>
</by-step>

<by-button type="primary" @click="prev" style="margin-top: 12px;">Prev</by-button>
<by-button type="primary" @click="next" style="margin-top: 12px;">Next</by-button>
```
:::

## 步骤切换

配合内容及按钮使用，表示一个流程的处理进度。

:::demo
```html

<by-step :current='current'>
  <by-step-item v-for="(step, index) in steps"
    :title="step.title"
    :key="index"></by-step-item>
</by-step>
<div class="steps-content" style="margin-top: 16px; border: 1px solid #e9e9e9; border-radius: 6px;background-color: #fafafa; min-height: 200px; text-align: center; padding-top:80px;">
  {{ steps[current].content }}
</div>

<by-button type="primary" @click="prev" style="margin-top: 12px;">Prev</by-button>
<by-button type="primary" @click="next" style="margin-top: 12px;">Next</by-button>
```
:::



## 竖直方向的步骤条

简单的竖直方向的步骤条

:::demo
```html
<by-step :current='current' direction="vertical">
  <by-step-item title="Step1" description="This is a description."></by-step-item>
  <by-step-item title="Step2" description="This is a description."></by-step-item>
  <by-step-item title="Step3" description="This is a description."></by-step-item>
</by-step>

<by-button type="primary" @click="prev" style="margin-top: 12px;">Prev</by-button>
<by-button type="primary" @click="next" style="margin-top: 12px;">Next</by-button>
```
:::

## 竖直方向的小型步骤条

简单的竖直方向的小型步骤条。

:::demo
```html
<by-step :current='current' size="small" direction="vertical">
  <by-step-item title="Step1" description="This is a description."></by-step-item>
  <by-step-item title="Step2" description="This is a description."></by-step-item>
  <by-step-item title="Step3" description="This is a description."></by-step-item>
</by-step>

<by-button type="primary" @click="prev" style="margin-top: 12px;">Prev</by-button>
<by-button type="primary" @click="next" style="margin-top: 12px;">Next</by-button>
```
:::

## 步骤运行错误

使用 `Steps` 的 `status`  属性来指定当前步骤的状态。

:::demo
```html
<by-step :current='current' status="error">
  <by-step-item title="Step1" description="This is a description."></by-step-item>
  <by-step-item title="Step2" description="This is a description."></by-step-item>
  <by-step-item title="Step3"></by-step-item>
</by-step>

<by-button type="primary" @click="prev" style="margin-top: 12px;">Prev</by-button>
<by-button type="primary" @click="next" style="margin-top: 12px;">Next</by-button>
```
:::

## Steps 参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| current | 指定当前步骤，从 0 开始计数 | Number | - | 0 |
| status | 指定当前步骤的状态，会覆盖子元素 `Step` 的状态 | String | `wait` `process` `finish` `error` | `process` |
| size | 指定样式大小 | String | `default` `small` | `default` |
| direction | 指定步骤条方向 | String | `horizontal` `vertical` | `horizontal` |


## Steps.Step 参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 标题 | String | - | - |
| description | 描述 | String | - | - |
| icon | 图标 | String | - | - |
| status | 指定当前步骤的状态。当不配置此属性时，会使用 `Steps` 的 `current` 来自动指定状态 | String | `wait` `process` `finish` `error` | - |

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class ByStepsMd extends Vue {

        current = 0;

        steps = [{
            title: 'First',
            content: 'First-content'
        }, {
            title: 'Second',
            content: 'Second-content'
        }, {
            title: 'Last',
            content: 'Last-content'
        }];

        prev () {
            if (this.current-- <= 0)
            this.current = 0
        }

        next () {
            if (this.current++ >= 2)
            this.current = 2
        }
    }

</script>
