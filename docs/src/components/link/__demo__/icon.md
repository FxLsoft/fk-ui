```yaml
title:
  zh-CN: 图标
  en-US: Icon
```


通过 `icon` 设置带图标的链接，设置为 `true` 时候显示默认图标。

---


```vue { "component": true } 
<template>
  <div>
    <fk-space>
      <fk-link href="link" icon>Link</fk-link>
      <fk-link href="link" disabled icon>Link</fk-link>
    </fk-space>
  </div>
  <div>
    <fk-space>
      <fk-link href="link">
        <template #icon>
          <icon-edit />
        </template>
        Link
      </fk-link>
      <fk-link href="link" disabled>
        <template #icon>
          <icon-edit />
        </template>
        Link
      </fk-link>
    </fk-space>
  </div>
</template>

<script>
  import { IconEdit } from '@erp/common';

  export default {
    components: { IconEdit }
  };
</script>
```
