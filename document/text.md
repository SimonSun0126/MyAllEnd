
确实，很多按常理放在 dependencies 的东西，其实都可以放到 devDependencies 中去，因为 react-scripts 会通过 Webpack 把在 React 项目中用到的各种库都打包压缩到 build 文件夹里，之后让 Electron 根据 dependencies 所列再打包一遍，毫无意义，build 根本不会用到。

## 信息
图标转icon用 https://www.butterpig.top/icopro
80% https://ps.gaoding.com/#/
mac是512的png
win是256的win icon
linux是512的png
React Native 如何修改 App 图标
https://www.jianshu.com/p/8037d387bda5
海报设计
https://shots.so/
上线用xcode
## 营销
https://www.woshipm.com/operate/132947.html
## 逻辑
### 存储逻辑
### request流程
post-request被放到common里面，不同端不同初始化过程
electron fetch流程
fetch过来，最终结果是 {code: 200, 其他业务信息}
然后这个信息被resolve
然后到消息处理，列成{res: {code: 200, 其他业务信息}, err: {}|''}
然后传到渲染端，res被解包出来

# 打包
*🚨 默认情况下, `electron` 文件夹下的文件将会被构建到 `dist-electron`*

```tree
├── electron                                 Electron 源码文件夹
│   ├── main                                 Main-process 源码
│   └── preload                              Preload-scripts 源码
│
├── release                                  构建后生成程序目录
│   └── {version}
│       ├── {os}-{os_arch}                   未打包的程序(绿色运行版)
│       └── {app_name}_{version}.{ext}       应用安装文件
│
├── public                                   同 Vite 模板的 public
└── src                                      渲染进程源码、React代码
```

## 🚨 这需要留神

默认情况下，该模板在渲染进程中集成了 Node.js，如果你不需要它，你只需要删除下面的选项. [因为它会修改 Vite 默认的配置](https://github.com/electron-vite/vite-plugin-electron-renderer#config-presets-opinionated).

```diff
# vite.config.ts

export default {
  plugins: [
    ...
-   // Use Node.js API in the Renderer-process
-   renderer({
-     nodeIntegration: true,
-   }),
    ...
  ],
}
```
-->

## 🔧 额外的功能
1. Electron 自动更新 👉 [阅读文档](src/components/update/README.zh-CN.md)
2. Playwright 测试




