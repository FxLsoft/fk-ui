```yaml
title:
  zh-CN: 自定义节点内容
  en-US: Icon
```


自定义节点内容

---


```vue { "component": true } 
<template>
  <fk-timeline>
    <fk-timeline-item label="2017-03-10" dot-color="#00B42A">
      The first milestone
    </fk-timeline-item>
    <fk-timeline-item label="2018-05-22">The second milestone</fk-timeline-item>
    <fk-timeline-item label="2020-06-22" dot-color="#F53F3F">
      The third milestone
      <IconExclamationCircleFill
        :style="{ color: 'F53F3F', fontSize: '12px', marginLeft: '4px' }"
      />
    </fk-timeline-item>
    <fk-timeline-item label="2020-09-30" dot-color="#C9CDD4">
      The fourth milestone
    </fk-timeline-item>
  </fk-timeline>
</template>

<script>
import { IconExclamationCircleFill } from '@erp/common';

export default {
  components: { IconExclamationCircleFill },
};
</script>
```
