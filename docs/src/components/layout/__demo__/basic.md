```yaml
title:
  zh-CN: 基本用法
  en-US: Basic
```


典型的页面布局。

---


```vue { "component": true } 
<template>
  <div class="layout-demo">
    <fk-layout style="height: 400px;">
      <fk-layout-header>Header</fk-layout-header>
      <fk-layout-content>Content</fk-layout-content>
      <fk-layout-footer>Footer</fk-layout-footer>
    </fk-layout>
    <br />
    <fk-layout style="height: 400px;">
      <fk-layout-header>Header</fk-layout-header>
      <fk-layout>
        <fk-layout-sider theme="dark">Sider</fk-layout-sider>
        <fk-layout-content>Content</fk-layout-content>
      </fk-layout>
      <fk-layout-footer>Footer</fk-layout-footer>
    </fk-layout>
    <br />
    <fk-layout style="height: 400px;">
      <fk-layout-header>Header</fk-layout-header>
      <fk-layout>
        <fk-layout-content>Content</fk-layout-content>
        <fk-layout-sider>Sider</fk-layout-sider>
      </fk-layout>
      <fk-layout-footer>Footer</fk-layout-footer>
    </fk-layout>
    <br />
    <fk-layout style="height: 400px;">
      <fk-layout-header>Header</fk-layout-header>
      <fk-layout>
        <fk-layout-sider style="width: 64px;">Sider</fk-layout-sider>
        <fk-layout-sider style="width: 206px; margin-left: 1px;">Sider</fk-layout-sider>
        <fk-layout-content>Content</fk-layout-content>
      </fk-layout>
      <fk-layout-footer>Footer</fk-layout-footer>
    </fk-layout>
  </div>
</template>
<style scoped>
.layout-demo :deep(.fk-layout-header),
.layout-demo :deep(.fk-layout-footer),
.layout-demo :deep(.fk-layout-sider-children),
.layout-demo :deep(.fk-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}


.layout-demo :deep(.fk-layout-header),
.layout-demo :deep(.fk-layout-footer) {
  height: 64px;
  background-color: var(--color-primary-light-4);
}

.layout-demo :deep(.fk-layout-sider) {
  width: 206px;
  background-color: var(--color-primary-light-3);
}

.layout-demo :deep(.fk-layout-content) {
  background-color: rgb(var(--fkblue-6));
}
</style>
```
