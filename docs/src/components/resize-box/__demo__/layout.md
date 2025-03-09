```yaml
title:
  zh-CN: 在布局中使用
  en-US: Use in Layout
```


[Layout](/react/components/ResizeBox) 组件中集成了 `ResizeBox` 组件，可以在 Layout 中使用可伸缩的侧边栏。

---


```vue { "component": true } 
<template>
<div class="layout-demo">
  <fk-layout>
    <fk-layout-header>Header</fk-layout-header>
    <fk-layout>
      <fk-layout-sider :resize-directions="['right']">
        Sider
      </fk-layout-sider>
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
  min-width: 150px;
  max-width: 500px;
  height: 200px;
}

.layout-demo :deep(.fk-layout-content) {
  background-color: rgb(var(--fkblue-6));
}
</style>
```
