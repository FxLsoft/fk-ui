```yaml
meta:
  type: 组件
  category: 数据展示
title: 折叠面板 Collapse
description: 可以折叠 / 展开的内容区域。
```
---

<!--@include: ./__demo__/basic.md-->

<!--@include: ./__demo__/accordion.md-->

<!--@include: ./__demo__/nested.md-->

<!--@include: ./__demo__/border-less.md-->

<!--@include: ./__demo__/extra.md-->

<!--@include: ./__demo__/expand-icon.md-->

<!--@include: ./__demo__/custom.md-->

<!--@include: ./__demo__/icon-position.md-->

<!--@include: ./__demo__/destroy.md-->

## API

%%API(collapse.vue)%%

%%API(collapse-item.tsx)%%

## FAQ

### `<CollapseItem>` 组件的 `key` 属性为必填
在 `<Collapse>` 组件中每个 `<CollapseItem>` 都需要指定唯一的 `key` 属性，`key` 对应 `activeKey` 中的值。

---
