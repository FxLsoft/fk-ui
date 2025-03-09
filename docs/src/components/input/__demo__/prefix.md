```yaml
title:
  zh-CN: 前缀与后缀
  en-US: Prefix & Suffix
```


通过指定 `prefix` 和 `suffix` 插槽来在输入框内添加前缀和后缀。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-input :style="{width:'320px'}" placeholder="商品衣诚" allow-clear>
      <template #prefix>
        <icon-user />
      </template>
    </fk-input>
    <fk-input :style="{width:'320px'}" placeholder="商品衣诚" allow-clear>
      <template #suffix>
        <icon-info-circle />
      </template>
    </fk-input>
  </fk-space>
</template>
```
