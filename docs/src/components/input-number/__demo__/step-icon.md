```yaml
title:
  zh-CN: 自定义图标
  en-US: Step Icon
```


通过指定 `plus` 和 `minus` 插槽来修改数值增减操作的图标。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-input-number :style="{width:'320px'}" placeholder="商品衣诚" allow-clear>
       <template #plus>
        <icon-plus />
      </template>
      <template #minus>
        <icon-minus />
      </template>
    </fk-input-number>
  </fk-space>
</template>
```
