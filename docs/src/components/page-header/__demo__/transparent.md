```yaml
title:
  zh-CN: 透明底色
  en-US: Transparent
```


默认是没有底色的，如果有需要可以通过`style`或类名设置不同底色。

---


```vue { "component": true } 
<template>
  <div
:style="{
    backgroundImage: 'radial-gradient(var(--color-fill-3) 1px, rgba(0, 0, 0, 0) 1px)',
    backgroundSize: '16px 16px',
    padding: '28px',
  }">
    <fk-page-header title="AaaaDesign" subtitle="AaaaDesign Vue 2.0">
      <template #breadcrumb>
        <fk-breadcrumb>
          <fk-breadcrumb-item>Home</fk-breadcrumb-item>
          <fk-breadcrumb-item>Channel</fk-breadcrumb-item>
          <fk-breadcrumb-item>News</fk-breadcrumb-item>
        </fk-breadcrumb>
      </template>
      <template #extra>
        <fk-radio-group type="button">
          <fk-radio value="mini">Mini</fk-radio>
          <fk-radio value="small">Small</fk-radio>
          <fk-radio value="large">Large</fk-radio>
        </fk-radio-group>
      </template>
    </fk-page-header>
  </div>
</template>
```
