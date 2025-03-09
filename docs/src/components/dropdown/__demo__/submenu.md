```yaml
title:
  zh-CN: 多级菜单
  en-US: Submenu
```

带有多级菜单的下拉框。

---

```vue { "component": true }
<template>
  <fk-dropdown>
    <fk-button>Click Me</fk-button>
    <template #content>
      <fk-doption>Option 1</fk-doption>
      <fk-dsubmenu value="option-1">
        <template #default>Option 2</template>
        <template #content>
          <fk-doption>Option 2-1</fk-doption>
          <fk-dsubmenu value="option-2-2" trigger="hover">
            <template #default>Option 2-2</template>
            <template #content>
              <fk-doption>Option 2-1</fk-doption>
              <fk-doption>Option 2-2</fk-doption>
              <fk-doption>Option 2-3</fk-doption>
            </template>
            <template #footer>
              <div style="padding: 6px; text-align: center;">
                <fk-button>Click</fk-button>
              </div>
            </template>
          </fk-dsubmenu>
          <fk-doption>Option 2-3</fk-doption>
        </template>
      </fk-dsubmenu>
      <fk-doption>Option 3</fk-doption>
    </template>
  </fk-dropdown>
</template>
```
