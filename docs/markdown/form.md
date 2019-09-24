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


## 设置label内容及宽度

:::demo
```html
<div style="width: 450px;">
    <by-form :model="formData2" :rules="ruleLogin2" ref="formLogin2" :label-width="80">
        <by-form-item prop="name" label="活动名称">
            <by-input v-model="formData2.name"></by-input>
        </by-form-item>
        <!-- <by-form-item prop="password" label="活动区域">
            <by-select v-model="formData2.area"></by-select>
        </by-form-item> -->
        <by-form-item prop="password" label="即时配送">
            <by-switch v-model="formData2.delivery"></by-switch>
        </by-form-item>
        </el-form-item>
        <by-form-item prop="type" label="活动性质">
            <by-checkbox-group v-model="formData2.type">
                <by-checkbox label="美食/餐厅线上活动" name="type">美食/餐厅线上活动</by-checkbox>
                <by-checkbox label="地推活动" name="type">地推活动</by-checkbox>
                <by-checkbox label="线下主题活动" name="type">线下主题活动</by-checkbox>
                <by-checkbox label="单纯品牌曝光" name="type">单纯品牌曝光</by-checkbox>
            </by-checkbox-group>
        </by-form-item>
        <by-form-item prop="resource" label="特殊资源">
            <by-radio-group v-model="formData2.resource">
                <by-radio label="线上品牌商赞助">线上品牌商赞助</by-radio>
                <by-radio label="线下场地免费">线下场地免费</by-radio>
            </by-radio-group>
        </by-form-item>
        <by-form-item prop="desc" label="活动形式">
            <by-input type="textarea" v-model="formData2.desc"></by-input>
        </by-form-item>
        <by-form-item>
            <by-button type="primary" size="small" @click.prevent="handleSubmit('formLogin2')">登录</by-button>
        </at-form-item>
    </by-form>
</div>
```
:::



## 设置label-postion

:::demo
```html
<by-radio-group v-model="labelPosition" size="small">
    <by-radio-button label="left">左对齐</by-radio-button>
    <by-radio-button label="right">右对齐</by-radio-button>
    <by-radio-button label="top">顶部对齐</by-radio-button>
</by-radio-group>
<div style="width: 400px; margin-top: 20px;">
    <by-form :model="formData3" :rules="ruleLogin3" ref="formLogin3" :label-width="80" :label-position="labelPosition">
        <by-form-item prop="name" label="活动名称">
            <by-input v-model="formData3.name"></by-input>
        </by-form-item>
        <by-form-item label="活动形式">
            <by-input type="textarea" v-model="formData3.desc"></by-input>
        </by-form-item>
        <by-form-item>
            <by-button type="primary" size="small" @click.prevent="handleSubmit('formLogin3')">登录</by-button>
        </at-form-item>
    </by-form>
</div>
```
:::

## API

| 参数        | 说明                                                                                  | 类型    | 可选值 | 默认值 |
|-------------|---------------------------------------------------------------------------------------|---------|--------|--------|
| model       | 表单数据对象                                                                          | object  | —      | —      |
| rules       | 表单验证规则                                                                          | object  | —      | —      |
| inline      | 行内表单模式                                                                          | Boolean | —      | false  |
| label       | 表单域标签的内容                                                                      | string  | —      | —      |
| label-width | 表单域标签的宽度，例如 '50'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。 | number  | —      | —      |

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class ByFormMd extends Vue {

        labelPosition = 'right';

        formData1 = {
            username: '',
            password: '',
            remember: true
        }

        formData2 = {
            name: '',
            area: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
        }

        formData3 = {}

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

        ruleLogin2 = {
            name: [{
                required: true,
                message: '请输入活动名称',
                trigger: 'blur'
            }],
            // area: [{
            //     required: true,
            //     message: '请输入密码',
            //     trigger: 'blur'
            // }, {
            //     type: 'string',
            //     min: 6,
            //     message: '密码长度不能小于6',
            //     trigger: 'blur'
            // }],
            type: [{
                type: 'array',
                required: true,
                message: '请至少选择一个活动性质',
                trigger: 'change'
            }],
            resource: [{
                required: true,
                message: '请选择特殊资源',
                trigger: 'blur'
            }],
            desc: [{
                required: true,
                message: '请输入活动形式',
                trigger: 'blur'
            }],
        }

        ruleLogin3 = {}

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
<style lang="sass" scoped>
    .by-checkbox-group{
        width: 320px;
        margin: 0;
        padding: 0;
        list-style: none;

        .by-checkbox {
            float: left;
            width: 160px;
            margin: 0;
            padding: 0;
        }
    }
</style>
