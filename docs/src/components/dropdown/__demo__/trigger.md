```yaml
title:
  zh-CN: 触发方式
  en-US: Trigger
```

通过 `trigger` 指定触发方式。

---

```vue { "component": true }
<template>
  <fk-space size="large">
    <fk-dropdown>
      <fk-button>Click Me</fk-button>
      <template #content>
        <fk-doption>Option 1</fk-doption>
        <fk-doption>Option 2</fk-doption>
        <fk-doption>Option 3</fk-doption>
      </template>
    </fk-dropdown>
    <fk-dropdown trigger="hover">
      <fk-button>Hover Me</fk-button>
      <template #content>
        <fk-doption>Option 1</fk-doption>
        <fk-doption>Option 2</fk-doption>
        <fk-doption>Option 3</fk-doption>
      </template>
    </fk-dropdown>
  </fk-space>
</template>
```
