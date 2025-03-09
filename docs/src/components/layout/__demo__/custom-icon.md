```yaml
title:
  zh-CN: 自定义按钮 Icon
  en-US: Customize Button Icon
```


通过设置 `Menu.Sider` 的 `trigger` 属性，实现自定义收起按钮的图标。

---


```vue { "component": true } 
<template>
  <fk-layout class="layout-demo">
    <fk-layout-sider collapsible breakpoint="xl">
      <div class="logo" />
      <fk-menu
        :default-open-keys="['1']"
        :default-selected-keys="['0_3']"
        :style="{ width: '100%' }"
        @menu-item-click="onClickMenuItem"
      >
        <fk-menu-item key="0_1" disabled>
          <IconHome/>
          Menu 1
        </fk-menu-item>
        <fk-menu-item key="0_2">
          <IconCalendar/>
          Menu 2
        </fk-menu-item>
        <fk-menu-item key="0_3">
          <IconCalendar/>
          Menu 3
        </fk-menu-item>
        <fk-sub-menu key="1">
          <template #title>
            <IconCalendar/> Navigation 1
          </template>
          <fk-menu-item key="1_1">Menu 1</fk-menu-item>
          <fk-menu-item key="1_2">Menu 2</fk-menu-item>
          <fk-sub-menu key="2" title="Navigation 2">
            <fk-menu-item key="2_1">Menu 1</fk-menu-item>
            <fk-menu-item key="2_2">Menu 2</fk-menu-item>
          </fk-sub-menu>
          <fk-sub-menu key="3" title="Navigation 3">
            <fk-menu-item key="3_1">Menu 1</fk-menu-item>
            <fk-menu-item key="3_2">Menu 2</fk-menu-item>
            <fk-menu-item key="3_3">Menu 3</fk-menu-item>
          </fk-sub-menu>
        </fk-sub-menu>
        <fk-sub-menu key="4">
          <template #title>
            <IconCalendar/> Navigation 4
          </template>
          <fk-menu-item key="4_1">Menu 1</fk-menu-item>
          <fk-menu-item key="4_2">Menu 2</fk-menu-item>
          <fk-menu-item key="4_3">Menu 3</fk-menu-item>
        </fk-sub-menu>
      </fk-menu>
      <!-- trigger -->
      <template #trigger="{ collapsed }">
        <IconCaretRight v-if="collapsed"/>
        <IconCaretLeft v-else/>
      </template>
    </fk-layout-sider>
    <fk-layout>
      <fk-layout-header style="padding-left: 20px;">
        Header
      </fk-layout-header >
      <fk-layout style="padding: 0 24px;">
        <fk-breadcrumb :style="{ margin: '16px 0' }">
          <fk-breadcrumb-item>Home</fk-breadcrumb-item>
          <fk-breadcrumb-item>List</fk-breadcrumb-item>
          <fk-breadcrumb-item>App</fk-breadcrumb-item>
        </fk-breadcrumb>
        <fk-layout-content>Content</fk-layout-content>
        <fk-layout-footer>Footer</fk-layout-footer>
      </fk-layout>
    </fk-layout>
  </fk-layout>
</template>
<script>
import { defineComponent } from 'vue';
import { IconCalendar,
  IconCaretLeft,
  IconCaretRight,
  IconHome,
  Message,
} from '@erp/common';

export default defineComponent({
  components: {
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconCalendar,
  },
  methods: {
    onClickMenuItem(key) {
      Message.info({ content: `You select ${key}`, showIcon: true });
    }
  }
});
</script>
<style scoped>
.layout-demo {
  height: 500px;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}
.layout-demo :deep(.fk-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}
.layout-demo :deep(.fk-layout-sider-light) .logo{
  background: var(--color-fill-2);
}
.layout-demo :deep(.fk-layout-header)  {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.fk-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}
.layout-demo :deep(.fk-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.fk-layout-footer),
.layout-demo :deep(.fk-layout-content)  {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>
```
