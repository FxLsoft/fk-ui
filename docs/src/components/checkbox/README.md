```yaml
meta:
  type: 组件
  category: 数据输入
title: 复选框 Checkbox
description: 在一组数据中，用户可通过复选框选择一个或多个数据。
```
---

<!--@include: ./__demo__/basic.md-->

<!--@include: ./__demo__/control.md-->

<!--@include: ./__demo__/disabled.md-->

<!--@include: ./__demo__/group.md-->

<!--@include: ./__demo__/options.md-->

<!--@include: ./__demo__/limit.md-->

<!--@include: ./__demo__/all.md-->

<!--@include: ./__demo__/layout.md-->

<!--@include: ./__demo__/custom.md-->

## API


### `<checkbox>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`boolean \| Array<string \| number \| boolean>`|`-`|
|default-checked|默认是否选中（非受控状态）|`boolean`|`false`|
|value|选项的 `value`|`string\|number\|boolean`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|indeterminate|是否为半选状态|`boolean`|`false`|
### `<checkbox>` Events

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: ` boolean \| (string \| number \| boolean)[] `<br>ev: `Event`|
### `<checkbox>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|checkbox|自定义复选框|checked: `boolean`<br>disabled: `boolean`|1.0.0|




### `<checkbox-group>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`string \| number \| boolean \| Array<string \| number \| boolean>`|`-`||
|default-value|默认值（非受控状态）|`Array<string \| number \| boolean> \| string \| number \| boolean`|`[]`||
|max|支持最多选中的数量|`number`|`-`|1.0.0|
|options|选项|`Array<string \| number \| CheckboxOption>`|`-`|1.0.0|
|direction|复选框的排列方向|`Direction`|`'horizontal'`||
|disabled|是否禁用|`boolean`|`false`||
|multiple|是否多选|`boolean`|`true`||
### `<checkbox-group>` Events

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: `(string \| number \| boolean)[]`<br>ev: `Event`|
### `<checkbox-group>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|checkbox|自定义复选框|checked: `boolean`<br>disabled: `boolean`|1.0.0|
|label|checkbox 文案内容|data: `CheckboxOption`|1.0.0|




### CheckboxOption

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|文案|`RenderContent`|`-`|
|value|选项的 `value`|`string \| number`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|indeterminate|是否为半选状态|`boolean`|`false`|


