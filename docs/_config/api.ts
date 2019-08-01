import { api, MapleRequestApis } from 'maple-request';

const apis: MapleRequestApis = {
    login: api.post('/users/login'), //登录

    /************************ 公共管理 ************************/
    'company-list': api.post('company/getList'), //企业列表
    'project-list': api.post('project/getList'), //项目列表
}

export default apis;