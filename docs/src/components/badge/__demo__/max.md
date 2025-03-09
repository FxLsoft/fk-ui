```yaml
title:
  zh-CN: 最大值
  en-US: Max Count
```


设置 `max-count`，可以限制最大显示的徽标数值，超过将会加 `+` 后缀。`max-count` 默认为 `99`。

---


```vue { "component": true } 
<template>
  <fk-space :size="40">
    <fk-badge :max-count="10" :count="0">
      <fk-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </fk-avatar>
    </fk-badge>
    <fk-badge :max-count="10" :count="100">
      <fk-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </fk-avatar>
    </fk-badge>
    <fk-badge :count="100">
      <fk-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </fk-avatar>
    </fk-badge>
    <fk-badge :max-count="999" :count="1000">
      <fk-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </fk-avatar>
    </fk-badge>
  </fk-space>
</template>

<script>
import { IconUser } from '@erp/common';

export default {
  components: { IconUser },
};
</script>
```
