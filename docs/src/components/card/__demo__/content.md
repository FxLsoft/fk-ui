```yaml
title:
  zh-CN: 简洁卡片
  en-US: Only Content
```


卡片可以只有内容区域。

---


```vue { "component": true } 
<template>
  <fk-card hoverable :style="{ width: '360px', marginBottom: '20px' }">
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }"
    >
      <span
        :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
      >
        <fk-avatar
          :style="{ marginRight: '8px', backgroundColor: '#165DFF' }"
          :size="28"
        >
          A
        </fk-avatar>
        <fk-typography-text>Username</fk-typography-text>
      </span>
      <fk-link>More</fk-link>
    </div>
  </fk-card>
</template>
```
