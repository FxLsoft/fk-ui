```yaml
title:
  zh-CN: 自定义选项渲染
  en-US: Custom Item
```


通过 `item` 插槽自定义选项的渲染内容。

---


```vue { "component": true } 

<template>
  <fk-transfer :data="data" :default-value="value">
    <template #item="{ label }">
      <icon-up />
      {{ label }}
    </template>
  </fk-transfer>
</template>

<script>
export default {
  setup() {
    const data = Array.from({length: 8}).fill(undefined).map((_, index) => {
      return {
        value: `option${index + 1}`,
        label: `Option ${index + 1}`,
        disabled: index === 1
      }
    });
    const value = ['option1', 'option3', 'option5'];

    return {
      data,
      value
    }
  },
}
</script>
```
