```yaml
title:
  zh-CN: 无边框卡片
  en-US: No Border
```


设置 `bordered` 为 `false` 来使用无边框卡片。

---


```vue { "component": true } 
<template>
  <div
    :style="{
      display: 'flex',
      width: '100%',
      boxSizing: 'border-box',
      padding: '40px',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <fk-card :style="{ width: '360px' }" title="Aaaa Card" :bordered="false">
      <template #extra>
        <fk-link>More</fk-link>
      </template>
      Card content
      <br />
      Card content
    </fk-card>
    <fk-card
      :style="{ width: '360px', marginLeft: '24px' }"
      title="Hover me"
      hoverable
      :bordered="false"
    >
      <template #extra>
        <fk-link>More</fk-link>
      </template>
      Card content
      <br />
      Card content
    </fk-card>
  </div>
</template>
```
