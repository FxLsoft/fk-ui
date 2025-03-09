```yaml
title:
  zh-CN: 缩起内嵌菜单
  en-US: Collapsed Menu
```


通过 `collapsed` 来指定菜单收起。

---


```vue { "component": true } 
<template>
  <div class="menu-demo">
    <fk-button
      :style="{ padding: '0 12px', height: '30px', lineHeight: '30px', marginBottom: '4px' }"
      type="primary"
      @click="toggleCollapse"
    >
      <icon-menu-unfold v-if="collapsed" />
      <icon-menu-fold v-else />
    </fk-button>
    <fk-menu
      :style="{ width: '200px', borderRadius: '4px' }"
      theme="dark"
      :collapsed="collapsed"
      :default-open-keys="['0']"
      :default-selected-keys="['0_2']"
    >
      <fk-sub-menu key="0">
        <template #icon><icon-apps/></template>
        <template #title>Navigation 1</template>
        <fk-menu-item key="0_0">Menu 1</fk-menu-item>
        <fk-menu-item key="0_1">Menu 2</fk-menu-item>
        <fk-menu-item key="0_2">Menu 3</fk-menu-item>
        <fk-menu-item key="0_3">Menu 4</fk-menu-item>
      </fk-sub-menu>
      <fk-sub-menu key="1">
        <template #icon><icon-bug/></template>
        <template #title>Navigation 2</template>
        <fk-menu-item key="1_0">Menu 1</fk-menu-item>
        <fk-menu-item key="1_1">Menu 2</fk-menu-item>
        <fk-menu-item key="1_2">Menu 3</fk-menu-item>
      </fk-sub-menu>
      <fk-sub-menu key="2">
        <template #icon><icon-bulb/></template>
        <template #title>Navigation 3</template>
        <fk-menu-item key="2_0">Menu 1</fk-menu-item>
        <fk-menu-item key="2_1">Menu 2</fk-menu-item>
        <fk-sub-menu key="2_2" title="Navigation 4">
          <fk-menu-item key="2_2_0">Menu 1</fk-menu-item>
          <fk-menu-item key="2_2_1">Menu 2</fk-menu-item>
        </fk-sub-menu>
      </fk-sub-menu>
    </fk-menu>
  </div>
</template>
<script>
import { ref } from 'vue';
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
  setup() {
    const collapsed = ref(false);
    return {
      collapsed,
      toggleCollapse: () => { collapsed.value = !collapsed.value; },
    }
  }
};
</script>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
  background-color: var(--color-neutral-2);
}
</style>
```
