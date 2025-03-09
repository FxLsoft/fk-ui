```yaml
title:
  zh-CN: 环形进度条
  en-US: Circle Progress
```


设置 `type="circle"` 将会展示环形进度条。

---


```vue { "component": true } 

<template>
  <fk-space size="large">
    <fk-progress type="circle" :percent="percent" />
    <fk-progress type="circle" status='warning' :percent="percent" />
    <fk-progress type="circle" status='danger' :percent="percent" />
    <fk-progress type="circle" status='success' :percent="percent" />
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
