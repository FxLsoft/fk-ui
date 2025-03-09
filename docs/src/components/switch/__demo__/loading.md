```yaml
title:
  zh-CN: 加载中状态
  en-US: Loading
```


通过设置 `loading` 使开关处于加载中状态，此时开关不可点击。

---


```vue { "component": true } 
<template>
  <fk-space size="large">
    <fk-switch loading />
    <fk-switch type="round" loading />
    <fk-switch type="line" loading />
  </fk-space>
</template>
```
