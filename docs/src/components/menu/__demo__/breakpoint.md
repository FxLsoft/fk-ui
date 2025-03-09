```yaml
title:
  zh-CN: 响应式收缩
  en-US: Responsive collapsed
```


设置 `breakpoint` 可触发响应式收缩。

---


```vue { "component": true } 
<template>
  <div class="menu-demo">
    <fk-menu
      :style="{ height: '160px' }"
      :collapsed="true"
      id="menu-demo-1"
    >
      <fk-sub-menu key="0" :getTarget="getTarget">
        <template #icon><icon-apps/></template>
        <template #title>订单1</template>
        <fk-menu-item key="0_0">Menu 1</fk-menu-item>
        <fk-menu-item key="0_1">Menu 2</fk-menu-item>
        <fk-menu-item key="0_2">Menu 3</fk-menu-item>
        <fk-menu-item key="0_3">Menu 4</fk-menu-item>
        <fk-menu-item key="0_4">Menu 5</fk-menu-item>
        <fk-menu-item key="0_5">Menu 6</fk-menu-item>
        <fk-menu-item key="0_6">Menu 7</fk-menu-item>
        <fk-menu-item key="0_7">Menu 8</fk-menu-item>
      </fk-sub-menu>
      <fk-sub-menu key="1" :getTarget="getTarget">
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
import { Message } from '@erp/common';
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
    return {
      onCollapse(val, type) {
        const content = type === 'responsive' ? '触发响应式收缩' : '点击触发收缩';
        Message.info({
          content,
          duration: 2000,
        });
      },
      getTarget() {
        return document.querySelector('#menu-demo-1');
      }
    };
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
