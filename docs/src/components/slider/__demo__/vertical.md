```yaml
title:
  zh-CN: 竖直滑动条
  en-US: Vertical Slider
```


设置 `direction="vertical"` ，将会显示竖直的滑动条。

---


```vue { "component": true } 
<template>
  <fk-space align="start">
    <fk-slider
      :default-value="50"
      direction="vertical"
    />

    <fk-slider
      direction="vertical"
      :default-value="5"
      :style="{ width: '300px' }"
      :max="15"
      :marks="{
        5: '5km',
        10: '10km',
      }"
    />
  </fk-space>
</template>
```
