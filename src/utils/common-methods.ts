import { ElMessage } from 'element-plus';
import { confirmDeleteMessage } from './confirm-message';
import { OPERATION_NOTICE } from '@custom/utils/src/index';

/**
 * 通用删除
 * @param rows 批量删除选中项
 * @param deleteApi 删除接口
 * @param row 单条数据删除
 * @param tableRef 表格实例用于刷新数据
 * @param deleteParameter 指定字段为删除唯一标识符
 */
export async function handleCommonDelete(
    rows?: any[],
    deleteApi?: any,
    row?: any,
    tableRef?: any,
    deleteParameter?: string,
): Promise<void> {
    let selectedRows = [];

    if (row !== undefined) {
        selectedRows.push(row);
    } else if (rows !== undefined) {
        selectedRows = rows;
    } else {
        return;
    }

    if (selectedRows.length === 0) {
        ElMessage.warning(OPERATION_NOTICE.SELECT_NONE);
        return;
    }

    const confirm = await confirmDeleteMessage();

    if (!confirm) {
        return;
    }

    const res = await deleteApi({
        ids: selectedRows.map(selectedRow => selectedRow.id || ''),
        [deleteParameter as string]: selectedRows.map(selectedRow => selectedRow[deleteParameter as string] || ''),
    });

    if (!res) {
        ElMessage.error(OPERATION_NOTICE.DELETE_ERROR);
        return;
    }

    ElMessage.success(OPERATION_NOTICE.DELETE_SUCCESS);
    tableRef?.loadData({});
    tableRef?.clearSelection();
}

/**
 * 通用导出
 * @param rows 选中项目
 * @param exportApi 导出接口
 * @param tableRef 表格实例
 * @param searchData 查询数据
 * @param extraParams 成员为字段时指定查询对象，成员为对象时查询中添加该对象,可同时传
 */
export async function handleCommonExport(
    rows?: any,
    exportApi?: any,
    tableRef?: any,
    searchData?: any,
    ...extraParams: any[]
): Promise<void> {
    let res: any;

    const extraData = extraParams.reduce((acc, param) => {
        if (typeof param === 'object') {
            return {
                ...acc,
                ...param,
            };
        } else if (typeof param === 'string') {
            return {
                ...acc,
                [param]: rows.map((row: any) => row[param]),
            };
        } else {
            return acc;
        }
    }, {});

    if (!rows.length) {
        res = await exportApi({
            ...searchData,
            ...extraData,
        });
    } else {
        res = await exportApi({
            ids: rows.map((row: any) => row.id).filter((id: any) => id !== undefined),
            ...searchData,
            ...extraData,
        });
    }

    if (res) {
        window.open(res);
    }

    tableRef?.clearSelection();
}
