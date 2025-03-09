```yaml
title:
  zh-CN: 四种尺寸
  en-US: Size
```


设置 `size` 可以使用四种尺寸（`mini`, `small`, `medium`, `large`）的数字输入框。高度分别对应`24px`、`28px`、`32px`、`36px`。

---

```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-input-number :style="{width:'320px'}" placeholder="Please Enter" size="large" class="input-demo" />
    <fk-input-number :style="{width:'320px'}" placeholder="Please Enter" mode="button" size="large" class="input-demo" />
  </fk-space>
</template>
```
