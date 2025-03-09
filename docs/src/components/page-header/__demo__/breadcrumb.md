```yaml
title:
  zh-CN: 带有面包屑
  en-US: Breadcrumb
```


在页头中展示面包屑。

---


```vue { "component": true } 
<template>
  <div :style="{ background: 'var(--color-fill-2)', padding: '28px' }" >
    <fk-page-header
      :style="{ background: 'var(--color-bg-2)' }"
      title="AaaaDesign"
      subtitle="AaaaDesign Vue 2.0"
      :show-back="false"
    >
      <template #breadcrumb>
        <fk-breadcrumb>
          <fk-breadcrumb-item>Home</fk-breadcrumb-item>
          <fk-breadcrumb-item>Channel</fk-breadcrumb-item>
          <fk-breadcrumb-item>News</fk-breadcrumb-item>
        </fk-breadcrumb>
      </template>
      <template #extra>
        <fk-radio-group type="button" default-value="large">
          <fk-radio value="mini">Mini</fk-radio>
          <fk-radio value="small">Small</fk-radio>
          <fk-radio value="large">Large</fk-radio>
        </fk-radio-group>
      </template>
    </fk-page-header>
  </div>
</template>

```
