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
} from '@x-mart/pro-components';

// GlobalComponents for Volar
declare module 'vue' {
    export interface GlobalComponents {
        XLayout: typeof XLayout;
        XDialogForm: typeof XDialogForm;
        XSearchForm: typeof XSearchForm;
        XLogo: typeof XLogo;
        XTable: typeof XTable;
        ParentView: typeof ParentView;
        ParentMenuView: typeof ParentMenuView;
        XUser: typeof XUser;
        XForm: typeof XForm;
    }

    interface ComponentCustomProperties {
        $message: typeof import('element-plus')['ElMessage'];
        $notify: typeof import('element-plus')['ElNotification'];
        $msgbox: typeof import('element-plus')['ElMessageBox'];
        $messageBox: typeof import('element-plus')['ElMessageBox'];
        $alert: typeof import('element-plus')['ElMessageBox']['alert'];
        $confirm: typeof import('element-plus')['ElMessageBox']['confirm'];
        $prompt: typeof import('element-plus')['ElMessageBox']['prompt'];
        $loading: typeof import('element-plus')['ElLoadingService'];
    }
}

export {};
