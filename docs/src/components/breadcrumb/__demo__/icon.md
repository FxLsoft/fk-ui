```yaml
title:
  zh-CN: 自定义图标
  en-US: Custom Icon
```


可以在内容中使用自定义图标。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical">
    <fk-breadcrumb>
      <fk-breadcrumb-item>
        <icon-home/>
      </fk-breadcrumb-item>
      <fk-breadcrumb-item>Channel</fk-breadcrumb-item>
      <fk-breadcrumb-item>News</fk-breadcrumb-item>
    </fk-breadcrumb>
     <fk-breadcrumb>
      <fk-breadcrumb-item>
        <icon-home/>
      </fk-breadcrumb-item>
      <fk-breadcrumb-item>
        <icon-at />
        Channel
      </fk-breadcrumb-item>
      <fk-breadcrumb-item>News</fk-breadcrumb-item>
    </fk-breadcrumb>
  </fk-space>
</template>
```
