<template>
    <div class="login">
        <el-input v-model="formData.email"
                  placeholder="账号" />
        <el-input v-model="formData.password"
                  placeholder="password"
                  type="password" />
        <el-button @click="handelSubmit">登录</el-button>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Login extends Vue {
    formData = {
        email: 'lisi@landawang.com',
        password: '123456'
    }

    handelSubmit() {
        this.$request('login', this.formData).then(({data}) => {
            // 模拟登录成功，记录token
            window.localStorage.setItem('token',data.token);
            this.$router.push({
                name: 'company-list'
            });
        })
    }
}
</script>
<style lang="scss" scoped>
.login {
    width: 320px;
    /deep/.el-input,
    .el-button {
        margin-top: 20px;
    }
}
</style>