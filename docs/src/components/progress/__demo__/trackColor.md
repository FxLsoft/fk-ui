```yaml
title:
  zh-CN: 剩余进度条的颜色
  en-US: trackColor
```


可以通过 trackColor 设置剩余进度条的颜色

---


```vue { "component": true } 
<template>
  <div :style="{ width: '50%' }">
    <fk-progress
      :percent="0.4"
      track-color="var(--color-primary-light-1)"
      style="margin-bottom: 20px;"
    />
    <fk-progress
      :percent="0.4"
      :steps="4"
      track-color="var(--color-primary-light-1)"
      style="margin-bottom: 20px;"
    />
    <fk-progress
      :percent="0.4"
      type="circle"
      track-color="var(--color-primary-light-1)"
      style="margin-bottom: 20px;"
    />
  </div>
</template>
```
