```yaml
title:
  zh-CN: 栅格卡片
  en-US: With Row
```


在系统概览页面常常和栅格进行配合。

---


```vue { "component": true } 
<template>
  <div
    :style="{
      boxSizing: 'border-box',
      width: '100%',
      padding: '40px',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <fk-row :gutter="20" :style="{ marginBottom: '20px' }">
      <fk-col :span="8">
        <fk-card title="Aaaa Card" :bordered="false" :style="{ width: '100%' }">
          <template #extra>
            <fk-link>More</fk-link>
          </template>
          Card content
        </fk-card>
      </fk-col>
      <fk-col :span="8">
        <fk-card title="Aaaa Card" :bordered="false" :style="{ width: '100%' }">
          <template #extra>
            <fk-link>More</fk-link>
          </template>
          Card content
        </fk-card>
      </fk-col>
      <fk-col :span="8">
        <fk-card title="Aaaa Card" :bordered="false" :style="{ width: '100%' }">
          <template #extra>
            <fk-link>More</fk-link>
          </template>
          Card content
        </fk-card>
      </fk-col>
    </fk-row>
    <fk-row :gutter="20">
      <fk-col :span="16">
        <fk-card title="Aaaa Card" :bordered="false" :style="{ width: '100%' }">
          <template #extra>
            <fk-link>More</fk-link>
          </template>
          Card content
        </fk-card>
      </fk-col>
      <fk-col :span="8">
        <fk-card title="Aaaa Card" :bordered="false" :style="{ width: '100%' }">
          <template #extra>
            <fk-link>More</fk-link>
          </template>
          Card content
        </fk-card>
      </fk-col>
    </fk-row>
  </div>
</template>
```
