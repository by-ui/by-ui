import Vue from 'vue';
import MapleRequest, { MapleRequestOptions } from 'maple-request';

import apis from '@docs/_config/api';

import { Message, Loading } from 'element-ui';

let loadingInstance: any = null;

const options: MapleRequestOptions = {
    create: {
        timeout: 20000,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            Platform: 'kb-mamager',
        },
        baseURL: `http://sign.ci.dev.lanxinka.com/api/admin/v1`,
    },
    apis,
    interceptors: {
        request: config => {
            config.headers.Authorization = window.localStorage.getItem('token');
            return config;
        },
        response: response => {
            const responseData = response.data;
            const { code, data, msg } = responseData;

            if (!code) {
                return responseData;
            } else {
                Message.error(msg);

                const codeString = code.toString();
                if (['262109', '200001', '110000'].indexOf(codeString) >= 0) {
                    console.log('token 过期');
                    // store.dispatch('logout');
                }
                return Promise.reject(responseData);
            }
        },
        responseError: error => {
            Message.error('网络错误，请稍后重试');
            return Promise.reject(error);
        },
    },
    loading: {
        start() {
            loadingInstance = Loading.service({
                fullscreen: true,
            });
        },
        close() {
            setTimeout(() => {
                if (loadingInstance) {
                    loadingInstance.close();
                    loadingInstance = null;
                }
            }, 0);
        },
    },
    pre: {
        request(this: Vue, data) {
            if (this.$route && this.$route.query && this.$route.query.msg_id && data) {
                data.msg_id = this.$route.query.msg_id;
            }
        },
        response(response) {},
        responseError(this: Vue, error) {},
    },
};

Vue.use(MapleRequest, options);
