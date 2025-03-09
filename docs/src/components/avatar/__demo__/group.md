```yaml
title:
  zh-CN: 头像组
  en-US: Group
```


使用 `Avatar.Group` 可以使用头像组功能，可通过 `size` 指定头像的大小。

---


```vue { "component": true } 
<template>
  <fk-space :size="32">
    <fk-avatar-group>
      <fk-avatar :style="{ backgroundColor: '#7BC616' }">A</fk-avatar>
      <fk-avatar :style="{ backgroundColor: '#14C9C9' }">B</fk-avatar>
      <fk-avatar :style="{ backgroundColor: '#168CFF' }">C</fk-avatar>
      <fk-avatar :style="{ backgroundColor: '#FF7D00' }">AAAA</fk-avatar>
      <fk-avatar :style="{ backgroundColor: '#FFC72E' }">Design</fk-avatar>
    </fk-avatar-group>

    <fk-avatar-group :size="24">
      <fk-avatar :style="{ backgroundColor: '#7BC616' }">A</fk-avatar>
      <fk-avatar :style="{ backgroundColor: '#14C9C9' }">B</fk-avatar>
      <fk-avatar :style="{ backgroundColor: '#168CFF' }">C</fk-avatar>
      <fk-avatar :style="{ backgroundColor: '#FF7D00' }">Aaaa</fk-avatar>
      <fk-avatar :style="{ backgroundColor: '#FFC72E' }">Design</fk-avatar>
    </fk-avatar-group>

    <fk-avatar-group :size="24" :max-count="3">
      <fk-avatar :style="{ backgroundColor: '#7BC616' }">A</fk-avatar>
      <fk-avatar :style="{ backgroundColor: '#14C9C9' }">B</fk-avatar>
      <fk-avatar :style="{ backgroundColor: '#168CFF' }">C</fk-avatar>
      <fk-avatar :style="{ backgroundColor: '#FF7D00' }">Aaaa</fk-avatar>
      <fk-avatar :style="{ backgroundColor: '#FFC72E' }">Design</fk-avatar>
    </fk-avatar-group>
  </fk-space>
</template>
```
