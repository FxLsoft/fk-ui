```yaml
title:
  zh-CN: 不同大小菜单
  en-US: Custom Size
```


通过 `style` 自由指定菜单的宽度和菜单项的高度。

---


```vue { "component": true } 
<template>
  <div class="menu-demo">
    <fk-slider
      v-model="width"
      :style="{ width: '320px', marginBottom: '24px' }"
      :step="10"
      :min="160"
      :max="400"
    />
    <fk-menu
      show-collapse-button
      :default-open-keys="['0']"
      :default-selected-keys="['0_1']"
      :style="{ width: `${width}px`, height: 'calc(100% - 28px)' }"
    >
      <fk-sub-menu key="0">
        <template #icon><IconApps/></template>
        <template #title>Navigation 1</template>
        <fk-menu-item key="0_0">Menu 1</fk-menu-item>
        <fk-menu-item key="0_1">Menu 2</fk-menu-item>
        <fk-menu-item key="0_2" disabled>
          Menu 3
        </fk-menu-item>
      </fk-sub-menu>
      <fk-sub-menu key="1">
        <template #icon><IconBug/></template>
        <template #title>Navigation 2</template>
        <fk-menu-item key="1_0">Menu 1</fk-menu-item>
        <fk-menu-item key="1_1">Menu 2</fk-menu-item>
        <fk-menu-item key="1_2">Menu 3</fk-menu-item>
      </fk-sub-menu>
      <fk-sub-menu key="2">
        <template #icon><IconBulb/></template>
        <template #title>Navigation 3</template>
        <fk-menu-item key="2_0">Menu 1</fk-menu-item>
        <fk-menu-item key="2_1">Menu 2</fk-menu-item>
        <fk-menu-item key="2_2">Menu 3</fk-menu-item>
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
} from '@erp/common';

export default {
  components: {
    IconMenuFold,
    IconMenuUnfold,
    IconApps,
    IconBug,
    IconBulb,
  },
  data() {
    return {
      width: 240
    }
  }
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
</style>
```
