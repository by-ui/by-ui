# From 表单

:::demo
```html
<by-form v-model="formData" :rules="ruleLogin" ref="formData">
    <!-- <by-form-item label="活动名称">
        <by-input v-model="form.name"></by-input>
    </by-form-item> -->
</by-form>
```
:::

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class ByFormMd extends Vue {
        formData = {
            username: '',
            password: ''
        }

        ruleLogin = {
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
    }
</script>
