```yaml
meta:
  type: 组件
  category: 数据输入
title: 选择器 Select
description: 当用户需要从一组同类数据中选择一个或多个时，可以使用下拉选择器，点击后选择对应项。
```

---

<!--@include: ./__demo__/basic.md-->

<!--@include: ./__demo__/clear.md-->

<!--@include: ./__demo__/multiple.md-->

<!--@include: ./__demo__/size.md-->

<!--@include: ./__demo__/loading.md-->

<!--@include: ./__demo__/header.md-->

<!--@include: ./__demo__/footer.md-->

<!--@include: ./__demo__/border.md-->

<!--@include: ./__demo__/create.md-->

<!--@include: ./__demo__/search.md-->

<!--@include: ./__demo__/scroll.md-->

<!--@include: ./__demo__/fallback.md-->

<!--@include: ./__demo__/remote.md-->

<!--@include: ./__demo__/group.md-->

<!--@include: ./__demo__/label.md-->

<!--@include: ./__demo__/linkage.md-->

<!--@include: ./__demo__/field-names.md-->

<!--@include: ./__demo__/virtual-list.md-->

## API


### `<select>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|multiple|是否开启多选模式（多选模式默认开启搜索）|`boolean`|`false`||
|model-value **(v-model)**|绑定值|`string \| number \| boolean \| Record<string, any> \| (string \| number \| boolean \| Record<string, any>)[]`|`-`||
|default-value|默认值（非受控模式）|`string \| number \| boolean \| Record<string, unknown> \| (string \| number \| boolean \| Record<string, unknown>)[]`|`'' \ []`||
|input-value **(v-model)**|输入框的值|`string`|`-`||
|default-input-value|输入框的默认值（非受控模式）|`string`|`''`||
|size|选择框的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|placeholder|占位符|`string`|`-`||
|loading|是否为加载中状态|`boolean`|`false`||
|disabled|是否禁用|`boolean`|`false`||
|error|是否为错误状态|`boolean`|`false`||
|allow-clear|是否允许清空|`boolean`|`false`||
|allow-search|是否允许搜索|`boolean \| { retainInputValue?: boolean }`|`false (single) \ true (multiple)`||
|allow-create|是否允许创建|`boolean`|`false`||
|max-tag-count|多选模式下，最多显示的标签数量。0 表示不限制|`number`|`0`||
|popup-container|弹出框的挂载容器|`string \| HTMLElement`|`-`||
|bordered|是否显示输入框的边框|`boolean`|`true`||
|default-active-first-option|是否在无值时默认选择第一个选项|`boolean`|`true`|1.0.0|
|popup-visible **(v-model)**|是否显示下拉菜单|`boolean`|`-`||
|default-popup-visible|弹出框默认是否可见（非受控模式）|`boolean`|`false`||
|unmount-on-close|是否在下拉菜单关闭时销毁元素|`boolean`|`false`||
|filter-option|是否过滤选项|`boolean \| ((inputValue: string, option: SelectOptionData) => boolean)`|`true`||
|options|选项数据|`(string \| number \| boolean \| SelectOptionData \| SelectOptionGroup)[]`|`[]`||
|virtual-list-props|传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#VirtualListProps)|`VirtualListProps`|`-`||
|trigger-props|下拉菜单的触发器属性|`TriggerProps`|`-`||
|format-label|格式化显示内容|`(data: SelectOptionData) => string`|`-`||
|fallback-option|自定义值中不存在的选项|`boolean \| ((value: string \| number \| boolean \| Record<string, unknown>) => SelectOptionData)`|`true`|1.0.0|
|show-extra-options|是否在下拉菜单中显示额外选项|`boolean`|`true`|1.0.0|
|value-key|用于确定选项键值的属性名|`string`|`'value'`|1.0.0|
|search-delay|触发搜索事件的延迟时间|`number`|`500`|1.0.0|
|limit|多选时最多的选择个数|`number`|`0`|1.0.0|
|field-names|自定义 `SelectOptionData` 中的字段|`SelectFieldNames`|`-`|1.0.0|
|scrollbar|是否开启虚拟滚动条|`boolean \| ScrollbarProps`|`true`|1.0.0|
|show-header-on-empty|空状态时是否显示header|`boolean`|`false`||
|show-footer-on-empty|空状态时是否显示footer|`boolean`|`false`||
|tag-nowrap|标签内容不换行|`boolean`|`false`|1.0.0|
### `<select>` Events

|事件名|描述|参数|版本|
|---|---|---|:---|
|change|值发生改变时触发|value: ` string \| number \| boolean \| Record<string, any> \| (string \| number \| boolean \| Record<string, any>)[] `||
|input-value-change|输入框的值发生改变时触发|inputValue: `string`||
|popup-visible-change|下拉框的显示状态改变时触发|visible: `boolean`||
|clear|点击清除按钮时触发|-||
|remove|点击标签的删除按钮时触发|removed: `string \| number \| boolean \| Record<string, any> \| undefined`||
|search|用户搜索时触发|inputValue: `string`||
|dropdown-scroll|下拉菜单发生滚动时触发|-||
|dropdown-reach-bottom|下拉菜单滚动到底部时触发|-||
|exceed-limit|多选超出限制时触发|value: `string \| number \| boolean \| Record<string, any> \| undefined`<br>ev: `Event`|1.0.0|
### `<select>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|trigger|自定义触发元素|-|1.0.0|
|prefix|前缀元素|-|1.0.0|
|search-icon|选择框的搜索图标|-|1.0.0|
|loading-icon|选择框的加载中图标|-|1.0.0|
|arrow-icon|选择框的箭头图标|-|1.0.0|
|footer|下拉框的页脚|-||
|header|下拉框的页头|-|1.0.0|
|label|选择框的显示内容|data: `SelectOptionData`||
|option|选项内容|data: `SelectOptionData`||
|empty|选项为空时的显示内容|-||




### `<option>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|value|选项值（如不填，会从内容中获取）|`string\|number\|boolean\|object`|`-`||
|label|选项标签（如不填，会从内容中获取）|`string`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|tag-props|展示的标签属性|`TagProps`|`-`|1.0.0|
|extra|额外数据。2.18.0 版本废弃，可使用对象形式的 value 扩展数据|`object`|`-`|1.0.0|
|index|用于手动指定选项的 index|`number`|`-`|1.0.0|




### `<optgroup>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|选项组的标题|`string`|`-`|
### `<optgroup>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|label|选项组的标题|-|1.0.0|



### Type

```ts
/**
 * @zh 选项
 * @en Option
 */
type Option = string | number | SelectOptionData | SelectOptionGroup;

/**
 * @zh 筛选
 * @en Filter
 */
type FilterOption = boolean | ((inputValue: string, option: SelectOptionData) => boolean);
```


### SelectOptionData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|value|选项值|`string \| number \| boolean \| Record<string, unknown>`|`-`|
|label|选项内容|`string`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|tagProps|选项对应的多选标签的属性|`any`|`-`|
|render|自定义渲染|`RenderFunction`|`-`|



### SelectOptionGroup

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|isGroup|是否为选项组|`true`|`-`|
|label|选项组标题|`string`|`-`|
|options|选项组中的选项|`SelectOption[]`|`-`|




### VirtualListProps

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|height|可视区域高度|`number \| string`|`-`||
|threshold|开启虚拟滚动的元素数量阈值，当数据数量小于阈值时不会开启虚拟滚动。|`number`|`-`||
|isStaticItemHeight|元素高度是否是固定的。|`boolean`|`false`||
|fixedSize|元素高度是否是固定的。|`boolean`|`false`|1.0.0|
|estimatedSize|元素高度不固定时的预估高度。|`number`|`-`|1.0.0|
|buffer|视口边界外提前挂载的元素数量。|`number`|`10`|1.0.0|




## FAQ

### 使用 `Object` 格式作为选项的值
当使用 `Object` 格式作为选项的值时，需要通过 `value-key` 属性为选择器指定获取唯一标识的字段名，默认值为 `value`.
此外 `value` 的对象值需要在 `setup` 中定义好，不能够在模版中创建对象，这样会导致 `Option` 组件的重复渲染。

例如当我需要指定 `key` 为唯一标识时：
```vue { "components": true }
<template>
  <a-select v-model="value" :style="{width:'320px'}" placeholder="Please select ..." value-key="key">
    <a-option v-for="item of data" :value="item" :label="item.label" />
  </a-select>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref();
    const data = [{
      value: 'beijing',
      label: 'Beijing',
      key: 'extra1'
    }, {
      value: 'shanghai',
      label: 'Shanghai',
      key: 'extra2'
    }, {
      value: 'guangzhou',
      label: 'Guangzhou',
      key: 'extra3'
    }, {
      value: 'chengdu',
      label: 'Chengdu',
      key: 'extra4'
    }]

    return {
      value,
      data
    }
  },
}
</script>
```

### 滚动容器中的下拉菜单分离问题
`Select` 组件默认没有开启容器滚动的事件监听功能，如果遇到在滚动容器中下拉菜单分离的问题，可以手动开启内部 `Trigger` 组件的 `updateAtScroll` 功能。
如果是在全局环境中存在此种情况，可以使用 `ConfigProvider` 组件默认开启此属性。

```vue { "components": true }
<a-select :trigger-props="{updateAtScroll:true}"></a-select>
```

---
