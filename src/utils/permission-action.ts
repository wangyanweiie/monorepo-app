import { usePermissionStore } from '@/store/permission';
import type { XTableActionButton } from '@custom/components';

export function getPermissionAction(actionList: any[], permission?: any): XTableActionButton[] {
    const { usable } = usePermissionStore();

    if (usable && permission?.length) {
        return actionList.filter(btn => permission?.includes(btn.permission) || !btn.permission);
    } else {
        return actionList;
    }
}
