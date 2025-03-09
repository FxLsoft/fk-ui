```yaml
title:
  zh-CN: 按钮形状
  en-US: Button Shape
```


按钮分为 `square` - **长方形（默认）**、`circle` - **圆形**、`round` - **全圆角**三种形状。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-button type="primary">Square</fk-button>
    <fk-button type="primary" shape="round">Round</fk-button>
    <fk-button type="primary">
      <template #icon>
        <icon-plus />
      </template>
    </fk-button>
    <fk-button type="primary" shape="circle">
      <icon-plus />
    </fk-button>
    <fk-button type="info" shape="circle">
      <icon-plus />
    </fk-button>
  </fk-space>
</template>
<script>
import { IconPlus } from '@erp/common';

export default {
  components: { IconPlus }
};
</script>
```
