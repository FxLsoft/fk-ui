```yaml
meta:
  type: 组件
  category: 反馈
title: Modal 对话框
description: 在当前页面打开一个浮层，承载相关操作。
```
---

<!--@include: ./__demo__/basic.md-->
<!--@include: ./__demo__/async.md-->
<!--@include: ./__demo__/function.md-->
<!--@include: ./__demo__/notice.md-->
<!--@include: ./__demo__/width.md-->
<!--@include: ./__demo__/custom.md-->
<!--@include: ./__demo__/form.md-->
<!--@include: ./__demo__/draggable.md-->
<!--@include: ./__demo__/fullscreen.md-->
## API

%%API(modal.vue)%%

### `<modal>` 全局方法

Modal提供的全局方法，可以通过以下三种方法使用：

1. 通过this.$modal调用
2. 在Composition API中，通过getCurrentInstance().appContext.config.globalProperties.$modal调用
3. 导入Modal，通过Modal本身调用

当通过 import 方式使用时，组件没有办法获取当前的 Vue Context，如 i18n 或 route 等注入在 AppContext 上的内容无法在内部使用，需要在调用时手动传入 AppContext，或者为组件全局指定 AppContext

```ts
import { createApp } from 'vue'
import { Modal } from '@erp/common';

const app = createApp(App);
Modal._context = app._context;
```

---

%%INTERFACE(interface.ts)%%
