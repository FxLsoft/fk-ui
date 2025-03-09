```yaml
title:
  zh-CN: 自定义状态
  en-US: Custom Status
```


自定义状态。需要传入指定的图标

---


```vue { "component": true } 
<template>
  <fk-result :status="null" title="This is title content" subtitle="This is subtitle content">
    <template #icon>
      <IconFaceSmileFill />
    </template>
    <template #extra>
      <fk-space>
        <fk-button type="secondary">Again</fk-button>
        <fk-button type="primary">Back</fk-button>
      </fk-space>
    </template>
  </fk-result>
</template>
<script>
import { IconFaceSmileFill } from '@erp/common';

export default {
  components: {
    IconFaceSmileFill
  },
}
</script>
```
