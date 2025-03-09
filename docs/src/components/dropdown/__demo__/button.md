```yaml
title:
  zh-CN: 按钮下拉框
  en-US: Dropdown button
```

可以使用 `<dropdown-button>` 组件用来展示右边是额外相关功能菜单的按钮。

---

```vue { "component": true }
<template>
  <fk-space size="large">
    <fk-dropdown-button>
      Publish
      <template #content>
        <fk-doption>Save now</fk-doption>
        <fk-doption>Save and Publish</fk-doption>
      </template>
    </fk-dropdown-button>
    <fk-dropdown-button disabled>
      Disabled
      <template #content>
        <fk-doption>Save now</fk-doption>
        <fk-doption>Save and Publish</fk-doption>
      </template>
    </fk-dropdown-button>
    <fk-dropdown-button>
      Publish
      <template #icon>
        <icon-down />
      </template>
      <template #content>
        <fk-doption>Save now</fk-doption>
        <fk-doption>Save and Publish</fk-doption>
      </template>
    </fk-dropdown-button>
  </fk-space>

</template>

<style>
.fk-dropdown-open .fk-icon-down {
  transform: rotate(180deg);
}
</style>
```
