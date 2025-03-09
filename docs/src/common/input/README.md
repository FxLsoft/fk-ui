# 自定义输入原子组件
## 设计思想与原则
#### 简洁
使用简单，只需要`<erp-input type="{组件类型}" v-model="value">`一行代码，一目了然。组件功能、样式高度内聚，入参简单，出参简单。
#### 统一
对原子化输入组件抽象统一，管理统一，维护统一。
#### 分层
基础组件 -> 应用组件 -> 模板组件 -> 应用程序。

<!--@include: ./__demo__/text.md-->

<!--@include: ./__demo__/textarea.md-->

<!--@include: ./__demo__/password.md-->

<!--@include: ./__demo__/integer.md-->

<!--@include: ./__demo__/number.md-->

<!--@include: ./__demo__/range-number.md-->

<!--@include: ./__demo__/date.md-->

<!--@include: ./__demo__/datetime.md-->

<!--@include: ./__demo__/time.md-->

<!--@include: ./__demo__/radio.md-->

<!--@include: ./__demo__/checkbox.md-->

<!--@include: ./__demo__/select.md-->

<!--@include: ./__demo__/switch.md-->

<!--@include: ./__demo__/cascader.md-->

<!--@include: ./__demo__/tree.md-->

<!--@include: ./__demo__/upload.md-->

<!--@include: ./__demo__/select-shop.md-->

<!--@include: ./__demo__/dic.md-->

<!--@include: ./__demo__/rich-text.md-->

<!--@include: ./__demo__/search-input.md-->

<!--@include: ./__demo__/batch-input.md-->

<!--@include: ./__demo__/html-input.md-->


## API

### `<input>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`ModelValueType`|`''`|
|type **(必填)**|输入类型|`InputType`|`'text'`|
|allow-clear|是否允许清空输入框|`boolean`|`true`|
|disabled|是否禁用|`boolean`|`false`|
|multiple|是否多选|`boolean`|`false`|
|placeholder|提示文字|`string \| string[]`|`-`|
|options|配置|`(string \| number \| OptionData)[] \| Promise<(string \| number \| OptionData)[]>`|`[]`|
|accept|上传文件限制<br>图片, Excel, Word, PPT, PDF, 视频, 音频|`string[] \| string`|`-`|
### `<input>` Events

|事件名|描述|参数|
|---|---|---|
|change|仅在输入框失焦或按下回车时触发|value: `ModelValueType`<br>ev: `Event`|




### OptionData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|value|选项值|`string \| number \| boolean \| Record<string, unknown>`|`-`|
|label|选项内容|`string`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|children|树形结构|`OptionData[]`|`-`|



### BaseInputProps

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|modelValue **(v-model)**|绑定值|`string \| number \| boolean \| Record<string, any> \| (string \| number \| Record<string, any>)[]`|`-`|
|allowClear|是否允许清空输入框|`boolean`|`false`|
|disabled|是否禁用|`boolean`|`false`|
|multiple|是否多选|`boolean`|`false`|
|placeholder|提示文字|`string`|`-`|


