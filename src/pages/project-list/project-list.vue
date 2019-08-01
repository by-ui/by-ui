<template>
    <frame-list-view class="project-list"
                     :list-data="listData"
                     :option-list="optionList"
                     :page-option="pageOption"
                     :get-data="getData">

    </frame-list-view>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class projectList extends Vue {
    listData = [];

    optionList = [
        { prop: 'projectName', label: '项目名称' },
        { prop: 'companyName', label: '所属企业' },
        { prop: 'newbie_day', label: '新人期' },
        { prop: 'created_at', label: '创建时间' },
    ]

    pageOption = {
        total: 10,
        pageSize: '1',
    }

    getData() {
        return this.$request('project-list').then(({ data }) => {
            this.listData = data.data || [];
            this.pageOption.total = data.total || 0;
        })
    }
}
</script>
<style lang="scss" scoped>
.project-list {
}
</style>