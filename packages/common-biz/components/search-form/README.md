# 查询表单

<Demo1 />

<script setup lang="ts">
import Demo1 from './__demo__/search-form.vue'

</script>

## API


### `<search-form>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`Record<string, any>`|`function() { return {}; }`|
|config|SearchForm 动态表单配置|`SearchFormI`|`-`|
|expand|展开收起|`boolean`|`false`|
|loading|查询按钮的loading|`boolean`|`false`|
### `<search-form>` Events

|事件名|描述|参数|
|---|---|---|
|reset|查询组件重置|model: `mixed`|
|query|触发筛选|model: `mixed`|
|change|值改变|value: `mixed`<br>field: `mixed`|




### SearchFormI

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|fields|表单字段|`FormFieldI[]`|`-`|
|components|动态组件|`Record<string, Component>`|`-`|
|gridProps|grid 布局配置，可响应式布局|`GridProps`|`-`|
|queryPool|查询池<br>唯一标识|`string`|`-`|
|labelLayout|label布局<br>默认左右结构<br>inner 为label在输入框里面|`LabelLayoutType`|`-`|
|suffixSpan|suffix 栅格占位<br>默认为 1，如果配置了queryPool，默认为2|`number`|`-`|
|collapsedRows|折叠时显示的行数<br>默认为2|`number`|`-`|



### FormFieldI

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|$id|系统自动生成的id|`string`|`-`|
|key|数据模式key，符合property path规则|`string`|`-`|
|type|组件类型|`InputType \| 'custom'`|`-`|
|component|组件 支持slot component jsx|`Component \| string \| CustomFormFieldComponent`|`-`|
|componentProps|组件配置|`any`|`-`|
|label|标签的文本|`string`|`-`|
|multiple|是否多值|`boolean`|`false`|
|disabled|是否禁用|`boolean`|`false`|
|placeholder|占位|`string \| string[]`|`-`|
|options|组件数据配置|`OptionData[] \| (() => Promise<OptionData[]>)`|`-`|
|tooltip|提示内容|`string`|`-`|
|span|布局宽度占位，默认位1|`number \| ResponsiveValue`|`-`|
|showExpand|field 对 search-form 生效|`boolean`|`false`|



### CustomFormFieldComponentProps

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model|表单数据模型|`Record<string, any>`|`-`|
|field|表单字段配置|`FormFieldI`|`-`|
|modelValue **(v-model)**|当前字段对象数据值|`any`|`-`|
|options|数据源|`OptionData[]`|`-`|
|loading|是否加载中|`boolean`|`false`|
|onChange|change事件|`(value: any) => void`|`-`|
|isExpandInput|是否展开input事件 labelLayout为expand有效|`boolean`|`false`|
|isExpandField|是否展开字段 labelLayout为expand有效|`boolean`|`false`|
|onExpandInput|是否展开input事件 labelLayout为expand有效|`(value: boolean) => void`|`-`|
|onExpandField|是否展开字段 labelLayout为expand有效|`(value: boolean) => void`|`-`|


