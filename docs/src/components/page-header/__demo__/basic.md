```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


基础页头，适合使用在需要简单描述的场景。默认是没有底色的。

---


```vue { "component": true } 
<template>
  <div :style="{ background: 'var(--color-fill-2)', padding: '28px' }" >
    <fk-page-header
      :style="{ background: 'var(--color-bg-2)' }"
      title="AaaaDesign"
      subtitle="AaaaDesign Vue 2.0"
    >
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
