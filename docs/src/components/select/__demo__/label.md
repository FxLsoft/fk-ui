```yaml
title:
  zh-CN: 自定义选择框展示内容
  en-US: Label
```


通过 `#label` 插槽可以自定义选择框展示内容。

---


```vue { "component": true } 
<template>
  <fk-select default-value="Beijing" :style="{width:'320px'}" placeholder="Please select ...">
    <template #label="{ data }">
      <span><icon-plus/>{{data?.label}}</span>
    </template>
    <fk-option>Beijing</fk-option>
    <fk-option>Shanghai</fk-option>
    <fk-option>Guangzhou</fk-option>
    <fk-option disabled>Disabled</fk-option>
  </fk-select>
</template>

<script>
import { IconPlus } from '@erp/common';

export default {
  components: { IconPlus }
};
</script>
```
