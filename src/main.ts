import { createApp } from 'vue';
import mitt from 'mitt';
import { createPinia } from 'pinia';
import router from '@/router/index';
import { usePermission } from '@/store/permission';
import App from './App.vue';
import permission from './directive/permission';
import { setupRouterGuard } from './routeGuard';
import { registerComponents } from './plugins/registerComponents';

import 'element-plus/dist/index.css';

(() => {
    const app = createApp(App);

    // 统一注册组件
    registerComponents(app);

    // 注册状态管理器
    app.use(createPinia());

    // 注册路由
    app.use(router);

    // 注册权限指令
    app.use(permission);

    // 设置路由权限
    usePermission();

    // 注册 ui
    // app.use(ElementPlus);

    // 路由守卫
    setupRouterGuard(router);

    // 事件通讯
    app.config.globalProperties.$bus = mitt();

    // 挂载
    app.mount('#app');
})();
