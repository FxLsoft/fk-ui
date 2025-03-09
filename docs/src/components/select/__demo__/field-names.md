```yaml
title:
  zh-CN: 自定义字段名
  en-US: Custom FieldNames
```


可以通过 `field-names` 属性自定义 `options` 中数据的格式。

---


```vue { "component": true } 
<template>
  <fk-select
v-model="value" :options="options" :field-names="fieldNames" :style="{width:'320px'}"
            placeholder="Please select ..." />
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const value = ref('bj');
    const fieldNames = {value: 'city', label: 'text'}
    const options = reactive([
      {
        city: 'bj',
        text: 'Beijing'
      },
      {
        city: 'sh',
        text: 'Shanghai'
      },
      {
        city: 'gz',
        text: 'Guangzhou'
      },
      {
        city: 'cd',
        text: 'Chengdu'
      },
    ]);

    return {
      value,
      fieldNames,
      options
    }
  }
}
</script>
```
