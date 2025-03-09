## ERP_LIB 前端基座说明

### 依赖安装

```shell
pnpm i
```

### 代码提交

```shell
npm run cz
```

### common 版本发布

```shell
cd packages/common
npm run build
npm run pub
```

### 开发 docs

```shell
# 安装依赖
pnpm i
# 安装cli
npm run build:cli
# 安装 cli 执行
pnpm i
# 初始化components
npm run build:common
# 启动开发事例 docs
npm run dev:docs
# 暂存需要提交的代码
git add .
# 根据提示填写信息 提交代码
npm run cz
```

### 打包 docs

```shell
# 安装依赖
pnpm i
# 安装cli
npm run build:cli
# 安装 cli 执行
pnpm i
# 打包 common lib
npm run build:common
# 打包 docs
npm run build:docs
# 打包完docs生成静态文件在 docs/dist 目录下
```
