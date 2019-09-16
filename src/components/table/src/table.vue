<template>
    <div class="by-table"
         :class="{
      'by-table--fixHeight': this.height,
      'by-table--stripe': this.stripe,
      [`by-table--${this.size}`]: this.size,
      [`by-table--border`]: this.border
    }"
         :style="tableStyles">

        <!-- S Content -->
        <div class="by-table__content"
             :style="contentStyle">
            <!-- S Header -->
            <div class="by-table__header"
                 v-if="height">
                <table>
                    <colgroup>
                        <col v-for="(column, index) in columnsData"
                             :width="setCellWidth(column, index)">
                    </colgroup>
                    <thead class="by-table__thead"
                           ref="header">
                        <tr>
                            <!-- S Checkbox -->
                            <th v-if="optional"
                                class="by-table__cell by-table__column-selection">
                                <by-checkbox v-model="isSelectAll"
                                             @click.native="handleSelectAll"></by-checkbox>
                            </th>
                            <!-- E Checkbox -->
                            <!-- S Column th -->
                            <th v-for="(column, index) in columnsData"
                                class="by-table__cell by-table__column"
                                :class="column.className"
                                :style="{
                  cursor: column.sortType ? 'pointer' : 'text'
                }"
                                @click="column.sortType && handleSort(index)">
                                {{ column.title }}
                                <template v-if="column.sortType">
                                    <div class="by-table__column-sorter"
                                         :class="{
                      'sort-asc': column._sortType === 'asc',
                      'sort-desc': column._sortType === 'desc'
                    }">
                                        <span class="by-table__column-sorter-up"
                                              @click.stop="handleSort(index, 'asc')"><i class="icon icon-chevron-up"></i></span>
                                        <span class="by-table__column-sorter-down"
                                              @click.stop="handleSort(index, 'desc')"><i class="icon icon-chevron-down"></i></span>
                                    </div>
                                </template>
                            </th>
                            <!-- E Column th -->
                        </tr>
                    </thead>
                </table>
            </div>
            <!-- E Header -->

            <!-- S Body -->
            <div class="by-table__body"
                 :style="bodyStyle">
                <table>
                    <colgroup>
                        <col v-for="(column, index) in columnsData"
                             :width="setCellWidth(column, index)">
                    </colgroup>
                    <thead class="by-table__thead"
                           v-if="!height"
                           ref="header">
                        <tr>
                            <!-- S Checkbox -->
                            <th v-if="optional"
                                class="by-table__cell by-table__column-selection">
                                <by-checkbox v-model="isSelectAll"
                                             @click.native.prevent="handleSelectAll"></by-checkbox>
                            </th>
                            <!-- E Checkbox -->
                            <!-- S Column th -->
                            <th v-for="(column, index) in columnsData"
                                :key="index"
                                class="by-table__cell by-table__column"
                                :class="column.className"
                                :style="{
                  cursor: column.sortType ? 'pointer' : 'text'
                }"
                                @click="column.sortType && handleSort(index)">
                                {{ column.title }}
                                <template v-if="column.sortType">
                                    <div class="by-table__column-sorter"
                                         :class="{
                      'sort-asc': column._sortType === 'asc',
                      'sort-desc': column._sortType === 'desc'
                    }">
                                        <span class="by-table__column-sorter-up"
                                              @click.stop="handleSort(index, 'asc')"><i class="icon icon-chevron-up"></i></span>
                                        <span class="by-table__column-sorter-down"
                                              @click.stop="handleSort(index, 'desc')"><i class="icon icon-chevron-down"></i></span>
                                    </div>
                                </template>
                            </th>
                            <!-- E Column th -->
                        </tr>
                    </thead>

                    <tbody class="by-table__tbody"
                           v-if="sortData.length"
                           ref="body">
                        <template v-for="(item, index) in sortData">
                            <tr>
                                <td v-if="optional"
                                    class="by-table__cell by-table__column-selection">
                                    <by-checkbox v-model="objData[index].isChecked"
                                                 @on-change="changeRowSelection"></by-checkbox>
                                </td>
                                <td v-for="(column, cindex) in columns"
                                    :key="cindex"
                                    class="by-table__cell">
                                    <template v-if="column.render">
                                        <Cell :item="item"
                                              :column="column"
                                              :index="index"
                                              :render="column.render"></Cell>
                                    </template>
                                    <template v-else>
                                        {{ item[column.key] }}
                                    </template>
                                </td>
                            </tr>
                        </template>
                    </tbody>

                    <tbody class="by-table__tbody"
                           v-else>
                        <tr>
                            <td class="by-table__cell by-table__cell--nodata"
                                :colspan="optional ? columns.length + 1 : columns.length">
                                <slot name="emptyText">{{ t('at.table.emptyText') }}</slot>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- E Body -->
        </div>
        <!-- E Content -->

        <!-- S Pagination -->
        <div v-if="pagination && total"
             class="by-table__footer"
             ref="footer">
            <by-pagination :current="currentPage"
                           :size="size"
                           :total="total"
                           :page-size="pageSize"
                           :show-total="showPageTotal"
                           :show-sizer="showPageSizer"
                           :show-quickjump="showPageQuickjump"
                           @page-change="pageChange"
                           @pagesize-change="pageSizeChange"></by-pagination>
        </div>
        <!-- E Pagination -->
    </div>
</template>


<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator"
    import Cell from './render'
    import Checkbox from 'By-UI/components/checkbox'
    import Pagination from 'By-UI/components/pagination'

    @Component({
        components: {
            Checkbox,
            Pagination
        }
    })
    export default class Table extends Vue {
        @Prop({
            default: 1
        })
        current?: number;

        @Prop({
            default: 0,
            required: true
        })
        total!: number;

        @Prop({
            default: 10
        })
        pageSize?: number;

        @Prop()
        size?: string;

        @Prop({
            default: false
        })
        simple?: boolean;

        @Prop({
            default: false
        })
        showTotal?: boolean;

        @Prop({
            default: false
        })
        showQuickjump?: boolean;

        @Prop({
            default: false
        })
        showSizer?: boolean;


        @Prop({
            default: function () {
                return [10, 20, 30, 40]
            }
        })
        pageSizeOpts?: Array<number>;

        currentPage = this.current || 1;
        currentPageSize = this.pageSize || 10;
        jumpPageNum = this.current;

        @Watch("current")
        watchCurrent(val: number) {
            this.currentPage = val
        }

        @Watch("pageSize")
        watchPageSize(val: number) {
            this.currentPageSize = val
        }

        get totalPage() {
            const num = Math.ceil(this.total / this.currentPageSize)
            return (num === 0) ? 1 : num
        }

        get visiblePage() {
            return this.totalPage >= 5 ? 5 : this.totalPage
        }

        get pageRange() {
            const range = []
            let start = 1

            if (this.currentPage + (this.visiblePage / 2) > this.totalPage) {
                start = this.totalPage - this.visiblePage + 1
                start = start > 0 ? start : 1
            } else if (this.currentPage - (this.visiblePage / 2) > 0) {
                start = Math.ceil(this.currentPage - (this.visiblePage / 2))
            }

            for (let i = 0; i < this.visiblePage && i < this.totalPage; i++) {
                range.push(start + i)
            }

            return range
        }

        changePage(page?: number) {
            let num = (page || this.jumpPageNum || 1) | 0
            num = num > this.totalPage ? this.totalPage : num
            num = num < 1 ? 1 : num

            if (this.currentPage !== num) {
                this.jumpPageNum = num
                this.currentPage = num
                this.$emit('page-change', num)
            }
        }

        handlePrev() {
            const page = this.currentPage
            if (page <= 1) return false
            this.changePage(page - 1)
        }

        handleNext() {
            const page = this.currentPage
            if (page >= this.totalPage) return false
            this.changePage(page + 1)
        }

        handleJumpPrev() {
            const page = this.currentPage - 5
            page ? this.changePage(page) : this.changePage(1)
        }

        handleJumpNext() {
            const page = this.currentPage + 5
            page > this.totalPage ? this.changePage(this.totalPage) : this.changePage(page)
        }

        handleKeydown(evt: any) {
            const key = evt.keyCode

            // 按键 0~9，空格，左右方向键
            if (!((key >= 48 && key <= 57) || key === 8 || key === 37 || key === 39)) {
                evt.preventDefault()
            }
        }

        handleKeyup(evt: any) {
            const key = evt.keyCode
            const numVal = evt.target.value | 0

            if (key === 40) { // Up Arrow
                this.handlePrev()
            } else if (key === 38) { // Down Arrow
                this.handleNext()
            } else if (key === 13) { // Return
                let page = 1

                page = (numVal > this.totalPage) ? this.totalPage : numVal
                page = (numVal <= 0) ? 1 : numVal
                evt.target.value = page
                this.changePage(page)
            }
        }

        changeSize(size: number) {
            this.currentPageSize = size
            this.changePage(1)
            this.$emit('pagesize-change', size)
        }
    }
</script>
