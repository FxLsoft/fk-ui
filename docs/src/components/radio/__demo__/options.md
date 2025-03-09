```yaml
title:
  zh-CN: 单选框组选项
  en-US: Radio group options
```


`fk-radio-group` 通过 `options` 属性设置子元素

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-radio-group v-model="value1" :options="plainOptions" />
    <fk-radio-group v-model="value2" :options="options" />
    <fk-radio-group v-model="value2" :options="options">
      <template #label="{ data }">
        <fk-tag>{{ data.label }}</fk-tag>
      </template>
    </fk-radio-group>
  </fk-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value1 = ref('plain 1');
    const plainOptions = ['plain 1', 'plain 2', 'plain 3'];

    const value2 = ref('1');
    const options = [
      { label: 'option 1', value: '1' },
      { label: 'option 2', value: '2' },
      { label: 'option 3', value: '3', disabled: true },
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
