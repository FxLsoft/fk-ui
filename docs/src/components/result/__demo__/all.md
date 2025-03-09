```yaml
title:
  zh-CN: 完整功能
  en-US: All features
```


完整功能

---


```vue { "component": true } 
<template>
  <fk-result status="error" title="No internet ">
    <template #icon>
      <IconFaceFrownFill />
    </template>
    <template #subtitle> DNS_PROBE_FINISHED_NO_INTERNET </template>

    <template #extra>
      <fk-button type="primary">Refresh</fk-button>
    </template>
    <fk-typography style="background: var(--color-fill-2); padding: 24px;">
      <fk-typography-paragraph>Try:</fk-typography-paragraph>
      <ul>
        <li> Checking the network cables, modem, and router </li>
        <li> Reconnecting to Wi-Fi </li>
      </ul>
    </fk-typography>
  </fk-result>
</template>

<script>
import { IconFaceFrownFill } from '@erp/common';

export default {
  components: {
    IconFaceFrownFill
  },
}
</script>
```
