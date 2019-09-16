<template>
    <!-- S 极简分页 -->
    <ul v-if="simple"
        class="by-pagination by-pagination--simple"
        :class="{
      [`by-pagination--${size}`]: size
    }">
        <li :title="$t('by.pagination.prevText')"
            class="by-pagination__prev"
            :class="{
        'by-pagination--disabled': this.currentPage === 1
      }"
            @click="handlePrev">
            <i class="icon icon-chevron-left"></i>
        </li>
        <div class="by-pagination__simple-paging">
            <input type="text"
                   class="by-input__original"
                   :value="currentPage"
                   @keydown="handleKeydown"
                   @keyup="handleKeyup"
                   @change="handleKeyup">
            <span>/</span>
            <span class="by-pagination__paging-total">{{ totalPage }}</span>
        </div>
        <li :title="$t('by.pagination.nextText')"
            class="by-pagination__next"
            :class="{
        'by-pagination--disabled': this.currentPage === this.totalPage
      }"
            @click="handleNext">
            <i class="icon icon-chevron-right"></i>
        </li>
    </ul>
    <!-- E 极简分页 -->
    <!-- S 基础分页 -->
    <ul v-else
        class="by-pagination"
        :class="{
      [`by-pagination--${size}`]: size
    }">
        <span class="by-pagination__total"
              v-show="showTotal">
            <slot name="total">{{ `${$t('by.pagination.total')} ${total} ${$t('by.pagination.items')}` }}</slot>
        </span>
        <li :title="$t('by.pagination.prevText')"
            class="by-pagination__prev"
            :class="{
        'by-pagination--disabled': this.currentPage === 1
      }"
            @click="handlePrev">
            <i class="icon icon-chevron-left"></i>
        </li>
        <template v-if="totalPage < 9">
            <li v-for="(num,index) in pageRange"
                :key="index"
                class="by-pagination__item"
                :class="{
          'by-pagination__item--active': currentPage === num
        }"
                @click="changePage(num)">{{ num }}</li>
        </template>
        <template v-else>
            <li class="by-pagination__item"
                :class="{ 'by-pagination__item--active': currentPage === 1 }"
                @click="changePage(1)">1</li>
            <li class="by-pagination__item by-pagination__item--jump-prev"
                :title="$t('by.pagination.prev5Text')"
                v-if="currentPage > 4"
                @click="handleJumpPrev"><i class="icon icon-chevrons-left"></i></li>
            <li class="by-pagination__item"
                v-if="currentPage > 3"
                @click="changePage(currentPage - 2)">{{ currentPage - 2 }}</li>
            <li class="by-pagination__item"
                v-if="currentPage > 2"
                @click="changePage(currentPage - 1)">{{ currentPage - 1 }}</li>
            <li class="by-pagination__item by-pagination__item--active"
                v-if="currentPage !== 1 && currentPage !== totalPage">{{ currentPage }}</li>
            <li class="by-pagination__item"
                v-if="currentPage < totalPage - 1"
                @click="changePage(currentPage + 1)">{{ currentPage + 1 }}</li>
            <li class="by-pagination__item"
                v-if="currentPage < totalPage - 2"
                @click="changePage(currentPage + 2)">{{ currentPage + 2 }}</li>
            <li class="by-pagination__item by-pagination__item--jump-next"
                :title="$t('by.pagination.next5Text')"
                v-if="currentPage < totalPage - 3"
                @click="handleJumpNext"><i class="icon icon-chevrons-right"></i></li>
            <li class="by-pagination__item"
                v-if="totalPage > 1"
                :class="{ 'by-pagination__item--active' : currentPage === totalPage }"
                @click="changePage(totalPage)">{{ totalPage }}</li>
        </template>
        <li :title="$t('by.pagination.nextText')"
            class="by-pagination__next"
            :class="{
        'by-pagination--disabled': this.currentPage === this.totalPage
      }"
            @click="handleNext">
            <i class="icon icon-chevron-right"></i>
        </li>
        <div v-if="showSizer && pageSizeOpts"
             class="by-pagination__sizer">
            <by-select v-model="currentPageSize"
                       :size="size"
                       @on-change="changeSize">
                <by-option v-for="item in pageSizeOpts"
                           :key="item"
                           :value="item">{{ `${item} ${$t('by.pagination.pageSize')}` }}</by-option>
            </by-select>
        </div>
        <div class="by-pagination__quickjump"
             v-if="showQuickjump">
            <span>{{ $t('by.pagination.goto') }}</span>
            <input type="text"
                   class="by-input__original"
                   v-model="jumpPageNum"
                   @keydown="handleKeydown"
                   @keyup.enter="changePage()">
            <span>{{ $t('by.pagination.pageText') }}</span>
        </div>
    </ul>
    <!-- E 基础分页 -->
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    @Component
    export default class Pagination extends Vue {
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
