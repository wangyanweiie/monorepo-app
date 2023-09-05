import type { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import { generateActiveRoutes, generateCacheList, generateShowMenus } from '@custom/components';
import store from 'store2';
import router, { menuRoutes } from '@/router/index';
import appLayout from '@/layout/index.vue';
import { LOCAL_USER_INFO_KEY } from '@/constant/global';

/**
 * 权限缓存状态
 */
export const usePermissionStore = defineStore('permission', () => {
    // ================= 权限 =================
    /**
     * 是否开启权限设置
     */
    const usable = ref<boolean>(false);

    /**
     * 开启权限
     */
    function enablePermission(): void {
        usable.value = true;
    }

    /**
     * 关闭权限
     */
    function disablePermission(): void {
        usable.value = false;
    }

    /**
     * 权限数组
     */
    const permissions = ref<string[]>([]);

    /**
     * 更新权限数组
     */
    function setPermission(value: string[]): void {
        permissions.value = ['首页', ...(value ?? [])];
    }

    // ================= 路由 =================
    /**
     * 路由数组
     */
    const routes = ref<RouteRecordRaw[]>([]);

    /**
     * 更新路由数组
     */
    function setRoutes(value: RouteRecordRaw[]): void {
        routes.value = value;
    }

    /**
     * 根据权限数据生成可用路由
     */
    const activeRoutes = computed<RouteRecordRaw[]>(() => {
        if (usable.value) {
            return generateActiveRoutes(routes.value, permissions.value);
        }

        return generateActiveRoutes(routes.value);
    });

    // ================= 缓存 =================
    /**
     * 是否使用缓存
     */
    const useCache = ref<boolean>(true);

    /**
     * 使用缓存
     */
    function enableCache(): void {
        useCache.value = true;
    }

    /**
     * 禁用缓存
     */
    function disableCache(): void {
        useCache.value = false;
    }

    /**
     * 根据权限生成缓存路由
     */
    const cacheList = computed<string[]>(() => {
        if (!useCache.value) {
            return [];
        }

        if (usable.value) {
            return generateCacheList(routes.value, permissions.value);
        }

        return generateCacheList(routes.value);
    });

    // ================= menu =================
    /**
     * 根据权限生成菜单路由
     */
    const showMenus = computed<RouteRecordRaw[]>(() => {
        if (usable.value) {
            return generateShowMenus(routes.value, permissions.value);
        }

        return generateShowMenus(routes.value);
    });

    /**
     * 获取带有权限的 menus（页面 menu）==> 搭配 parentMenuView 使用
     */
    function getPermissionMenus(routes: RouteRecordRaw[]) {
        if (usable.value) {
            return routes.filter(route => permissions.value.includes(route.meta?.title as string));
        }

        return routes;
    }

    /**
     * FIXME: 动态加载路由？
     */
    function setActiveRouteList() {
        router.addRoute({
            path: '/',
            name: '/',
            component: markRaw(appLayout),
            redirect: activeRoutes.value[0].path,
            meta: {
                title: '/',
            },
            children: activeRoutes.value,
        });
    }

    return {
        usable,
        enablePermission,
        disablePermission,
        permissions,
        setPermission,
        routes,
        setRoutes,
        activeRoutes,
        useCache,
        enableCache,
        disableCache,
        cacheList,
        showMenus,
        getPermissionMenus,
        setActiveRouteList,
    };
});

/**
 * 设置路由与权限
 */
export function usePermission() {
    const permissionStore = usePermissionStore();
    const permissions = store.local.get(LOCAL_USER_INFO_KEY)?.pcPerms;

    permissionStore.setPermission(permissions);
    permissionStore.setRoutes(menuRoutes);
    permissionStore.setActiveRouteList();
}
