```yaml
title:
  zh-CN: 展开图标
  en-US: Custom expand icon
```


为展开项自定义展开图标

---


```vue { "component": true } 
<template>
  <fk-collapse :default-active-key="['1', 2]">
    <template #expand-icon="{ active }">
      <icon-face-smile-fill v-if="active"/>
      <icon-face-frown-fill v-else/>
    </template>
    <fk-collapse-item key="1" header="Aaaa Technology Co., Ltd.">
      <template #expand-icon="{ active }">
        <icon-double-down v-if="active"/>
        <icon-double-right v-else/>
      </template>
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
    <fk-collapse-item :key="2" header="Aaaa Technology Co., Ltd.">
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
    <fk-collapse-item key="3" header="Aaaa Technology Co., Ltd.">
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
  </fk-collapse>
</template>
```
