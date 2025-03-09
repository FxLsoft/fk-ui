```yaml
title:
  zh-CN: 悬浮按钮菜单
  en-US: Floating Button Menu
```


指定 `mode` 为 `popButton` 使用按钮组样式的悬浮菜单。

---


```vue { "component": true } 
<template>
  <div class="menu-demo">
    <fk-trigger
      v-model:popupVisible="popupVisible1"
      :trigger="['click', 'hover']"
      click-to-close
      position="top"
    >
      <div :class="`button-trigger ${popupVisible1 ? 'button-trigger-active' : ''}`">
        <IconClose v-if="popupVisible1" />
        <IconMessage v-else />
      </div>
      <template #content>
        <fk-menu
          :style="{ marginBottom: '-4px' }"
          mode="popButton"
          :tooltip-props="{ position: 'left' }"
          show-collapse-button
        >
          <fk-menu-item key="1">
            <template #icon><IconBug/></template>
            Bugs
          </fk-menu-item>
          <fk-menu-item key="2">
            <template #icon><IconBulb/></template>
            Ideas
          </fk-menu-item>
        </fk-menu>
      </template>
    </fk-trigger>

    <fk-trigger
      v-model:popupVisible="popupVisible2"
      :trigger="['click', 'hover']"
      click-to-close
      position="top"
    >
      <div :class="`button-trigger ${popupVisible2 ? 'button-trigger-active' : ''}`">
        <IconClose v-if="popupVisible2" />
        <IconMessage v-else />
      </div>
      <template #content>
        <fk-menu
          :style="{ marginBottom: '-4px' }"
          mode="popButton"
          :tooltip-props="{ position: 'left' }"
          show-collapse-button
        >
          <fk-menu-item key="1">
            <template #icon><IconBug/></template>
            Bugs
          </fk-menu-item>
          <fk-menu-item key="2">
            <template #icon><IconBulb/></template>
            Ideas
          </fk-menu-item>
        </fk-menu>
      </template>
    </fk-trigger>
  </div>
</template>
<script>
import {
  IconBug,
  IconBulb,
  IconClose,
  IconMessage,
} from '@erp/common';

export default {
  components: {
    IconBug,
    IconBulb,
    IconClose,
    IconMessage,
  },
  data() {
    return {
      popupVisible1: false,
      popupVisible2: false,
    };
  }
};
</script>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 660px;
  height: 300px;
  padding: 40px;
  background-color: var(--color-fill-2);
  position: relative;
}
.button-trigger {
  position: absolute;
  bottom: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-white);
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s;
}
/* button left */
.button-trigger:nth-child(1) {
  left: 150px;
  background-color: var(--color-neutral-5);
}
.button-trigger:nth-child(1).button-trigger-active {
  background-color: var(--color-neutral-4);
}
/* button right */
.button-trigger:nth-child(2) {
  left: 372px;
  background-color: rgb(var(--fkblue-6));
}
.button-trigger:nth-child(3).button-trigger-active {
  background-color: var(--color-primary-light-4);
}
</style>
```
