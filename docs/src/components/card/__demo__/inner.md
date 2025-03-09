```yaml
title:
  zh-CN: 内部卡片
  en-US: Inner Card
```


卡片中可以嵌套其他卡片组件。

---


```vue { "component": true } 
<template>
  <fk-card title="Aaaa Card">
    <fk-card :style="{ marginBottom: '20px' }" title="Inner Card Title">
      <template #extra>
        <fk-link>More</fk-link>
      </template>
      Inner Card Content
    </fk-card>
    <fk-card title="Inner Card Title">
      <template #extra>
        <fk-link>More</fk-link>
      </template>
      Inner Card Content
    </fk-card>
  </fk-card>
</template>
```
