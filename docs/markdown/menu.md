
# Menu 导航菜单

----

导航菜单一般分为顶部导航和侧边导航，是为页面提供导航功能的菜单列表

## 顶部导航

顶部导航需要设置 `mode="horizontal"`

:::demo
```html
<by-menu mode="horizontal" active-name="1">
  <by-menu-item name="1"><i class="icon icon-home"></i>导航菜单一</by-menu-item>
  <by-menu-item name="2" disabled><i class="icon icon-layers"></i>导航菜单二</by-menu-item>
  <by-submenu>
    <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单三 - 子菜单</template>
    <by-menu-item-group title="分组一">
      <by-menu-item name="3-1">子菜单一</by-menu-item>
      <by-menu-item name="3-2" disabled>子菜单二</by-menu-item>
    </by-menu-item-group>
    <by-menu-item-group title="分组二">
      <by-menu-item name="3-3">子菜单三</by-menu-item>
      <by-menu-item name="3-4">子菜单四</by-menu-item>
    </by-menu-item-group>
  </by-submenu>
  <by-menu-item name="4"><i class="icon icon-settings"></i>导航菜单四</by-menu-item>
</by-menu>
```
:::

## 顶部导航（多级菜单）

可以在 `AtSubmenu` 中嵌套 `AtSubmenu` 组合成多级菜单

:::demo
```html
<by-menu mode="horizontal" active-name="1">
  <by-menu-item name="1"><i class="icon icon-home"></i>导航菜单一</by-menu-item>
  <by-menu-item name="2"><i class="icon icon-layers"></i>导航菜单二</by-menu-item>
  <by-submenu>
    <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单三</template>
    <by-menu-item name="3-1"><i class="icon icon-settings"></i>导航菜单四</by-menu-item>
    <by-menu-item name="3-2"><i class="icon icon-settings"></i>导航菜单五</by-menu-item>
    <by-submenu>
      <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单六</template>
      <by-menu-item name="3-3-1"><i class="icon icon-settings"></i>导航菜单七</by-menu-item>
      <by-menu-item name="3-3-2"><i class="icon icon-settings"></i>导航菜单八</by-menu-item>
    </by-submenu>
  </by-submenu>
  <by-menu-item name="4"><i class="icon icon-settings"></i>导航菜单四</by-menu-item>
</by-menu>
```
:::

## 侧边垂直导航

顶部导航需要设置 `mode="vertical"`

:::demo
```html
<by-menu mode="vertical" active-name="1">
  <by-menu-item name="1"><i class="icon icon-home"></i>导航菜单一</by-menu-item>
  <by-menu-item name="2" disabled><i class="icon icon-layers"></i>导航菜单二</by-menu-item>
  <by-submenu>
    <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单三 - 子菜单</template>
    <by-menu-item-group title="分组一">
      <by-menu-item name="3-1">子菜单一</by-menu-item>
      <by-menu-item name="3-2" disabled>子菜单二</by-menu-item>
    </by-menu-item-group>
    <by-menu-item-group title="分组二">
      <by-menu-item name="3-3">子菜单三</by-menu-item>
      <by-menu-item name="3-4">子菜单四</by-menu-item>
    </by-menu-item-group>
  </by-submenu>
  <by-menu-item name="4"><i class="icon icon-settings"></i>导航菜单四</by-menu-item>
</by-menu>
```
:::

## 侧边垂直导航（多级菜单）

:::demo
```html
<by-menu mode="vertical" active-name="1">
  <by-menu-item name="1"><i class="icon icon-home"></i>导航菜单一</by-menu-item>
  <by-menu-item name="2"><i class="icon icon-layers"></i>导航菜单二</by-menu-item>
  <by-submenu>
    <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单三 - 子菜单</template>
    <by-menu-item-group title="分组一">
      <by-menu-item name="3-1">子菜单一</by-menu-item>
      <by-menu-item name="3-2">子菜单二</by-menu-item>
    </by-menu-item-group>
    <by-menu-item-group title="分组二">
      <by-menu-item name="3-3">子菜单三</by-menu-item>
      <by-menu-item name="3-4">子菜单四</by-menu-item>
    </by-menu-item-group>
  </by-submenu>
  <by-submenu>
    <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单四</template>
    <by-menu-item name="4-1"><i class="icon icon-settings"></i>导航菜单五</by-menu-item>
    <by-menu-item name="4-2"><i class="icon icon-settings"></i>导航菜单六</by-menu-item>
    <by-submenu>
      <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单七</template>
      <by-menu-item name="4-3-1"><i class="icon icon-settings"></i>导航菜单八</by-menu-item>
      <by-menu-item name="4-3-2"><i class="icon icon-settings"></i>导航菜单九</by-menu-item>
    </by-submenu>
  </by-submenu>
</by-menu>
```
:::

## 侧边内嵌导航

导航菜单默认 `mode="inline"`

:::demo
```html
<by-menu active-name="1">
  <by-menu-item name="1"><i class="icon icon-home"></i>导航菜单一</by-menu-item>
  <by-menu-item name="2" disabled><i class="icon icon-layers"></i>导航菜单二</by-menu-item>
  <by-submenu>
    <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单三 - 子菜单</template>
    <by-menu-item-group title="分组一">
      <by-menu-item name="3-1">子菜单一</by-menu-item>
      <by-menu-item name="3-2">子菜单二</by-menu-item>
    </by-menu-item-group>
    <by-menu-item-group title="分组二">
      <by-menu-item name="3-3">子菜单三</by-menu-item>
      <by-menu-item name="3-4" disabled>子菜单四</by-menu-item>
    </by-menu-item-group>
  </by-submenu>
  <by-menu-item name="4"><i class="icon icon-settings"></i>导航菜单四</by-menu-item>
  <by-submenu disabled>
    <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单三 - 子菜单</template>
    <by-menu-item name="5-1">子菜单一</by-menu-item>
    <by-menu-item name="5-2">子菜单二</by-menu-item>
  </by-submenu>
</by-menu>
```
:::

## 每次只展开一个子菜单

设置属性 `inline-collapsed`，可开启 `手风琴模式`，即每次只能有一个子菜单被打开。同时 `AtSubmenu` 组件可使用参数 `opened` 配置子菜单默认展开

:::demo
```html
<by-menu active-name="1-1" inline-collapsed>
  <by-submenu opened>
    <template slot="title"><i class="icon icon-home"></i>导航菜单一</template>
    <by-menu-item-group title="分组一">
      <by-menu-item name="1-1">子菜单一</by-menu-item>
      <by-menu-item name="1-2">子菜单二</by-menu-item>
    </by-menu-item-group>
    <by-menu-item-group title="分组二">
      <by-menu-item name="1-3">子菜单三</by-menu-item>
      <by-menu-item name="1-4">子菜单四</by-menu-item>
    </by-menu-item-group>
  </by-submenu>
  <by-submenu>
    <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单二</template>
    <by-menu-item name="2-1">子菜单一</by-menu-item>
    <by-menu-item name="2-2">子菜单二</by-menu-item>
    <by-menu-item name="2-3">子菜单三</by-menu-item>
    <by-menu-item name="2-4">子菜单四</by-menu-item>
  </by-submenu>
  <by-submenu>
    <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单三</template>
    <by-menu-item name="3-1">子菜单一</by-menu-item>
    <by-menu-item name="3-2">子菜单二</by-menu-item>
    <by-menu-item name="3-3">子菜单三</by-menu-item>
    <by-menu-item name="3-4">子菜单四</by-menu-item>
  </by-submenu>
  <by-submenu>
    <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单四</template>
    <by-menu-item name="4-1">子菜单一</by-menu-item>
    <by-menu-item name="4-2">子菜单二</by-menu-item>
  </by-submenu>
</by-menu>
```
:::

## 主题

内置两个主题：`light` 和 `dark`。默认使用 `light` 主题

:::demo
```html
<div class="row" style="margin-bottom: 24px;">
  <by-switch :value="true" @change="changeTheme">
    <span slot="checkedText">Dark</span>
    <span slot="unCheckedText">Light</span>
  </by-switch>
  <by-radio-group v-model="mode" style="margin-left: 40px;">
    <by-radio label="inline">Inline</by-radio>
    <by-radio label="horizontal">Horizontal</by-radio>
    <by-radio label="vertical">Vertical</by-radio>
  </by-radio-group>
</div>
<by-menu :theme="theme" :mode="mode" active-name="0" >
  <by-menu-item name="0" disabled><i class="icon icon-box"></i>子菜单</by-menu-item>
  <by-submenu>
    <template slot="title"><i class="icon icon-home"></i>导航菜单一</template>
    <by-menu-item-group title="分组一">
      <by-menu-item name="1-1">子菜单一</by-menu-item>
      <by-menu-item name="1-2">子菜单二</by-menu-item>
    </by-menu-item-group>
    <by-menu-item-group title="分组二">
      <by-menu-item name="1-3">子菜单三</by-menu-item>
      <by-menu-item name="1-4">子菜单四</by-menu-item>
    </by-menu-item-group>
  </by-submenu>
  <by-submenu>
    <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单二</template>
    <by-menu-item name="2-1">子菜单一</by-menu-item>
    <by-menu-item name="2-2">子菜单二</by-menu-item>
    <by-menu-item name="2-3" disabled>子菜单三</by-menu-item>
    <by-menu-item name="2-4">子菜单四</by-menu-item>
  </by-submenu>
  <by-submenu>
    <template slot="title"><i class="icon icon-command"></i>导航菜单三</template>
    <by-menu-item name="3-1">子菜单一</by-menu-item>
    <by-menu-item name="3-2">子菜单二</by-menu-item>
    <by-menu-item name="3-3">子菜单三</by-menu-item>
    <by-menu-item name="3-4">子菜单四</by-menu-item>
  </by-submenu>
  <by-submenu disabled>
    <template slot="title"><i class="icon icon-inbox"></i>导航菜单四</template>
    <by-menu-item name="4-1">子菜单一</by-menu-item>
    <by-menu-item name="4-2">子菜单二</by-menu-item>
  </by-submenu>
</by-menu>
```
:::

## 每次只展开一个子菜单

设置属性 `inline-collapsed`，可开启 `手风琴模式`，即每次只能有一个子菜单被打开。同时 `AtSubmenu` 组件可使用参数 `opened` 配置子菜单默认展开

:::demo
```html
<by-menu active-name="1-1" inline-collapsed>
  <by-submenu opened>
    <template slot="title"><i class="icon icon-home"></i>导航菜单一</template>
    <by-menu-item-group title="分组一">
      <by-menu-item name="1-1">子菜单一</by-menu-item>
      <by-menu-item name="1-2">子菜单二</by-menu-item>
    </by-menu-item-group>
    <by-menu-item-group title="分组二">
      <by-menu-item name="1-3">子菜单三</by-menu-item>
      <by-menu-item name="1-4">子菜单四</by-menu-item>
    </by-menu-item-group>
  </by-submenu>
  <by-submenu>
    <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单二</template>
    <by-menu-item name="2-1">子菜单一</by-menu-item>
    <by-menu-item name="2-2">子菜单二</by-menu-item>
    <by-menu-item name="2-3">子菜单三</by-menu-item>
    <by-menu-item name="2-4">子菜单四</by-menu-item>
  </by-submenu>
  <by-submenu>
    <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单三</template>
    <by-menu-item name="3-1">子菜单一</by-menu-item>
    <by-menu-item name="3-2">子菜单二</by-menu-item>
    <by-menu-item name="3-3">子菜单三</by-menu-item>
    <by-menu-item name="3-4">子菜单四</by-menu-item>
  </by-submenu>
  <by-submenu>
    <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单四</template>
    <by-menu-item name="4-1">子菜单一</by-menu-item>
    <by-menu-item name="4-2">子菜单二</by-menu-item>
  </by-submenu>
</by-menu>
```
:::

## 添加路由链接

除了可以使用 `name` 配置菜单值，也可以通过 `route` 属性配置 `vue-router` 的路由，添加 `replace` 属性可设置不给 `history` 添加新记录

:::demo
```html
<by-menu router>
  <by-menu-item :to="{ name: 'Breadcrumb-zh' }">Breadcrumb</by-menu-item>
  <by-menu-item :to="{ name: 'Dropdown-zh' }">Dropdown</by-menu-item>
  <by-menu-item :to="{ name: 'Menu-zh' }">Menu</by-menu-item>
  <by-menu-item :to="{ name: 'Pagination-zh' }">Pagination</by-menu-item>
</by-menu>
```
:::

## Menu 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| mode | 导航菜单的模式 | String | `inline`, `horizontal`, `vertical` | `inline` |
| theme | 导航菜单的主题 | String | `light`, `dark` | `light` |
| activeName | 选中的菜单项名称 | String, Number | - | - |
| router | 是否使用 `vue-router` | Boolean | - | false |
| inlineCollapsed | 是否允许每次只展开一个菜单 | Boolean | - | false |
| width | 导航菜单的宽度，仅在 `vertical` 和 `inline` 模式下有效 | String | - | `240px` |

## Menu 事件

| 事件名称 | 说明          | 返回参数  |
|---------- |-------------- |---------- |
| on-select | 切换菜单时触发 | 选中的菜单的值 |

## MenuGroup 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 分组菜单的组名 | String | - | - |

## Submenu 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| disabled | 是否可用 | Boolean | - | false |
| opened | 是否展开菜单项 | Boolean | - | false |

## MenuItem 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 菜单项的名称 | String / Number | - | - |
| to | 	路由跳转对象，同 `vue-router` 中的 `to` | String / Object | - | - |
| replace | 在使用 `to` 时，是否不需要向 `history` 添加新记录 | Boolean | - | false |
| disabled | 是否可用 | Boolean | - | false |

<script>
  export default {
    data () {
      return {
        theme: 'dark',
        mode: 'inline',
      }
    },
    watch: {
      mode (value) {
        if (value !== 'inline') {}
      }
    },
    methods: {
      changeTheme (value) {
        this.theme = value ? 'dark' : 'light'
      }
    }
  }
</script>
