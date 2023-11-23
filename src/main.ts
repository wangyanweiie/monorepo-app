import { createApp } from 'vue';
import mitt from 'mitt';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router/index';
import directivePlugin from '@/plugins/directive';
import registerComponentsPlugin from '@/plugins/registerComponents';
import { setPermissionRoute } from '@/store/permission';
import { setupRouterGuard } from '@/routeGuard';

import 'element-plus/dist/index.css';

(() => {
    const app = createApp(App);

    // 全局引入 ==> 按需引入
    // app.use(ElementPlus);

    // 注册状态管理器
    app.use(createPinia());

    // 注册路由
    app.use(router);

    // 注册指令
    app.use(directivePlugin);

    // 注册组件
    registerComponentsPlugin(app);

    // 赋值路由数组并动态加载路由
    setPermissionRoute();

    // 路由守卫
    setupRouterGuard(router);

    // 事件通讯
    app.config.globalProperties.$bus = mitt();

    // 挂载
    app.mount('#app');
})();
