```yaml
meta:
  type: 组件
  category: 反馈
title: 抽屉 Drawer
description: 触发命令后，从屏幕一侧滑出的抽屉式的面板。
```
---

<!--@include: ./__demo__/basic.md-->
<!--@include: ./__demo__/position.md-->
<!--@include: ./__demo__/custom.md-->
<!--@include: ./__demo__/nested.md-->
<!--@include: ./__demo__/popup-container.md-->
<!--@include: ./__demo__/function.md-->
## API

%%API(drawer.vue)%%


### `<drawer>` 全局方法

Drawer 提供的全局方法，可以通过以下三种方法使用：

1. 通过 `this.$drawer` 调用
2. 在 Composition API 中，通过 `getCurrentInstance().appContext.config.globalProperties.$drawer` 调用
3. 导入 Drawer，通过 Drawer 本身调用

当通过 import 方式使用时，组件没有办法获取当前的 Vue Context，如 i18n 或 route 等注入在 AppContext 上的内容无法在内部使用，需要在调用时手动传入 AppContext，或者为组件全局指定 AppContext

```ts
import { createApp } from 'vue'
import { Drawer } from '@erp/common';

const app = createApp(App);
Drawer._context = app._context;
```

---
