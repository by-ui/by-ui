# From 表单

----

## 简单的表单

:::demo
```html
<by-form :model="formData1" :rules="ruleLogin1" ref="formLogin1">
    <by-form-item prop="username">
        <by-input v-model="formData1.username" placeholder="用户名">
            <template slot="prepend">
                <i class="icon icon-user"></i>
            </template>
        </by-input>
    </by-form-item>
    <by-form-item prop="password">
        <by-input v-model="formData1.password" placeholder="密码">
            <template slot="prepend">
                <i class="icon icon-lock"></i>
            </template>
        </by-input>
    </by-form-item>
    <by-form-item label="记住密码">
        <by-switch v-model="formData1.remember"></by-switch>
    </by-form-item>
    <by-form-item>
        <by-button type="primary" size="small" @click.prevent="handleSubmit('formLogin1')">登录</by-button>
    </at-form-item>
</by-form>
```
:::


## 设置label及宽度

:::demo
```html
<by-form :model="formData2" :rules="ruleLogin2" ref="formLogin2" :label-width="80">
    <by-form-item prop="username" label="用户名">
        <by-input v-model="formData2.username" placeholder="用户名"></by-input>
    </by-form-item>
    <by-form-item prop="password" label="密码">
        <by-input v-model="formData2.password" placeholder="密码"></by-input>
    </by-form-item>
    <by-form-item>
        <by-button type="primary" size="small" @click.prevent="handleSubmit('formLogin2')">登录</by-button>
    </at-form-item>
</by-form>
```
:::

## API

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| model | 表单数据对象	 | object | — | —
| rules | 表单验证规则	 | object | — | —
| inline | 行内表单模式	 | Boolean | — | false
| label | 字段标题 | string | — | —
| label-width | 表单域标签的宽度，例如 '50'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。	  | number | — | —

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class ByFormMd extends Vue {
        formData1 = {
            username: '',
            password: '',
            remember: true
        }

        ruleLogin1 = {
            username: [{
                required: true,
                message: '请输入用户名',
                trigger: 'blur'
            }],
            password: [{
                required: true,
                message: '请输入密码',
                trigger: 'blur'
            }, {
                type: 'string',
                min: 6,
                message: '密码长度不能小于6',
                trigger: 'blur'
            }]
        }

        formData2 = {
            username: '',
            password: ''
        }

        ruleLogin2 = {
            username: [{
                required: true,
                message: '请输入用户名',
                trigger: 'blur'
            }],
            password: [{
                required: true,
                message: '请输入密码',
                trigger: 'blur'
            }, {
                type: 'string',
                min: 6,
                message: '密码长度不能小于6',
                trigger: 'blur'
            }]
        }

        handleSubmit (name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.$notify({
                        type: 'success',
                        message: '提交成功'
                    })
                } else {
                    this.$notify({
                        type: 'error',
                        message: '校验失败'
                    })
                }
            })
        }
    }
</script>
