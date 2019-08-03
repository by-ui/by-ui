# Button 按钮

-----

## 带颜色倾向的按钮

带有色彩倾向的按钮能给用户带来操作提示

:::demo

```html
<div class="row">
    <by-button>默认按钮</by-button>
    <by-button type="primary">主要按钮</by-button>
    <by-button type="success">成功按钮</by-button>
    <by-button type="error">危险按钮</by-button>
    <by-button type="warning">警告按钮</by-button>
    <by-button type="info">信息按钮</by-button>
</div>
<div class="row">
    <by-button plain>默认按钮</by-button>
    <by-button type="primary" plain>主要按钮</by-button>
    <by-button type="success" plain>成功按钮</by-button>
    <by-button type="error" plain>危险按钮</by-button>
    <by-button type="warning" plain>警告按钮</by-button>
    <by-button type="info" plain>信息按钮</by-button>
</div>
<div class="row">
    <by-button round>默认按钮</by-button>
    <by-button type="primary" round>主要按钮</by-button>
    <by-button type="success" round>成功按钮</by-button>
    <by-button type="error" round>危险按钮</by-button>
    <by-button type="warning" round>警告按钮</by-button>
    <by-button type="info" round>信息按钮</by-button>
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
