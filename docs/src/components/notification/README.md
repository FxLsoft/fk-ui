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


### NotificationMethod

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|info|显示信息提醒框|`(config: string \| NotificationConfig, appContext?: AppContext) => NotificationReturn`|`-`|
|success|显示成功提醒框|`(config: string \| NotificationConfig, appContext?: AppContext) => NotificationReturn`|`-`|
|warning|显示警告提醒框|`(config: string \| NotificationConfig, appContext?: AppContext) => NotificationReturn`|`-`|
|error|显示错误提醒框|`(config: string \| NotificationConfig, appContext?: AppContext) => NotificationReturn`|`-`|
|remove|清除对应 `id` 的提醒框|`(id: string) => void`|`-`|
|clear|清除全部提醒框|`(position?: NotificationPosition) => void`|`-`|



### NotificationConfig

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|content|内容|`RenderContent`|`-`||
|title|标题|`RenderContent`|`-`||
|icon|图标|`RenderFunction`|`-`||
|id|唯一id|`string`|`-`||
|style|样式|`CSSProperties`|`-`||
|class|样式类名|`ClassName`|`-`||
|position|位置|`'topLeft'\|'topRight'\|'bottomLeft'\|'bottomRight'`|`-`||
|showIcon|是否显示图标|`boolean`|`true`||
|closable|是否可关闭|`boolean`|`false`||
|duration|显示的持续时间，单位为 `ms`|`number`|`3000`||
|footer|底部内容|`RenderFunction`|`-`|1.0.0|
|closeIcon|关闭按钮图标|`RenderFunction`|`-`||
|closeIconElement|关闭按钮元素|`RenderFunction`|`-`||
|onClose|关闭时的回调函数|`(id: number \| string) => void`|`-`||



### NotificationReturn

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|close|关闭当前通知提醒框|`() => void`|`-`|


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
