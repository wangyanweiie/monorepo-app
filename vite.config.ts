import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import Inspect from 'vite-plugin-inspect';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import VueDevTools from 'vite-plugin-vue-devtools';
import Legacy from '@vitejs/plugin-legacy';
import ViteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig({
    resolve: {
        alias: {
            '@': pathSrc,
        },
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                // 生产环境时删除 console 与 debugger
                drop_console: true,
                drop_debugger: true,
            },
        },

        /**
         * rollup 打包后的静态资源名称格式
         * vite 基于 rollup打包，打包后的 chunk（代码块）后静态资源名称比较简单，
         * 使用命名规则可以确保在每次构建应用程序时，文件的名称都会随着内容的更改而变化，
         * 可以避免浏览器缓存旧版本文件的问题，并确保每次部署新的构建版本时，浏览器可以正确加载更新的文件
         */
        rollupOptions: {
            output: {
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
            },
        },
    },
    plugins: [
        Vue(),

        Icons({
            autoInstall: true,
            // 编译方式
            // compiler: 'vue3',
            // 默认类名
            // defaultClass: '',
            // 默认样式
            // defaultStyle: '',
        }),

        /**
         * 自动引入 vue 等插件 hooks
         */
        AutoImport({
            imports: ['vue', 'vue-router'],

            // 自定义组件解析器
            resolvers: [ElementPlusResolver(), IconsResolver()],

            // 配置文件生成位置
            dts: path.resolve('src/types/auto-imports.d.ts'),

            // eslint 报错解决
            eslintrc: {
                // 当 enabled 为 true 时，会根据 filepath 生成一个 eslint 的配置文件，需要引入到 eslint 的配置文件中
                enabled: false,
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true,
            },
        }),

        /**
         * 自动引入自定义组件
         */
        Components({
            // 指定组件位置，默认是src/components
            // dirs: ['src/components'],

            // 组件的有效文件扩展名。
            // extensions: ['vue'],

            // 自动导入指令
            // 默认值：Vue 3 的 `true`，Vue 2 的 `false`
            // 需要 Babel 来为 Vue 2 进行转换，出于性能考虑，它默认处于禁用状态。
            // directives: true,

            // 自定义组件解析器
            resolvers: [
                ElementPlusResolver(),
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
            ],

            // 配置文件生成位置
            dts: path.resolve('src/types/components.d.ts'),
        }),

        /**
         * 检查插件
         */
        Inspect(),

        /**
         * 增强 Vue 开发者体验
         */
        VueDevTools(),

        /**
         * 兼容旧版浏览器
         */
        Legacy({
            targets: ['defaults', 'not IE 11'],
        }),

        /**
         * gzip 压缩 => Nginx 要开启 gzip 才有作用
         */
        ViteCompression(),

        /**
         * 可以展示构建时长、chunk 数量及大小
         * PS：需要将 visualizer 插件放到最后的位置
         */
        visualizer(),
    ],
});
