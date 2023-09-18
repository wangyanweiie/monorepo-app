import { defineStore } from 'pinia';
import store from 'store2';
import { saveUserToken, getUserToken, saveUserInfo, getUserInfo } from '@/utils/storage';

/**
 * 权限缓存状态
 */
export const useUserStore = defineStore('userInfo', () => {
    /**
     * token
     */
    const token = ref<string | undefined | null>(null);
    const getToken = computed(() => token.value || getUserToken());

    function setToken(info?: string | null) {
        token.value = info;
        saveUserToken(info);
    }

    /**
     * user-info
     */
    const userInfo = ref<any>(null);
    const getInfo = computed(() => userInfo.value || getUserInfo());

    function setUserInfo(info?: any) {
        userInfo.value = info;
        saveUserInfo(info);
        setLastUpdateTime(info ? new Date().getTime() : 0);
    }

    /**
     * last-update-time
     */
    const lastUpdateTime = ref<number>(0);
    const getLastUpdateTime = computed(() => lastUpdateTime.value);

    function setLastUpdateTime(info: number) {
        lastUpdateTime.value = info;
    }

    /**
     * 清空 token 与 userInfo
     */
    function clearCache() {
        setToken(null);
        setUserInfo(null);
        store.local.clear();
    }

    return {
        getToken,
        getInfo,
        getLastUpdateTime,
        setToken,
        setUserInfo,
        setLastUpdateTime,
        clearCache,
    };
});
