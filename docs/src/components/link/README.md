```yaml
meta:
  type: 组件
  category: 通用
title: 链接 Link
description: 链接的基本样式。
```
---

<!--@include: ./__demo__/basic.md-->

<!--@include: ./__demo__/status.md-->

<!--@include: ./__demo__/hoverable.md-->

<!--@include: ./__demo__/icon.md-->

<!--@include: ./__demo__/loading.md-->

## API



### `<link>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|href|链接地址|`string`|`-`||
|status|链接的状态|`'normal' \| 'warning' \| 'success' \| 'danger'`|`'normal'`||
|hoverable|鼠标悬浮时存在底色|`boolean`|`true`|1.0.0|
|icon|图标|`boolean`|`false`|1.0.0|
|loading|链接是否为加载中状态|`boolean`|`false`|1.0.0|
|disabled|链接是否禁用|`boolean`|`false`||
### `<link>` Events

|事件名|描述|参数|
|---|---|---|
|click|点击时触发|ev: `MouseEvent`|


