```yaml
title:
  zh-CN: 可选中
  en-US: Checkable
```


通过设置 `checkable` ，可以实现点击选中的效果。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-tag checkable>Awesome</fk-tag>
    <fk-tag checkable color="red" :default-checked="true">Aaaa</fk-tag>
    <fk-tag checkable color="fkblue" :default-checked="true">Aaaa</fk-tag>
  </fk-space>
</template>
```
