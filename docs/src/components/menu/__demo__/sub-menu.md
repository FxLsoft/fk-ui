```yaml
title:
  zh-CN: 内嵌菜单
  en-US: Sub Menu
```


菜单内可以嵌入多个子项，通过 `openKeys` 可以设置默认打开的子项。

---


```vue { "component": true } 
<template>
  <div class="menu-demo">
    <fk-menu
      :style="{ width: '200px', height: '100%' }"
      :default-open-keys="['0']"
      :default-selected-keys="['0_1']"
      show-collapse-button
    >
    <fk-menu-item key="0_0_0" datfk-obj="1">Menu 1</fk-menu-item>
      <fk-sub-menu autoFitPopupWidth key="0" fitPopupWithElement="#menu">
        <template #icon><icon-apps/></template>
        <template #title>Navigation 1</template>
        <fk-menu-item key="0_0">Menu 1</fk-menu-item>
        <fk-menu-item key="0_1">Menu 2</fk-menu-item>
        <fk-menu-item key="0_2" disabled>Menu 3</fk-menu-item>
      </fk-sub-menu>
      <fk-sub-menu autoFitPopupWidth key="1" fitPopupWithElement="#menu">
        <template #icon><icon-bug/></template>
        <template #title>Navigation 2</template>
        <fk-menu-item key="1_0">Menu 1</fk-menu-item>
        <fk-menu-item key="1_1">Menu 2</fk-menu-item>
        <fk-menu-item key="1_2">Menu 3</fk-menu-item>
      </fk-sub-menu>
      <fk-sub-menu key="2" fitPopupWithElement="#menu">
        <template #icon><icon-bulb/></template>
        <template #title>Navigation 3</template>
        <fk-menu-item-group>
          <template #title>
            常用
            <fk-button type="text">管理</fk-button>
          </template>
          <fk-menu-item class="menu-item-wrap" key="2_0">
            Menu 1
            <template #suffix><IconPushpin /></template>
          </fk-menu-item>
          <fk-menu-item key="2_1">Menu 2</fk-menu-item>
        </fk-menu-item-group>
        <fk-menu-item-group title="Menu Group 2">
          <fk-menu-item key="2_2">Menu 3 <IconPushpin /></fk-menu-item>
          <fk-menu-item key="2_3">Menu 4</fk-menu-item>
        </fk-menu-item-group>
      </fk-sub-menu>
    </fk-menu>
  </div>
</template>
<script>
import {
  IconApps,
  IconBug,
  IconBulb,
  IconMenuFold,
  IconMenuUnfold,
  IconPushpin,
} from '@erp/common';

export default {
  components: {
    IconPushpin,
    IconMenuFold,
    IconMenuUnfold,
    IconApps,
    IconBug,
    IconBulb,
  },
};
</script>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  height: 600px;
  padding: 40px;
  background-color: var(--color-neutral-2);
}
.menu-item {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}
:deep(.fk-menu-popup-wrapper) {
  height: 100%;
}
</style>
```
