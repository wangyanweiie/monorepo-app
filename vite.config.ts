import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Inspect from 'vite-plugin-inspect';
import legacyPlugin from '@vitejs/plugin-legacy';
import VueDevTools from 'vite-plugin-vue-devtools';

const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig({
    resolve: {
        alias: {
            '@': pathSrc,
        },
    },
    plugins: [
        VueDevTools(),
        Vue(),
        AutoImport({
            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ['vue'],

            // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
            resolvers: [ElementPlusResolver()],

            dts: path.resolve(pathSrc, 'types/auto-imports.d.ts'),
        }),

        Components({
            resolvers: [
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),

                // 自动导入 Element Plus 组件
                ElementPlusResolver(),
            ],

            dts: path.resolve(pathSrc, 'types/components.d.ts'),
        }),

        Icons({
            autoInstall: true,
        }),

        Inspect(),

        legacyPlugin({
            targets: ['chrome 52'],
        }),
    ],
});
