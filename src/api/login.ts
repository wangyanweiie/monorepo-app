import { get, post } from './index';

export default {
    /**
     * 登录
     */
    login(data: Record<string, string>): Promise<any> {
        return post('/api/v1/user/manage/login', data);
    },

    /**
     * 退出登录
     */
    logout(): Promise<boolean> {
        return get('/api/v1/user/manage/logout');
    },

    /**
     * 修改密码
     */
    updatePassword(data: Record<string, string>): Promise<any> {
        return post('/api/v1/user/manage/changePassword', data);
    },
};
