```yaml
title:
  zh-CN: 悬浮菜单
  en-US: Floating Menu
```


指定 `mode` 为 `pop` 可以使用悬浮菜单。

---


```vue { "component": true } 
<template>
  <div class="menu-demo">
    <fk-menu mode="pop" show-collapse-button>
      <fk-menu-item key="1">
        <template #icon><icon-apps/></template>
        Navigation 1
      </fk-menu-item>
      <fk-sub-menu key="2">
        <template #icon><icon-bug/></template>
        <template #title>Navigation 2</template>
        <fk-menu-item key="2_0">Beijing</fk-menu-item>
        <fk-menu-item key="2_1">Shanghai</fk-menu-item>
        <fk-menu-item key="2_2">Guangzhou</fk-menu-item>
      </fk-sub-menu>
      <fk-sub-menu key="3">
        <template #icon><icon-bulb/></template>
        <template #title>Navigation 3</template>
        <fk-menu-item key="3_0">Wuhan</fk-menu-item>
        <fk-menu-item key="3_1">Chengdu</fk-menu-item>
      </fk-sub-menu>
      <fk-menu-item key="4">
        <template #icon><icon-safe/></template>
        Navigation 4
      </fk-menu-item>
      <fk-menu-item key="5">
        <template #icon><icon-fire/></template>
        Navigation 5
      </fk-menu-item>
    </fk-menu>
  </div>
</template>
<script>
import {
  IconApps,
  IconBug,
  IconBulb,
} from '@erp/common';

export default {
  components: {
    IconApps,
    IconBug,
    IconBulb,
  },
};
</script>
<style scoped>
.menu-demo {
  width: 100%;
  height: 600px;
  padding: 40px;
  box-sizing: border-box;
  background-color: var(--color-neutral-2);
}

.menu-demo .fk-menu {
  width: 200px;
  height: 100%;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}

.menu-demo .fk-menu :deep(.fk-menu-collapse-button) {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.menu-demo .fk-menu:not(.fk-menu-collapsed) :deep(.fk-menu-collapse-button) {
  right: 0;
  bottom: 8px;
  transform: translateX(50%);
}

.menu-demo .fk-menu:not(.fk-menu-collapsed)::before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 48px;
  height: 48px;
  background-color: inherit;
  border-radius: 50%;
  box-shadow: -4px 0 2px var(--color-bg-2), 0 0 1px rgba(0, 0, 0, 0.3);
  transform: translateX(50%);
}

.menu-demo .fk-menu.fk-menu-collapsed {
  width: 48px;
  height: auto;
  padding-top: 24px;
  padding-bottom: 138px;
  border-radius: 22px;
}

.menu-demo .fk-menu.fk-menu-collapsed :deep(.fk-menu-collapse-button) {
  right: 8px;
  bottom: 8px;
}
</style>
```
