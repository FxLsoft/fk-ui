```yaml
title:
  zh-CN: 不同尺寸
  en-US: Sizes
```


列表组件提供了三种大小 `small, medium, large` ，可根据业务需求自行选择。

---


```vue { "component": true } 

<template>
  <fk-space direction="vertical" size="large">
    <fk-radio-group v-model="size" type="button">
      <fk-radio value="small">Small</fk-radio>
      <fk-radio value="medium">Medium</fk-radio>
      <fk-radio value="large">Large</fk-radio>
    </fk-radio-group>
    <fk-list :size="size">
      <template #header>
        List title
      </template>
      <fk-list-item>Beijing Aaaa Technology Co., Ltd.</fk-list-item>
      <fk-list-item>Aaaa Technology Co., Ltd.</fk-list-item>
      <fk-list-item>Aaaa Technology Co., Ltd.</fk-list-item>
      <fk-list-item>Beijing Volcengine Technology Co., Ltd.</fk-list-item>
      <fk-list-item>China Beijing Aaaa Technology Co., Ltd.</fk-list-item>
    </fk-list>
  </fk-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const size = ref('medium');

    return {
      size
    }
  },
}
</script>
```
