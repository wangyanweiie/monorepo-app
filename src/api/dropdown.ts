import { getSelectListByParams } from './common';

export default {
    /**
     * 公司名称
     */
    getCompanyName: (): Promise<any> =>
        getSelectListByParams({
            type: 48,
            field: 'name',
        }),
};
