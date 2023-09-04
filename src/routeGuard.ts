import type { Router } from 'vue-router';
import { useUserStore } from '@/store/user-info';

export function setupRouterGuard(router: Router) {
    router.beforeEach(async (to, _, next) => {
        if (to.path === '/login') {
            next();
            return;
        }

        const { getLastUpdateTime, getToken } = useUserStore();

        /**
         * 没有 token 回到登录页
         */
        if (!getToken) {
            next({ path: `/login?redirect=${router.currentRoute.value.path}` });
        }

        if (getLastUpdateTime === 0) {
            // 根据 token 调用接口获取 userInfo
            // await afterLoginAction();
        }

        next();
        return;
    });
}
