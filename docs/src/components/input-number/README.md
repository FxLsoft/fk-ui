```yaml
meta:
  type: 组件
  category: 数据输入
title: 数字输入框 InputNumber
description: 仅允许输入数字格式的输入框。
```
---

<!--@include: ./__demo__/basic.md-->

<!--@include: ./__demo__/mode.md-->

<!--@include: ./__demo__/size.md-->

<!--@include: ./__demo__/precision.md-->

<!--@include: ./__demo__/prefix.md-->

<!--@include: ./__demo__/step-icon.md-->

<!--@include: ./__demo__/format.md-->

<!--@include: ./__demo__/model.md-->

## API


### `<input-number>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`number\|string`|`-`||
|default-value|默认值（非受控模式）|`number`|`-`||
|mode|模式（`embed`：按钮内嵌模式，`button`：左右按钮模式）|`'embed' \| 'button'`|`'embed'`||
|precision|数字精度|`number`|`-`||
|step|数字变化步长|`number`|`1`||
|disabled|是否禁用|`boolean`|`false`||
|error|是否为错误状态|`boolean`|`false`||
|max|最大值|`number`|`Number.POSITIVE_INFINITY`||
|min|最小值|`number`|`Number.NEGATIVE_INFINITY`||
|formatter|定义输入框展示值|`func`|`-`||
|parser|从 `formatter` 转换为数字，和 `formatter` 搭配使用|`func`|`-`||
|placeholder|输入框提示文字|`string`|`-`||
|hide-button|是否隐藏按钮|`boolean`|`false`||
|size|输入框大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|allow-clear|是否允许清空输入框|`boolean`|`false`||
|model-event|触发 `v-model` 的事件|`'change' \| 'input'`|`'change'`||
|read-only|只读|`boolean`|`false`|1.0.0|
|input-attrs|内部 input 元素的属性|`object`|`-`|1.0.0|
### `<input-number>` Events

|事件名|描述|参数|版本|
|---|---|---|:---|
|change|值发生改变时触发|value: ` number \| undefined `<br>ev: `Event`||
|focus|输入框获取焦点时触发|ev: `FocusEvent`||
|blur|输入框失去焦点时触发|ev: `FocusEvent`||
|clear|用户点击清除按钮时触发|ev: `Event`|1.0.0|
|input|输入时触发|value: ` number \| undefined `<br>inputValue: `string`<br>ev: `Event`|1.0.0|
|keydown|按下键盘时触发|ev: `MouseEvent`|1.0.0|
### `<input-number>` Methods

|方法名|描述|参数|返回值|
|---|---|---|---|
|focus|使输入框获取焦点|-|-|
|blur|使输入框失去焦点|-|-|
### `<input-number>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|minus|数值减少图标|-|
|plus|数值增加图标|-|
|append|后置标签|-|
|prepend|前置标签|-|
|suffix|后缀|-|
|prefix|前缀|-|


