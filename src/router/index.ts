import { createWebHistory, createRouter, type RouteRecordRaw, type RouteLocationNormalized } from 'vue-router';
import appLayout from '@/layout/index.vue';
import { LOCAL_USER_INFO_KEY } from '@/constant/global';
import store from 'store2';

export const menuRoutes: RouteRecordRaw[] = [
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: '首页',
            icon: 'Folder',
        },
    },
];

/**
 * 路由数组
 */
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: '/',
        component: appLayout,
        redirect: '/home',
        meta: {
            icon: 'HomeFilled',
            title: 'index',
        },
        children: menuRoutes,
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/not-found/404.vue'),
        meta: {
            title: '404',
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

/**
 * 路由守卫
 */
interface BeforeEachFunc {
    (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: (to?: string | boolean | { path?: string; query?: { redirect: string } }) => void,
    ): void;
}

const routerBeforeEachFunc: BeforeEachFunc = (to, from, next) => {
    const userInfo = store.local.get(LOCAL_USER_INFO_KEY);
    if (to.path !== '/login' && !userInfo) {
        next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
        next();
    }
};

router.beforeEach(routerBeforeEachFunc);

export default router;
export { routes };
