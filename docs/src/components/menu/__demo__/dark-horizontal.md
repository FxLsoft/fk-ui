```yaml
title:
  zh-CN: 深色模式导航
  en-US: Dark Theme
```


通过 `theme` 指定主题，分为 `light` 和 `dark` 两种。

---


```vue { "component": true } 
<template>
  <div class="menu-demo">
    <fk-menu mode="horizontal" theme="dark" :default-selected-keys="['1']">
      <fk-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
        <div
          :style="{
            width: '80px',
            height: '30px',
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
