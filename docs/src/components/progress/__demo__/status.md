```yaml
title:
  zh-CN: 进度条状态
  en-US: Progress Status
```


通过 `status` 指定进度条状态

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" :style="{width: '50%'}">
    <fk-progress :percent="percent" />
    <fk-progress status='warning' :percent="percent" />
    <fk-progress status='danger' :percent="percent" />
  </fk-space>
  <div :style="{marginTop:'20px'}">
    <fk-slider v-model="percent" :max="1" :step="0.1" :style="{width: '150px'}" />
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const percent = ref(0.2);

    return {
      percent
    }
  },
}
</script>
```
