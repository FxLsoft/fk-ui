```yaml
title:
  zh-CN: 步骤进度条
  en-US: Steps Progress
```


通过设置 `steps` 展示步骤进度条。

---


```vue { "component": true } 
<template>
  <div :style="{ width: '50%' }">
    <fk-progress :steps="3" :percent="0.3" />
    <fk-progress :steps="5" status="warning" :percent="1" />
    <fk-progress :steps="3" size="small" :percent="0.3" />
  </div>
</template>
```
