# Notification 通知提醒

----

在页面的右上角全局显示通知提醒信息，跟 `Message` 有点类似。常用于以下场景：

- 较复杂的通知内容
- 有交互的通知
- 系统的推送

我们在 `Vue.prototype` 中添加了全局对象 `$notify`，我们可以直接通过 `this.$notify` 操作实例

- `this.$notify(config)`
- `this.$notify.success(config)`
- `this.$notify.error(config)`
- `this.$notify.warning(config)`
- `this.$notify.info(config)`

实例接收如下参数：

- type - 通知提醒的状态
- title - 消息标题
- message - 消息内容
- duration - 自动关闭的延时
- showClose - 是否显示关闭按钮
- icon - 自定义消息提醒的图标
- onClose - 关闭的回调函数

## 基本用法

仅显示标题，或者标题和内容，默认 `4s` 后自动关闭。通知框默认显示关闭按钮

:::demo
```html
<p class="demo-desc">this.$notify({ title: '这里是标题' })</p>
<by-button @click="open">打开通知（仅标题）</by-button>
<p class="demo-desc">this.$notify({ title: '这里是标题', message: '这里是内容，文案~~~' })</p>
<by-button @click="open2">打开通知（标题和内容）</by-button>

<script>
  export default {
    methods: {
      open () {
        this.$notify({
          title: '这里是标题'
        })
      },
      open2 () {
        this.$notify({
          title: '这里是标题',
          message: '这里是内容，文案~~~'
        })
      }
    }
  }
</script>
```
:::

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class MyComponent extends Vue {
        open () {
            this.$notify({
                title: '这里是标题'
            })
        }
        open2 () {
            this.$notify({
                title: '这里是标题',
                message: '这里是内容，文案~~~'
            })
        }
    }
 </script>
