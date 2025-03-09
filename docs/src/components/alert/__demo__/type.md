```yaml
title:
  zh-CN: 提示类型
  en-US: Alert Type
```


警告提示有 `info`、`success`、`warning`、`error` `normal` 

---


```vue { "component": true } 
<template>
  <fk-row :gutter="[40, 20]">
    <fk-col :span="12">
      <fk-alert>This is an info alert.</fk-alert>
    </fk-col>
    <fk-col :span="12">
      <fk-alert type="success">This is an success alert.</fk-alert>
    </fk-col>
    <fk-col :span="12">
      <fk-alert type="warning">This is an warning alert.</fk-alert>
    </fk-col>
    <fk-col :span="12">
      <fk-alert type="error">This is an error alert.</fk-alert>
    </fk-col>
    <fk-col :span="12">
      <fk-alert type="normal">
        <template #icon>
          <icon-exclamation-circle-fill />
        </template>
        This is an normal alert.
      </fk-alert>
    </fk-col>
  </fk-row>
</template>

<script>
import { IconExclamationCircleFill } from '@erp/common';

export default {
  components: { IconExclamationCircleFill }
};
</script>
```
