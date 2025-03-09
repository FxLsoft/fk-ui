```yaml
title:
  zh-CN: 按钮尺寸
  en-US: Button Size
```


按钮分为 `mini`、`small`、`medium`、`large` 四种尺寸。高度分别为：`24px`、`28px`、`32px`、`36px`。推荐（默认）尺寸为 `medium`。可在不同场景及不同业务需求选择适合尺寸。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-button type="primary" size="mini">Mini</fk-button>
    <fk-button type="primary" size="small">Small</fk-button>
    <fk-button type="primary">Medium</fk-button>
    <fk-button type="primary" size="large">Large</fk-button>
  </fk-space>
</template>
```
