// 分环境打包配置
const remain = JSON.parse(process.env.npm_config_argv || '').remain;
const host = remain.length ? remain[0].replace(/^--/, '') : 'default';
const domain = process.env.DOMAIN;
const customize = process.env.CUSTOMIZE || false;

export default {
    host,
    domain,
    customize
}
