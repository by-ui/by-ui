# Tag 标签

-----

## 基本标签

设置 `closable` 属性可给标签添加关闭按钮，点击关闭按钮触发 `on-close` 事件，按钮不包含逻辑，如需删除 `tag`，请自行添加关闭逻辑

:::demo

```html
<div class="row">
    <by-tag>标签一</by-tag>
    <by-tag>标签二</by-tag>
    <by-tag>标签三</by-tag>
    <by-tag name="标签四" closable v-if="show" @on-close="handleClose">标签四</by-tag>
</div>

```
:::

## 不可用状态按钮

添加属性 `disabled` 禁用按钮
:::demo
```html
<div class="row">
    <by-button type="primary" disabled>主要按钮</by-button>
    <by-button hollow disabled>次要按钮</by-button>
    <by-button type="text" disabled>文字按钮</by-button>
</div>
```
:::


## 图标按钮

添加属性 `icon` 渲染图标按钮
:::demo
```html
<div class="row">
    <by-button icon="icon-edit" circle></by-button>
    <by-button type="primary" icon="icon-edit" circle></by-button>
    <by-button type="success" icon="icon-edit" circle></by-button>
    <by-button type="error" icon="icon-edit" circle></by-button>
    <by-button type="warning" icon="icon-edit" circle></by-button>
    <by-button type="info" icon="icon-edit" circle></by-button>
</div>
```
:::

`loading` 按钮
:::demo
```html
    <by-button loading circle></by-button>
```
:::



<style lang="scss" scoped>
    .row {
        .by-btn + .by-btn {
            margin-left: 8px;
        }

        & + .row {
            margin-top: 20px;
        }
        .by-btn-group .by-btn {
            margin-left: 0;
        }
    }

    .by-btn-group {
        margin-left: 8px;
        margin-top: 16px;
    }
</style>
