# 查询表单

## 侧边栏筛选表单通用配置实例

<Demo1 />

::: code-group

<<< ./__demo__/search-form.vue

<<< ./__demo__/form-config.ts

:::

## 头部筛选过滤表单

<Demo2 />

### 标签宽度
```css
.filter-form {
  --label-width: 80px;
}
```

::: code-group

<<< ./__demo__/filter-form.vue

<<< ./__demo__/filter-config.tsx

:::

## 头部筛选过滤表单-inner

<Demo3 />

::: code-group

<<< ./__demo__/filter-form-inner.vue

<<< ./__demo__/filter-config.tsx

:::


<script setup lang="ts">
import Demo1 from './__demo__/search-form.vue'

import Demo2 from './__demo__/filter-form.vue';

import Demo3 from './__demo__/filter-form-inner.vue';

</script>

## API


### `<search-form>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`Record<string, any>`|`function() { return {}; }`|
|config|SearchForm 动态表单配置|`SearchFormI`|`-`|
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
|component|组件|`Component \| string`|`-`|
|componentProps|组件配置|`any`|`-`|
|label|标签的文本|`string`|`-`|
|multiple|是否多值|`boolean`|`false`|
|disabled|是否禁用|`boolean`|`false`|
|placeholder|占位|`string \| string[]`|`-`|
|options|组件数据配置|`OptionData[] \| (() => Promise<OptionData[]>)`|`-`|
|tooltip|提示内容|`string`|`-`|
|span|布局宽度占位，默认位1|`number \| ResponsiveValue`|`-`|




