import type { App, Component } from 'vue';
import {
    XLayout,
    XDialogForm,
    XSearchForm,
    XLogo,
    XTable,
    ParentView,
    ParentMenuView,
    XUser,
    XForm,
} from '@custom/components';

/**
 * 组件列表
 */
const componentsList: { name: string; component: Component }[] = [
    {
        name: 'XLayout',
        component: XLayout,
    },
    {
        name: 'XLogo',
        component: XLogo,
    },
    {
        name: 'XTable',
        component: XTable,
    },
    {
        name: 'ParentView',
        component: ParentView,
    },
    {
        name: 'ParentMenuView',
        component: ParentMenuView,
    },
    {
        name: 'XUser',
        component: XUser,
    },
    {
        name: 'XForm',
        component: XForm,
    },
    {
        name: 'XDialogForm',
        component: XDialogForm,
    },
    {
        name: 'XSearchForm',
        component: XSearchForm,
    },
];

/**
 * 收集组件后统一注册组件
 * @param app 实例
 */
export function registerComponents(app: App) {
    componentsList.forEach((item: { name: string; component: Component }) => {
        app.component(item.name, item.component);
    });
}
