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

%%API(select.tsx)%%

%%API(option.vue)%%

%%API(optgroup.vue)%%

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

%%INTERFACE(interface.ts)%%

%%INTERFACE(../_components/virtual-list-v2/interface.ts)%%


## FAQ

### 使用 `Object` 格式作为选项的值
当使用 `Object` 格式作为选项的值时，需要通过 `value-key` 属性为选择器指定获取唯一标识的字段名，默认值为 `value`.
此外 `value` 的对象值需要在 `setup` 中定义好，不能够在模版中创建对象，这样会导致 `Option` 组件的重复渲染。

例如当我需要指定 `key` 为唯一标识时：
```vue { "components": true }
<template>
  <fk-select v-model="value" :style="{width:'320px'}" placeholder="Please select ..." value-key="key">
    <fk-option v-for="item of data" :key="item.value" :value="item" :label="item.label" />
  </fk-select>
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
<fk-select :trigger-props="{updateAtScroll:true}"></fk-select>
```

---
