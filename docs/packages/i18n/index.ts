import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '@/locale';
Vue.use(VueI18n)
export const i18n = new VueI18n({
    locale: 'cn', // set locale
    fallbackLocale: 'cn', // 默认语言设置，当其他语言没有的情况下，使用en作为默认语言
    messages // set locale messages
})
