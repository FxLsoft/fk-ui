```yaml
title:
  zh-CN: 顶部导航菜单
  en-US: Horizontal
```


设置 `mode` 为 `horizontal` 时，使用水平菜单。

---


```vue { "component": true } 
<template>
  <div class="menu-demo">
    <fk-menu mode="horizontal" :default-selected-keys="['1']">
      <fk-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
        <div
          :style="{
            width: '80px',
            height: '30px',
            borderRadius: '2px',
            background: 'var(--color-fill-3)',
            cursor: 'text',
          }"
        />
      </fk-menu-item>
      <fk-menu-item key="1">Home</fk-menu-item>
      <fk-menu-item key="2">Solution</fk-menu-item>
      <fk-menu-item key="3">Cloud Service</fk-menu-item>
      <fk-menu-item key="4">Cooperation</fk-menu-item>
    </fk-menu>
  </div>
</template>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
  background-color: var(--color-neutral-2);
}
</style>
```
