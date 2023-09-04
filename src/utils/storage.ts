import store from 'store2';
import { LOCAL_USER_INFO_KEY, LOCAL_TOKEN_KEY } from '@/constant/global';

/**
 * 保存用户信息
 */
export function saveUserInfo(userInfo?: any): void {
    store.local.set(LOCAL_USER_INFO_KEY, userInfo);
}

/**
 * 获取用户信息
 */
export function getUserInfo(): any {
    return store.local.get(LOCAL_USER_INFO_KEY) as any;
}

/**
 * 保存用户 token
 */
export function saveUserToken(info: string | null | undefined): void {
    store.local.set(LOCAL_TOKEN_KEY, info);
}

/**
 * 获取用户 token
 */
export function getUserToken(): string | null {
    return store.local.get(LOCAL_TOKEN_KEY) as string | null;
}
