```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


基本用法。只需指定 `count`或者 `content slot`，即可显示徽标。

---


```vue { "component": true } 
<template>
  <fk-space :size="40">
    <fk-badge :count="9">
      <fk-avatar shape="square" />
    </fk-badge>
    <fk-badge :count="9" dot :dot-style="{ width: '10px', height: '10px' }">
      <fk-avatar shape="square" />
    </fk-badge>
    <fk-badge :dot-style="{ height: '16px', width: '16px', fontSize: '14px' }">
      <template #content>
        <IconClockCircle
          :style="{ verticalAlign: 'middle', color: 'var(--color-text-2)' }"
        />
      </template>
      <fk-avatar shape="square" />
    </fk-badge>
  </fk-space>
</template>

<script>
import { IconClockCircle } from '@erp/common';

export default {
  components: { IconClockCircle },
};
</script>
```
