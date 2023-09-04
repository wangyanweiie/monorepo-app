<template>
    <el-config-provider :locale="zhCn">
        <x-layout :routes="showMenus" :include-list="[]">
            <template #logo="{ collapsed }">
                <x-logo logo="/logo.png" title="Template" :collapsed="collapsed"></x-logo>
            </template>

            <template #header-right>
                <x-user :user-name="userInfo?.userName" :dropdown-items="dropdownItems"></x-user>
            </template>
        </x-layout>

        <x-dialog-form
            ref="formRef"
            v-model="visible"
            v-model:data="form"
            title="修改密码"
            width="30%"
            :schemas="schemas"
            :loading="loading"
            @submit="changePassword"
        ></x-dialog-form>
    </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { usePermissionStore } from '@/store/permission';
import { useConf } from './conf';

const { showMenus } = usePermissionStore();
const { userInfo, dropdownItems, schemas, visible, formRef, loading, form, changePassword } = useConf();
</script>
