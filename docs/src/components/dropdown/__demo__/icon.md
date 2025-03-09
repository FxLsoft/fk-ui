```yaml
title:
  zh-CN: 带图标的选项
  en-US: Icon Options
```

通过 `icon` 插槽在选项前添加图标。

---

```vue { "component": true }
<template>
  <fk-dropdown>
    <fk-button>Click Me</fk-button>
    <template #content>
      <fk-doption>
        <template #icon>
          <icon-location />
        </template>
        <template #default>Option 1</template>
      </fk-doption>
      <fk-doption>
        <template #icon>
          <icon-location />
        </template>
        <template #default>Option 2</template>
      </fk-doption>
      <fk-doption>
        <template #icon>
          <icon-location />
        </template>
        <template #default>Option 3</template>
      </fk-doption>
    </template>
  </fk-dropdown>
</template>
```
