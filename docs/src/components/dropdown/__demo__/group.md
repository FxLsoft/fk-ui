```yaml
title:
  zh-CN: 分组选项
  en-US: Group
```

通过 `<dgroup>` 组件使用分组选项。

---

```vue { "component": true }
<template>
  <fk-dropdown>
    <fk-button>Click Me</fk-button>
    <template #content>
      <fk-dgroup title="Group 1">
        <fk-doption>Option 1</fk-doption>
        <fk-doption>Option 2</fk-doption>
        <fk-doption>Option 3</fk-doption>
      </fk-dgroup>
      <fk-dgroup title="Group 2">
        <fk-doption>Option 4</fk-doption>
        <fk-doption>Option 5</fk-doption>
        <fk-doption>Option 6</fk-doption>
      </fk-dgroup>
    </template>
  </fk-dropdown>
</template>
```
