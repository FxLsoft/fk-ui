```yaml
title:
  zh-CN: 弹出方向
  en-US: Position
```

通过 `position` 支持指定 6 种弹出方位，分别是：top: 向上, tl: 左上, tr: 右上, bottom: 下方(默认), bl: 左下, br: 右下。

---

```vue { "component": true }
<template>
  <fk-space>
    <fk-dropdown position="bl">
      <fk-button>Bottom Left</fk-button>
      <template #content>
        <fk-doption>Option 1</fk-doption>
        <fk-doption>Option 2</fk-doption>
        <fk-doption>Option 3</fk-doption>
      </template>
    </fk-dropdown>
    <fk-dropdown position="bottom">
      <fk-button>Bottom</fk-button>
      <template #content>
        <fk-doption>Option 1</fk-doption>
        <fk-doption>Option 2</fk-doption>
        <fk-doption>Option 3</fk-doption>
      </template>
    </fk-dropdown>
    <fk-dropdown position="br">
      <fk-button>Bottom Right</fk-button>
      <template #content>
        <fk-doption>Option 1</fk-doption>
        <fk-doption>Option 2</fk-doption>
        <fk-doption>Option 3</fk-doption>
      </template>
    </fk-dropdown>
    <fk-dropdown position="tl">
      <fk-button>Top Left</fk-button>
      <template #content>
        <fk-doption>Option 1</fk-doption>
        <fk-doption>Option 2</fk-doption>
        <fk-doption>Option 3</fk-doption>
      </template>
    </fk-dropdown>
    <fk-dropdown position="top">
      <fk-button>Top</fk-button>
      <template #content>
        <fk-doption>Option 1</fk-doption>
        <fk-doption>Option 2</fk-doption>
        <fk-doption>Option 3</fk-doption>
      </template>
    </fk-dropdown>
    <fk-dropdown position="tr">
      <fk-button>Top Right</fk-button>
      <template #content>
        <fk-doption>Option 1</fk-doption>
        <fk-doption>Option 2</fk-doption>
        <fk-doption>Option 3</fk-doption>
      </template>
    </fk-dropdown>
  </fk-space>
</template>
```
