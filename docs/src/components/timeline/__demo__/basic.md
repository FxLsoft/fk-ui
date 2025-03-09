```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


基本使用

---


```vue { "component": true } 
<template>
  <div :style="{ marginBottom: '40px' }">
    <fk-typography-text :style="{ verticalAlign: 'middle', marginRight: '8px' }">
      Reverse
    </fk-typography-text>
    <fk-radio-group
      style="{ marginBottom: '30px' }"
      :model-value="isReverse"
      @change="onChange"
    >
      <fk-radio :value="false">No Reverse</fk-radio>
      <fk-radio :value="true">Reverse</fk-radio>
    </fk-radio-group>
  </div>
  <fk-timeline :reverse="isReverse">
    <fk-timeline-item label="2017-03-10">The first milestone</fk-timeline-item>
    <fk-timeline-item label="2018-05-12">The second milestone</fk-timeline-item>
    <fk-timeline-item label="2020-09-30">The third milestone</fk-timeline-item>
  </fk-timeline>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const isReverse = ref(false);

    const onChange = (bool) => {
      isReverse.value = bool;
    };

    return {
      isReverse,
      onChange
    }
  },
};
</script>
```
