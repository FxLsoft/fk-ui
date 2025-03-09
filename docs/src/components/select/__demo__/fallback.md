```yaml
title:
  zh-CN: 回退选项
  en-US: Fallback Option
```


使用 `fallback-option` 自定义选项中不存在的值，默认会在输入框中展示不存在的选项值。可能用于选项还没有获取完，或者远程搜索时选项改变了。

---


```vue { "component": true } 

<template>
  <fk-space direction="vertical" size="large">
    <fk-select default-value="Shanxi" :style="{width:'320px'}" placeholder="Please select ..." :fallback-option="fallback">
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
    </fk-select>
    <fk-select default-value="Shanxi" :style="{width:'320px'}" placeholder="Please select ..." :fallback-option="fallback" :show-extrfk-options="false">
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
    </fk-select>
    <fk-select :default-value="['Shanxi','Nanjing','Hangzhou']" :style="{width:'320px'}" placeholder="Please select ..." multiple :fallback-option="fallback">
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
      <fk-option>Shenzhen</fk-option>
      <fk-option>Chengdu</fk-option>
      <fk-option>Wuhan</fk-option>
    </fk-select>
  </fk-space>
</template>

<script>
export default {
  setup() {
    const fallback = (value) => {
      return {
        value,
        label: `++${value}++`
      }
    };
    return {
      fallback
    }
  },
}
</script>
```
