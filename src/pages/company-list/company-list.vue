<template>
    <frame-list-view class="company-list"
                     :list-data="listData"
                     :option-list="optionList"
                     :page-option="pageOption"
                     :get-data="getData">
        <template #add>
            <router-link :to="{name:'company-detail'}">213</router-link>
        </template>
    </frame-list-view>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class CompanyList extends Vue {
    listData = [];

    optionList = [
        { prop: 'companyNo', label: '企业编号' },
        { prop: 'companyName', label: '企业名称' },
        { prop: 'subConut', label: '主体数量' },
        { prop: 'companyName', label: '操作' },
    ]

    pageOption = {
        total: 10,
        pageSize: '1',
    }

    getData() {
        return this.$request('company-list').then(({ data }) => {
            this.listData = data.data || [];
            this.pageOption.total = data.total || 0;
        })
    }
}
</script>
<style lang="scss" scoped>
.company-list {
}
</style>