```yaml
title:
  zh-CN: 右键菜单
  en-US: Context Menu
```

移入区域后，可点击鼠标右键触发。

---

```vue { "component": true }
<template>
  <fk-dropdown trigger="contextMenu" alignPoint :style="{display:'block'}">
    <div :style="{display:'flex',alignItems:'center',justifyContent:'center', height:'300px',backgroundColor:'var(--color-fill-2)'}">
      <div>Click Me</div>
    </div>
    <template #content>
      <fk-doption>Option 1</fk-doption>
      <fk-doption>Option 2</fk-doption>
      <fk-doption>Option 3</fk-doption>
    </template>
  </fk-dropdown>
</template>
```
