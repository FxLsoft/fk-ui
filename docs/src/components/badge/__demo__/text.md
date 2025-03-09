```yaml
title:
  zh-CN: 文本内容
  en-US: Text
```


设置 `text`，可设置自定义提示内容。

---


```vue { "component": true } 
<template>
  <fk-space :size="40">
    <fk-badge text="NEW">
      <fk-avatar shape="square">
        <span>
          <IconUser />
        </span>
      </fk-avatar>
    </fk-badge>
    <fk-badge text="HOT">
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
