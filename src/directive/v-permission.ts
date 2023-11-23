import { getPermission } from '@/utils/storage';

/**
 * 是否拥有权限
 * @param permission 元素绑定的权限标识
 */
function hasPermission(permission: string) {
    const permissions: string[] = getPermission() || [];
    return permissions.includes(permission);
}

/**
 * 指令是具有一组生命周期的钩子，具有 7 个生命周期
 * - created、beforeMount、mounted、beforeUpdate、updated、beforeUnmount、unmounted
 */
const permission = {
    /**
     * 钩子函数有 3-4 个参数，如下：
     * @param el 指令绑定到的元素，这可用于直接操作 DOM
     * @param binding 一个对象包含一些属性
     *   - name 指令名，不包括 v- 前缀
     *   - value 指令绑定的值
     *   - oldValue 指令绑定的前一个值
     *   ......
     * @param vnode vue 编译生成的虚拟节点
     * @param prevNode 上一个虚拟节点，仅在 beforeUpdate 和 updated 钩子中可用。
     */
    mounted(el: any, binding: Record<string, any>) {
        if (!binding.value || binding.value.length === 0) {
            return;
        }

        const isHave = binding.value.some(hasPermission);

        if (!isHave) {
            // el.style.display = 'none';
            el.parentNode?.removeChild(el);
        }
    },

    updated(el: any, binding: Record<string, any>) {
        if (!binding.value || binding.value.length === 0) {
            return;
        }

        const isHave = binding.value.some(hasPermission);

        if (!isHave) {
            // el.style.display = 'none';
            el.parentNode?.removeChild(el);
        } else {
            // el.style.display = '';
        }
    },
};

export default permission;
