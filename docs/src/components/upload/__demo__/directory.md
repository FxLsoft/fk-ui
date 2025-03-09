```yaml
title:
  zh-CN: 文件夹上传
  en-US: Upload directory
```


可以通过 `directory` 开启文件夹上传

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" :style="{ width: '100%' }">
    <fk-upload action="/" directory />
  </fk-space>
</template>
```
