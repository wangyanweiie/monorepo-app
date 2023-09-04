import type { App } from 'vue';
import store from 'store2';
import { LOCAL_USER_INFO_KEY } from '@/constant/global';

export default {
    install(app: App) {
        app.directive('permission', {
            mounted(el, binding) {
                const permissions: string[] = store.local.get(LOCAL_USER_INFO_KEY)?.pcPerms || [];
                if (!binding.value.some((permission: string) => permissions.includes(permission))) {
                    el.style.display = 'none';
                }
            },
            // TODO: 性能不是很好，最好应该是侦听指令值的变化修改样式
            updated(el, binding) {
                const permissions: string[] = store.local.get(LOCAL_USER_INFO_KEY)?.pcPerms || [];
                if (!binding.value.some((permission: string) => permissions.includes(permission))) {
                    el.style.display = 'none';
                } else {
                    el.style.display = '';
                }
            },
        });
    },
};
