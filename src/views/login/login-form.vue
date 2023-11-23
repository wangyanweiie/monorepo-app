<template>
    <div class="form">
        <el-form ref="formRef" :model="form" :rules="rules">
            <el-form-item prop="account">
                <el-input v-model="form.account" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="form.password" show-password placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="companyId">
                <el-select v-model="form.companyId" placeholder="公司" :style="{ width: '100%' }">
                    <el-option
                        v-for="items in companyList"
                        :key="items.value"
                        :label="items.label"
                        :value="items.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="baseUrl">
                <el-input
                    v-if="ENV !== 'production'"
                    v-model="form.baseUrl"
                    placeholder="BASE_URl"
                    @blur="handleBlur"
                ></el-input>
            </el-form-item>
        </el-form>

        <el-button class="form__login-button" type="primary" :loading="loading" @click="login"> 登录 </el-button>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { useRouter } from 'vue-router';
import { usePermissionStore } from '@/store/permission';
import dropdownAPI from '@/api/dropdown';
import RequestAPI from '@/api/login';
import { getBaseUrl, saveBaseUrl, saveUserToken, saveUserInfo } from '@/utils/storage';
import { ENV } from '@/constant/global';

const router = useRouter();
const { setPermission, setActiveRouteList } = usePermissionStore();

/**
 * 登录提交表单
 */
interface Form {
    account: string;
    password: string;
    companyId: string;
    baseUrl: string;
}

/**
 * form ref
 */
const formRef = ref<FormInstance>();

/**
 * form
 */
const form = reactive<Form>({
    account: '',
    password: '',
    companyId: '',
    // m ?? n：只有当左侧 m 值为 null/undefined 时才返回 n的值，为 0/空字符串/false 都返回 m 的值
    baseUrl: getBaseUrl() || import.meta.env.VITE_API_URL,
});

/**
 * 表单校验规则
 */
const rules = {
    account: [{ required: true, message: '账号不能为空' }],
    password: [{ required: true, message: '密码不能为空' }],
    companyId: [{ required: true, message: '公司不能为空' }],
    baseUrl: [{ required: true, message: 'BASE_URL 不能为空' }],
};

/**
 * 公司列表
 */
const companyList = ref<any>([]);

/**
 * 获取公司列表
 */
async function getCompanyList() {
    const res = await dropdownAPI.getCompanyName();

    if (!res) {
        return false;
    }

    companyList.value = res;
}

/**
 * 改变 base-url
 */
function handleBlur(e: any) {
    if (!e.target.value) {
        return;
    }

    saveBaseUrl(e.target.value);
}

/**
 * loading
 */
const loading = ref<boolean>(false);

/**
 * 登录
 */
async function login(): Promise<void> {
    // 表单校验
    const valid = await formRef.value?.validate();

    if (!valid) {
        return;
    }

    loading.value = true;
    const res = await RequestAPI.login(form);

    if (!res) {
        loading.value = false;
        return;
    }

    loading.value = false;

    saveUserToken(res.token);
    saveUserInfo(res);
    setPermission(res?.pcPerms);

    // 动态加载路由
    setActiveRouteList();

    // 路由重定向
    const redirectPath = router.currentRoute.value.query.redirect;
    if (redirectPath) {
        router.push({ path: redirectPath as string });
    } else {
        router.push({ path: '/' });
    }
}

/**
 * 页面渲染
 */
onMounted(async () => {
    saveBaseUrl(import.meta.env.VITE_API_URL);
    getCompanyList();
});
</script>

<style lang="scss" scoped>
// Extra small screen / phone
$--screen-xs: 480px;
$--screen-xs-min: $--screen-xs;

// Small screen / tablet
$--screen-sm: 576px;
$--screen-sm-min: $--screen-sm;

// Medium screen / desktop
$--screen-md: 768px;
$--screen-md-min: $--screen-md;

// Large screen / wide desktop
$--screen-lg: 992px;
$--screen-lg-min: $--screen-lg;

// Extra large screen / full hd
$--screen-xl: 1200px;
$--screen-xl-min: $--screen-xl;

// Extra extra large screen / large desktop
$--screen-2xl: 1600px;
$--screen-2xl-min: $--screen-2xl;
$--screen-xs-max: ($--screen-sm-min - 1px);
$--screen-sm-max: ($--screen-md-min - 1px);
$--screen-md-max: ($--screen-lg-min - 1px);
$--screen-lg-max: ($--screen-xl-min - 1px);
$--screen-xl-max: ($--screen-2xl-min - 1px);

.form {
    width: 432px;
    padding: 32px;

    &__title {
        width: 100%;
        height: 40px;
        margin-bottom: 22px;
        line-height: 40px;
        text-align: center;
        letter-spacing: 3px;
        font-size: 20px;
    }

    &__login-button {
        width: 100%;
    }

    @media (max-width: $--screen-xl) {
        background-color: #fff;
        border-radius: 5px;
    }
}
</style>
