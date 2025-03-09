```yaml
title:
  zh-CN: 自定义前缀&后缀
  en-US: Custom prefix & suffix
```


通过 `prefix` 和 `suffix` 插槽可以添加前后缀。

---


```vue { "component": true } 
<template>
  <fk-space size="large">
    <fk-statistic title="New Users" :value="125670" show-group-separator >
      <template #suffix>
        <icon-arrow-rise />
      </template>
    </fk-statistic>
    <fk-statistic title="User Growth Rate" :value="50.52" :precision="2" :value-style="{ color: '#0fbf60' }">
      <template #prefix>
        <icon-arrow-rise />
      </template>
      <template #suffix>%</template>
    </fk-statistic>
  </fk-space>
</template>
```
