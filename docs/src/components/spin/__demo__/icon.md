```yaml
title:
  zh-CN: 自定义图标
  en-US: Custom Icon
```


通过 `#icon` 插槽可以自定义图标。

---


```vue { "component": true } 
<template>
  <fk-spin>
    <template #icon>
      <icon-sync />
    </template>
  </fk-spin>
</template>

<script>
import { IconSync } from '@erp/common';

export default {
  components: { IconSync }
};
</script>
```
