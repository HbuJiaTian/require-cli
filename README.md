# require-cli

A simple CLI for scaffolding require projects

## Installing

Using npm:

```bash
$ npm install -g require-to-webpack-cli
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

## 代码执行中容易出现的问题：

1. xxx is not defined：由于变量声明没有加 var 导致
