```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


标签的基本用法

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-tag>Default</fk-tag>
    <fk-tag>Tag 1</fk-tag>
    <fk-tag>Tag 2</fk-tag>
    <fk-tag>
      <template #icon>
        <icon-check-circle-fill />
      </template>
      Complete
    </fk-tag>
  </fk-space>
</template>
```
