```yaml
meta:
  type: 组件
  category: 其他
title: 折叠列表 OverflowList
description:
```
---

<!--@include: ./__demo__/basic.md-->

<!--@include: ./__demo__/from.md-->

## API


### `<overflow-list>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|min|最少展示的元素个数|`number`|`0`|
|margin|项目间隔|`number`|`6`|
|from|折叠方向|`'start' \| 'end'`|`'end'`|
### `<overflow-list>` Events

|事件名|描述|参数|
|---|---|---|
|change|溢出数量改变时触发|value: `number`|
### `<overflow-list>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|overflow|折叠元素|number: `number`|



