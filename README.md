# require-cli

A simple CLI for scaffolding require projects

## Installing

Using npm:

```bash
$ npm install -g @58fe/require-cli --registry=http://ires.58corp.com/repository/58npm/
```

## Quick Start

Create the app:

```bash
$ require init
```

Install dependencies:

```bash
$ npm install
```

Rock and Roll

```bash
$ npm run build
```

注：安装时将项目名改为对应页面项目名

## 迁移步骤

1. 将 requirejs 的页面入口文件代码（路径目录：\_pkg/job/）复制到/src/index.js 中；
2. 将引用模块文件拷贝到 job 或 common 中（对应原引用路径）
3. 将 index.js 的入口引用路径改为相对路径（./job）
4. 页面 css 拷贝到 src/css 文件夹下，打包时会自动 copy 到 dist/css 目录下

## 上线步骤

1. 前端代码通过 arthur 构建上线
2. 修改模版，主要改以下四处：

-   修改 css 路径
-   隐藏\_\_\_\_loadCfg 变量
-   删除 boot 文件
-   删除加载模块（require_jquery_load.js 可改为 jquery 文件路径，也可不改）
-   M 端页面若引用了 EMS 监控，将 esl_zepto_load.min.js 改为普通的线上 zepto 文件路径：//j1.58cdn.com.cn/m58/js/zepto.min.v_120.js
-   在 body 末尾引入 arthur 上线打包后的 js 文件

## 代码执行中容易出现的问题：

1. xxx is not defined：由于变量声明没有加 var 导致
