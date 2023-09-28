import { useAxiosInterceptors, clearStorage } from '@custom/utils';
import router from '@/router/index';

const { get, post } = useAxiosInterceptors({
    url: import.meta.env.VITE_API_URL as string,

    storageTokenKey: 'token',

    // 退出登录
    expireCallback: () => {
        clearStorage();
        router.push(`/login?redirect=${router.currentRoute.value.path}`);
    },
});

export { get, post };
