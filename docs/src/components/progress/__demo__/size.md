```yaml
title:
  zh-CN: 进度条大小
  en-US: Progress Size
```


通过 `size` 设置进度条的大小

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large" :style="{width:'50%'}">
    <fk-radio-group v-model="size" type="button">
      <fk-radio value="small">Small</fk-radio>
      <fk-radio value="medium">Medium</fk-radio>
      <fk-radio value="large">Large</fk-radio>
    </fk-radio-group>
    <fk-progress :size="size" :percent="0.2"/>
    <fk-progress status='warning' :size="size" :percent="0.2"/>
    <fk-progress status='danger' :size="size" :percent="0.2"/>
    <fk-space>
      <fk-progress type="circle" :size="size" :percent="0.2"/>
      <fk-progress type="circle" status='warning' :size="size" :percent="0.2"/>
      <fk-progress type="circle" status='danger' :size="size" :percent="0.2"/>
    </fk-space>
  </fk-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      size: ref('medium')
    }
  }
}
</script>
```
