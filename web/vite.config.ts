/* eslint-disable node/no-unpublished-import */
import { resolve } from 'path';
import { defineConfig, Plugin, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import externalGlobals from 'rollup-plugin-external-globals';
import viteCompression from 'vite-plugin-compression';
import analyzer from 'rollup-plugin-analyzer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// 是否是客户端构建
const isClientBuild = process.env.npm_lifecycle_event === 'build:web:client';

// https://vitejs.dev/config/
export default defineConfig((/* { mode, command } */) => {
  /* 插件 S */
  const plugins: (Plugin | Plugin[])[] = [
    vue(),
    analyzer({ summaryOnly: true }),
    // 使用 svg 图标，在main.ts入口文件需要注册 import 'virtual:svg-icons-register';
    createSvgIconsPlugin({
      iconDirs: [resolve(__dirname, './assets/iconsvg')],
      symbolId: 'icon-[name]',
    }),

    // 构建压缩文件
    viteCompression({
      // 是否在控制台输出压缩结果，默认为 true
      verbose: true,
      // 是否禁用压缩，默认为 false
      disable: false,
      // 启用压缩的文件大小最小限制，单位字节（byte），默认为 0，1b(字节)=8bit(比特), 1KB=1024B
      threshold: 10240, // 即10kb以上即会压缩
      // 采用的压缩算法，默认是 gzip
      algorithm: 'gzip',
      // 生成的压缩包后缀
      ext: '.gz',
    }),
  ];

  /* 公共配置 S */
  const config: UserConfigExport = {
    root: 'web',
    resolve: {
      alias: {
        '~': resolve(__dirname, '../'),
        '@': resolve(__dirname, './'),
      },
    },
    server: {
      proxy: {
        '^/api/.*': {
          // 代理到本地8002端口，根据src/config/config.default.ts 中 port设置
          target: `http://127.0.0.1:${process.env.MIDWAY_HTTP_RORT || 8002}`,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins,
  };

  /* 不同端配置 S */
  if (true === isClientBuild) {
    // 一、客户端构建
    config.build = {
      rollupOptions: {
        //  告诉打包工具 在external配置的 都是外部依赖项  不需要打包
        external: [
          'vue',
          'vue-router',
          'vue-demi', // VueDemi这个是pinia用来判断是vue2还是vue3所需要的
          'pinia',
          'element-plus',
          'qs',
          'axios',
        ],
        plugins: [
          // 避免打包和生产模式运行出错 在这里声明公共模块
          externalGlobals({
            //  "在项目中引入的变量名称" ："CDN包导出的名称，一般在CDN包中都是可见的"
            vue: 'Vue',
            'vue-router': 'VueRouter',
            'vue-demi': 'VueDemi',
            pinia: 'Pinia',
            'element-plus': 'ElementPlus',
            qs: 'Qs',
            axios: 'axios',
          }),
        ],
      },
    };
  } else {
    // 二、否则服务端构建
    /* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    config.ssr = {
      external: [
        'vue',
        'vue-router',
        'vue-demi',
        'pinia',
        'element-plus',
        'axios',
      ],
    }; */
  }

  return config;
});
