## zh-CN
```yaml
meta:
  type: 组件
  category: 导航
title: 菜单 Menu
description: 收纳、排列并展示一系列选项的列表。
```
---

<!--@include: ./__demo__/horizontal.md-->

<!--@include: ./__demo__/dark-horizontal.md-->

<!--@include: ./__demo__/collapse-control.md-->

<!--@include: ./__demo__/breakpoint.md-->

<!--@include: ./__demo__/sub-menu.md-->

<!--@include: ./__demo__/size.md-->

<!--@include: ./__demo__/pop.md-->

<!--@include: ./__demo__/pop-button.md-->

## API

%%API(base-menu.vue)%%

%%API(sub-menu.tsx)%%

%%API(item-group.vue)%%

%%API(item.tsx)%%


## FAQ

### `<MenuItem>` 和 `<SubMenu>` 组件的 `key` 属性为必填
在 `<Menu>` 组件中使用 `<MenuItem>` 和 `<SubMenu>` 组件时，请传入唯一的 `key` 属性。
组件内部在进行计算时会依赖此值，如果没有赋值会导致部分场景下异常

---
