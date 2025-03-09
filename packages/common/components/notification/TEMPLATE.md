```yaml
meta:
  type: 组件
  category: 反馈
title: 通知提醒框 Notification
description: 全局展示通知提醒，将信息及时有效的传达给用户。
```
---
<!--@include: ./__demo__/basic.md-->

<!--@include: ./__demo__/type.md-->

<!--@include: ./__demo__/position.md-->

<!--@include: ./__demo__/update_notification.md-->

<!--@include: ./__demo__/update_duration.md-->

<!--@include: ./__demo__/btn.md-->

<!--@include: ./__demo__/custom-close.md-->

<!--@include: ./__demo__/style.md-->

## API

%%INTERFACE(interface.ts)%%
### `Notification` 全局方法

`Notification` 提供的全局方法，可以通过以下三种方法使用：
1. 通过 `this.$notification` 调用
2. 在 Composition API 中，通过 `getCurrentInstance().appContext.config.globalProperties.$notification` 调用
3. 导入 `Notification`，通过 `Notification` 本身调用

当通过 `import` 方式使用时，组件没有办法获取当前的 Vue Context，如 i18n 或 route 等注入在 AppContext 上的内容无法在内部使用，需要在调用时手动传入 AppContext，或者为组件全局指定 AppContext

```ts
import { createApp } from 'vue'
import { Notification } from '@erp/common';

const app = createApp(App);
Notification._context = app._context;
```

---
