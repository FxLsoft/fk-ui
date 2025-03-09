```yaml
title:
  zh-CN: 大小和形状
  en-US: Size
```


通过设置 `size` 字段，可以调节头像的大小，默认大小为 `40px`。设置 `shape` 字段，可以设置头像是圆形 (circle) 还是正方形 (square)。

---


```vue { "component": true } 
<template>
  <fk-space size="large" direction="vertical">
    <fk-space size="large">
      <fk-avatar :size="64">AAAA</fk-avatar>
      <fk-avatar :size="40">AAAA</fk-avatar>
      <fk-avatar :size="32">AAAA</fk-avatar>
      <fk-avatar :size="24">AAAA</fk-avatar>
    </fk-space>
    <fk-space size="large">
      <fk-avatar :size="64" shape="square">AAAA</fk-avatar>
      <fk-avatar :size="40" shape="square">AAAA</fk-avatar>
      <fk-avatar :size="32" shape="square">AAAA</fk-avatar>
      <fk-avatar :size="24" shape="square">AAAA</fk-avatar>
    </fk-space>
  </fk-space>
</template>
```
