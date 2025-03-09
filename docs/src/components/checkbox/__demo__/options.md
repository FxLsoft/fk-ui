```yaml
title:
  zh-CN: 复选框组选项
  en-US: Checkbox Group options
```


`fk-checkbox-group` 通过 `options` 属性设置子元素

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-checkbox-group v-model="value1" :options="plainOptions" />
    <fk-checkbox-group v-model="value2" :options="options" />
    <fk-checkbox-group v-model="value2" :options="options">
      <template #label="{ data }">
        <fk-tag>{{ data.label }}</fk-tag>
      </template>
    </fk-checkbox-group>
  </fk-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value1 = ref(['Plain 1']);
    const plainOptions = ['Plain 1', 'Plain 2', 'Plain 3'];

    const value2 = ref(['1']);
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3', disabled: true },
    ];

    return {
      plainOptions,
      options,
      value1,
      value2,
    };
  },
};
</script>
```
