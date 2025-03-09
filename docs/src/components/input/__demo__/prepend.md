```yaml
title:
  zh-CN: 前置、后置标签
  en-US: Prepend & Append
```


通过指定 `prepend` 和 `append` 插槽在输入框前后添加元素。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-input :style="{width:'320px'}" placeholder="商品衣诚" allow-clear>
      <template #prepend>
        +86
      </template>
    </fk-input>
    <fk-input :style="{width:'320px'}" placeholder="商品衣诚" allow-clear>
      <template #append>
        RMB
      </template>
    </fk-input>
  </fk-space>
</template>
```
