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
    <by-button loading >加载中</by-button>
```
:::

### 不同尺寸
Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。
:::demo
```html
    <div>
        <by-button type="primary" size="large">变大按钮</by-button>
        <by-button type="primary">正常按钮</by-button>
        <by-button type="primary" size="small">变小按钮</by-button>
        <by-button type="primary" size="smaller">超小按钮</by-button>
    </div>
    <div style="margin-top: 20px;">
        <by-button  icon="icon-edit" circle size="large"></by-button>
        <by-button  icon="icon-edit" circle></by-button>
        <by-button  icon="icon-edit" circle size="small"></by-button>
        <by-button  icon="icon-edit" circle size="smaller"></by-button>
    </div>
```
:::

## Button 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 按钮的类型 | String | `default` `primary` `success` `error` `warning` `info` `text` | - |
| nativeType | 原生按钮的类型 | String | - | `button` |
| size | 按钮的大小 | String | `large`, `small`, `smaller` | - |
| hollow | 是否为空心按钮 | Boolean | - | false |
| icon | 按钮的图标类名，填入图标的 `classname` | String | 见文档 `Icon 图标` | - |
| loading | 设置按钮的载入状态 | Boolean | - | false |
| circle | 设置圆形图标按钮 | Boolean | - | false |


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
