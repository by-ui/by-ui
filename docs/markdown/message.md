
# Message 全局提示

----

相比 `Notification`，`Message` 更轻量，居中显示在页面顶部，用于展示全局消息，例如操作的反馈信息

- 提供消息、成功、错误、警告等反馈提示
- 在顶部居中显示，并自动消失，是一种不打断用户操作的轻量级提示

我们在 `Vue.prototype` 中添加了全局对象 `$message`，我们可以直接通过 `this.$message` 操作实例

- `this.$message(config)`
- `this.$message.info(config)`
- `this.$message.success(config)`
- `this.$message.warning(config)`
- `this.$message.error(config)`
- `this.$message.loading(config)`

## 基础用法

四种类型的消息提示

:::demo
```html
<by-button @click="handleClick('info')">Info</by-button>
<by-button @click="handleClick('success')">Success</by-button>
<by-button @click="handleClick('warning')">Warning</by-button>
<by-button @click="handleClick('error')">Error</by-button>

<script>
  export default {
    methods: {
      handleClick (type) {
        if (type === 'info') {
          this.$message.info('这是一条提示信息这是一条提示信息这是一条提示信息这是一条提示信息这是一条提示信息')
        } else if (type === 'success') {
          this.$message.success('这是一条成功信息')
        } else if (type === 'warning') {
          this.$message.warning('这是一条警告信息')
        } else if (type === 'error') {
          this.$message.error('这是一条错误信息')
        }
      }
    }
  }
</script>
```
:::

## 修改延时

提示默认的显示时长为 `3s`，可传递 `duration` 来自定义时长

:::demo
```html
<by-button @click="changeDuration">修改延时</by-button>

<script>
  export default {
    methods: {
      changeDuration () {
        this.$message.info({
          message: '这是一条提示信息，10s 后自动关闭',
          duration: 10000
        })
      }
    }
  }
</script>
```
:::

## 加载中

`this.$message.loading` 返回关闭方法，可用于手动关闭提示框

:::demo
```html
<by-button @click="showLoading">显示加载中...</by-button>

<script>
  export default {
    methods: {
      showLoading () {
        const loading = this.$message.loading({
          message: '加载中...',
          duration: 0
        })
        setTimeout(loading, 3000)
      }
    }
  }
</script>
```
:::

## 单独引用

通过 `import` 方式引用

:::demo
```html
<by-button @click="handleImportClick('info')">Info</by-button>
<by-button @click="handleImportClick('success')">Success</by-button>
<by-button @click="handleImportClick('warning')">Warning</by-button>
<by-button @click="handleImportClick('error')">Error</by-button>

<script>
  export default {
    methods: {
      handleImportClick (type) {
        if (type === 'info') {
          Message.info('这是一条提示信息这是一条提示信息这是一条提示信息这是一条提示信息这是一条提示信息')
        } else if (type === 'success') {
          Message.success('这是一条成功信息')
        } else if (type === 'warning') {
          Message.warning('这是一条警告信息')
        } else if (type === 'error') {
          Message.error('这是一条错误信息')
        }
      }
    }
  }
</script>
```
:::

## Message 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 全局提示的类别 | String | `success`, `error`, `warning`, `info` | `info` |
| message | 提示的内容 | String | - | - |
| duration | 自动关闭的延时，默认为 `3000` 毫秒 | Number | - | 3000 |
| icon | 自定义类别ICON | String | - | `info` |
| onClose | 关闭提示框时的回调函数 | Function | - | - |

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    import { Message } from 'By-UI'

 @Component
 export default class MyComponent extends Vue {

      handleClick (type) {
        if (type === 'info') {
          this.$message.info('这是一条提示信息这是一条提示信息这是一条提示信息这是一条提示信息这是一条提示信息')
        } else if (type === 'success') {
          this.$message.success('这是一条成功信息')
        } else if (type === 'warning') {
          this.$message.warning('这是一条警告信息')
        } else if (type === 'error') {
          this.$message.error('这是一条错误信息')
        }
      }

      handleImportClick (type) {
        if (type === 'info') {
          Message.info('这是一条提示信息这是一条提示信息这是一条提示信息这是一条提示信息这是一条提示信息')
        } else if (type === 'success') {
          Message.success('这是一条成功信息')
        } else if (type === 'warning') {
          Message.warning('这是一条警告信息')
        } else if (type === 'error') {
          Message.error('这是一条错误信息')
        }
      }

      changeDuration () {
        this.$message.info({
          message: '这是一条提示信息，10s 后自动关闭',
          duration: 10000
        })
      }

      showLoading () {
        const loading = this.$message.loading({
          message: '加载中...',
          duration: 0
        })
        setTimeout(loading, 3000)
      }

        mounted(){
            console.log(Message);
        }
    }
</script>


