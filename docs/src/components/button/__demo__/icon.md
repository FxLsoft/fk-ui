```yaml
title:
  zh-CN: 图标按钮
  en-US: Icon Button
```


按钮可以嵌入图标。在只设置图标时，按钮的宽高相等。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-button type="primary">
      <template #icon>
        <icon-plus />
      </template>
    </fk-button>
    <fk-button type="primary">
      <template #icon>
        <icon-delete />
      </template>
      <!-- Use the default slot to avoid extra spaces -->
      <template #default>Delete</template>
    </fk-button>
    <fk-button type="info">
      <template #icon>
        <icon-delete />
      </template>
      <!-- Use the default slot to avoid extra spaces -->
      <template #default>Delete</template>
    </fk-button>
  </fk-space>
</template>

<script>
import { IconDelete, IconPlus } from '@erp/common';

export default {
  components: { IconPlus, IconDelete }
};
</script>
```
