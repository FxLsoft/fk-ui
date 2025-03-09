```yaml
title:
  zh-CN: 小红点
  en-US: Red Badge
```


设置 `dot`，即可只显示小红点而不显示数字。`count > 0` 时才显示。

---


```vue { "component": true } 
<template>
  <fk-space :size="40">
    <fk-badge :count="9" dot :offset="[6, -2]">
      <a href="#">Link</a>
    </fk-badge>
    <fk-badge :count="9" dot :offset="[2, -2]">
      <IconNotification
        :style="{ color: '#888', fontSize: '18px', verticalAlign: '-3px' }"
      />
    </fk-badge>
  </fk-space>
</template>

<script>
import { IconNotification } from '@erp/common';

export default {
  components: { IconNotification },
};
</script>
```
