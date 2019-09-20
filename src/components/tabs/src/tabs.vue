<template>
    <div class="by-tabs"
         :class="{
      'by-tabs--small': size === 'small',
      'by-tabs--card': type === 'card',
      'by-tabs--scroll': scrollable
    }">
        <div class="by-tabs__header">
            <div class="by-tabs__extra"
                 v-if="$slots.extra">
                <slot name="extra"></slot>
            </div>
            <div class="by-tabs__nav">
                <!-- S prev btn -->
                <span class="by-tabs__prev"
                      v-if="scrollable"
                      :class="{
            'by-tabs__prev--disabled': !prevable
          }"
                      @click="scrollPrev">
                    <i class="icon icon-chevron-left"></i>
                </span>
                <!-- E prev btn -->
                <!-- S next btn -->
                <span class="by-tabs__next"
                      v-if="scrollable"
                      :class="{
            'by-tabs__next--disabled': !nextable
          }"
                      @click="scrollNext">
                    <i class="icon icon-chevron-right"></i>
                </span>
                <!-- E next btn -->
                <!-- S Tab nav -->
                <div class="by-tabs__nav-wrap">
                    <div class="by-tabs__nav-scroll"
                         ref="navScroll">
                        <div class="by-tabs-nav"
                             ref="nav"
                             :style="navStyle">
                            <div class="by-tabs-nav__item"
                                 :class="{
                  'by-tabs-nav__item--active': index === activeIndex,
                  'by-tabs-nav__item--disabled': item.disabled,
                  'by-tabs-nav__item--closable': item.closable
                }"
                                 v-for="(item, index) in navList"
                                 :key="index"
                                 @click="setNavByIndex(index)">
                                <!-- S icon -->
                                <i v-if="item.icon"
                                   class="icon by-tabs-nav__icon"
                                   :class="{
                    [item.icon]: item.icon
                  }">
                                </i>{{ item.label }}
                                <!-- E icon -->
                                <!-- S close btn -->
                                <span class="by-tabs-nav__close"
                                      v-if="item.closable"
                                      @click.stop="removeHandle(index)">
                                    <i class="icon icon-x"></i>
                                </span>
                                <!-- E close btn -->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- E Tab nav -->
            </div>
        </div>
        <div class="by-tabs__body"
             :style="tabsBodyTranslateStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    @Component
    export default class ByTabs extends Vue {
        @Prop()
        value?: string;

        @Prop({
            default: 'line',
            validator: val => ['line', 'card'].indexOf(val) > -1
        })
        type?: string;

        @Prop({
            default: 'default',
            validator: val => ['default', 'small'].indexOf(val) > -1
        })
        size?: string;

        @Prop({
            type: Boolean,
            default: false
        })
        closable?: boolean;

        @Prop({
            type: Boolean,
            default: true
        })
        animated?: boolean;

        navList = [];
        activeKey = '';
        navOffset = 0;
        navStyle = {
            transform: ''
        };
        nextable = false;
        prevable = false;

        get scrollable() {
            return this.prevable || this.nextable
        }

        get activeIndex() {
            const navList = this.navList
            for (let i = 0, len = navList.length; i < len; i++) {
                const item = navList[i]
                if (item.name === this.activeKey) {
                    return i
                }
            }
            return 0
        }

        get tabsBodyTranslateStyle() {
            const activeIndex = this.activeIndex
            const translateValue = this.animated ? `${-activeIndex * 100}%` : 0
            return {
                transform: `translate3d(${translateValue}, 0, 0)`
            }
        }

        @Watch("activeKey")
        watchActiveKey(val: any) {
            this.$emit('on-change', {
                index: this.activeIndex,
                name: this.activeKey
            })
            this.$nextTick(() => {
                this.scrollToActiveTab()
            })
        }

        scrollPrev() {
            if (!this.prevable) return

            const containerWidth = this.$refs.navScroll.offsetWidth
            const currentOffset = this.getCurrentScrollOffset()

            if (currentOffset === 0) return

            const newOffset = currentOffset > containerWidth ? currentOffset - containerWidth : 0

            this.setOffset(newOffset)
        }

        scrollNext() {
            if (!this.nextable) return

            const containerWidth = this.$refs.navScroll.offsetWidth
            const currentOffset = this.getCurrentScrollOffset()
            const navWidth = this.$refs.nav.offsetWidth

            if (navWidth - currentOffset <= containerWidth) return

            const newOffset = (navWidth - currentOffset > containerWidth * 2) ? currentOffset + containerWidth : navWidth - containerWidth

            this.setOffset(newOffset)
        }

        scrollToActiveTab() {
            if (!this.scrollable) return

            const activeTab = this.$el.querySelector('.by-tabs-nav__item--active')
            const navScroll = this.$refs.navScroll

            const activeTabBounds = activeTab.getBoundingClientRect()
            const navScrollBounds = navScroll.getBoundingClientRect()
            const currentOffset = this.getCurrentScrollOffset()
            let newOffset = currentOffset

            if (activeTabBounds.left < navScrollBounds.left) {
                newOffset = currentOffset - (navScrollBounds.left - activeTabBounds.left)
            }

            if (activeTabBounds.right > navScrollBounds.right) {
                newOffset = currentOffset + (activeTabBounds.right - navScrollBounds.right)
            }

            this.setOffset(newOffset)
        }

        getCurrentScrollOffset() {
            return this.navOffset
        }

        setOffset(value) {
            this.navOffset = Math.abs(value)
            this.navStyle.transform = `translate3d(-${this.navOffset}px, 0, 0)`
        }

        getTabs() {
            return this.$children.filter(item =>
                item.$options.name === 'ByTabPane'
            )
        }

        removeHandle(index) {
            const tabs = this.getTabs()
            const tab = tabs[index]
            let activeKey = ''

            if (tab.disabled) return

            this.navList.splice(index, 1)

            this.$emit('on-tab-remove', {
                index,
                name: tab.currentName
            })

            this.$nextTick(() => {
                this.updateNav()
            })

            if (tab.currentName === this.activeKey) {
                const newTabs = this.getTabs()

                if (newTabs.length) {
                    const nextAbleTabs = tabs.filter((item, itemIndex) =>
                        !item.disabled && itemIndex > index
                    )

                    const prevAbleTabs = tabs.filter((item, itemIndex) =>
                        !item.disabled && itemIndex < index
                    )

                    if (nextAbleTabs.length) {
                        activeKey = nextAbleTabs[0].currentName
                    } else if (prevAbleTabs.length) {
                        activeKey = prevAbleTabs[prevAbleTabs.length - 1].currentName
                    } else {
                        activeKey = newTabs[0].currentName
                    }
                }

                this.activeKey = activeKey
            }
        }

        updateNav() {
            this.navList = []

            this.getTabs().forEach((item, index) => {
                this.navList.push({
                    label: item.label,
                    name: item.currentName || index,
                    disabled: item.disabled,
                    icon: item.icon,
                    closable: item.isClosable
                })

                if (!item.currentName) {
                    item.currentName = index
                }

                if (index === 0 && !this.activeKey) {
                    this.activeKey = item.currentName || index
                }

                if (!this.animated) {
                    this.switchTabsWithNoAnimated()
                }
            })
        }

        setNavByIndex(index:any) {
            const currentName = this.navList[index]

            if (!currentName.disabled) {
                this.activeKey = currentName.name
                console.log(this.activeKey)

                if (!this.animated) {
                    this.switchTabsWithNoAnimated()
                }
            }
        }

        switchTabsWithNoAnimated() {
            const tabs = this.getTabs()

            tabs.forEach(item => {
                item.show = (item.currentName === this.activeKey)
            })
        }

        updateHandle() {
            const navWidth = this.$refs.nav.offsetWidth
            const containerWidth = this.$refs.navScroll.offsetWidth
            const currentOffset = this.getCurrentScrollOffset()

            if (containerWidth < navWidth) {
                this.prevable = currentOffset !== 0
                this.nextable = currentOffset + containerWidth < navWidth
                if (navWidth - currentOffset < containerWidth) {
                    this.setOffset(navWidth - containerWidth)
                }
            } else {
                this.nextable = false
                this.prevable = false
                if (currentOffset > 0) {
                    this.setOffset(0)
                }
            }
        }

        mounted() {
            this.activeKey = this.value
            window.addEventListener('resize', this.updateHandle, false)

            this.updateNav()
            setTimeout(() => {
                this.scrollToActiveTab()
            }, 0)
        }

        updated() {
            this.updateHandle()
        }
    }
</script>
