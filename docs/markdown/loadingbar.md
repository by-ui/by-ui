
# LoadingBar 加载进度条

----

全局创建了一个用于显示页面加载、异步请求的加载进度条。

因为可复用性的关系，`LoadingBar` 只会全局创建一个实例，而且在 `Vue.prototype` 中添加了全局对象 `$loadingBar`，可以直接通过 `this.$loadingBar` 操作实例

## 基础用法

通过调用 `$loadingBar` 提供的三种方法来控制全局的加载进度条 `start()`、`finish()`、`error()`


:::demo
```html
<by-button @click="start">Start</by-button>
<by-button @click="finish">Finish</by-button>
<by-button @click="error">Error</by-button>
<by-button @click="update">Update</by-button>

<script>
  export default {
    methods: {
      start () {
        this.$loadingBar.start()
      },
      finish () {
        this.$loadingBar.finish()
      },
      error () {
        this.$loadingBar.error()
      },
      update () {
        this.$loadingBar.update(60)
      }
    }
  }
</script>
```
:::


## LoadingBar 函数方法

| 函数名      | 说明          | 参数      |
|---------- |-------------- |---------- |
| start | 开始从 0 显示加载进度条，并自动加载 | - |
| finish | 完成进度条 | - |
| error | 显示错误类型的进度条 | - |
| update | 指定进度的百分比，更新进度条 | percent，指定进度的百分比 |

## LoadingBar 配置

提供 `LoadingBar` 的全局配置，使用方法如下：

```js
this.$loadingBar.config(new LoadingBarOption(
    10, // 高度
    'linear-gradient(to right, #30fcfc, #fff5ee)', // 背景色，支持渐变
    1, // 百分比进度
    'success',  // 状态
    true // 显示隐藏
));
```

:::demo
```html
<by-button @click="startLinear">设置渐变及高度</by-button>

<script>
  export default {
    methods: {
      startLinear(){
        this.$loadingBar.config(new LoadingBarOption(
            10, 'linear-gradient(to right, #30fcfc, #fff5ee)', 1, 'success', true
        ));
        this.$loadingBar.start()
      },
    }
  }
</script>
```
:::

## LoadingBar 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| height | 进度条的线宽 | Number | - | 4 |
| color | 进度条的背景色 | String | - | - |
| percent | 进度条的百分比 | Number | - | - |
| status | 进度条的状态 | String | `success` `error` | success |
| show | 进度条的显隐 | Boolean | `true` `false` | true |

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    import { LoadingBarOption } from '../../src/components/loading-bar/model.ts';

    @Component
    export default class LoadingBar extends Vue {
        start () {
            this.$loadingBar.start();
        }
        startLinear(){
            this.$loadingBar.config(new LoadingBarOption(
                10, 'linear-gradient(to right, #30fcfc, #fff5ee)', 1, 'success', true
            ));
            this.$loadingBar.start();
        }
        finish () {
            this.$loadingBar.finish();
        }
        error () {
            this.$loadingBar.error();
        }
        update () {
            this.$loadingBar.update(60)
        }
    }
 </script>
