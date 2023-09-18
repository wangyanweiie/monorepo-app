import {
    XLayout,
    XUser,
    XLogo,
    ParentView,
    ParentMenuView,
    XTable,
    XTableV2,
    XEditTable,
    XEditTableItem,
    XForm,
    XDialogForm,
    XSearchForm,
} from '@custom/components';

// GlobalComponents for Volar
declare module 'vue' {
    export interface GlobalComponents {
        XLayout: typeof XLayout;
        XUser: typeof XUser;
        XLogo: typeof XLogo;
        ParentView: typeof ParentView;
        ParentMenuView: typeof ParentMenuView;
        XTable: typeof XTable;
        XTableV2: typeof XTableV2;
        XEditTable: typeof XEditTable;
        XEditTableItem: typeof XEditTableItem;
        XForm: typeof XForm;
        XDialogForm: typeof XDialogForm;
        XSearchForm: typeof XSearchForm;
    }

    interface ComponentCustomProperties {
        $message: (typeof import('element-plus'))['ElMessage'];
        $notify: (typeof import('element-plus'))['ElNotification'];
        $messageBox: (typeof import('element-plus'))['ElMessageBox'];
        $alert: (typeof import('element-plus'))['ElMessageBox']['alert'];
        $confirm: (typeof import('element-plus'))['ElMessageBox']['confirm'];
        $prompt: (typeof import('element-plus'))['ElMessageBox']['prompt'];
        $loading: (typeof import('element-plus'))['ElLoadingService'];
    }
}

export {};
