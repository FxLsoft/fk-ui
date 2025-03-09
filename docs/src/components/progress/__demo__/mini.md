```yaml
title:
  zh-CN: 迷你进度条
  en-US: Mini Progress
```


设置 `size="mini"` 展示微型进度条。

---


```vue { "component": true } 
<template>
  <fk-space size="large" :style="{width: '100%'}">
    <fk-progress size="mini" :percent="percent"/>
    <fk-progress size="mini" status='warning' :percent="percent"/>
    <fk-progress size="mini" status='danger' :percent="percent"/>
    <fk-progress size="mini" status='success' :percent="percent"/>
  </fk-space>
  <fk-space size="large" :style="{width: '100%', marginTop: '20px'}">
    <fk-progress type="circle" size="mini" :percent="percent"/>
    <fk-progress type="circle" size="mini" status='warning' :percent="percent"/>
    <fk-progress type="circle" size="mini" status='danger' :percent="percent"/>
    <fk-progress type="circle" size="mini" status='success' :percent="percent"/>
  </fk-space>
  <div :style="{marginTop: '20px'}">
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
