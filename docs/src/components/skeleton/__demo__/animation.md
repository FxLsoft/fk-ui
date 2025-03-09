```yaml
title:
  zh-CN: 动画
  en-US: Animation
```


通过设置 `animation` 属性，让骨架屏显示动画效果。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large" :style="{width:'100%'}">
    <fk-space>
      <span>Animation</span>
      <fk-switch v-model="animation" />
    </fk-space>
    <fk-skeleton :animation="animation">
      <fk-space direction="vertical" :style="{width:'100%'}" size="large">
        <fk-skeleton-line :rows="3" />
        <fk-skeleton-shape />
      </fk-space>
    </fk-skeleton>
  </fk-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const animation = ref(true);

    return {
      animation
    }
  },
}
</script>
```
