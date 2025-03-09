```yaml
title:
  zh-CN: 布局
  en-US: Layout
```


使用 `<fk-radio-group>` 传入 `<fk-radio>`，配合 `<fk-grid>` 组件实现灵活的布局。

---


```vue { "component": true } 
<template>
  <fk-radio-group v-model="checkedValue">
    <fk-grid :cols="3" :col-gap="24" :row-gap="16">
      <fk-grid-item>
        <fk-radio value="1">Option 1</fk-radio>
      </fk-grid-item>
      <fk-grid-item>
        <fk-radio value="2" disabled>Option 2</fk-radio>
      </fk-grid-item>
      <fk-grid-item>
        <fk-radio value="3">Option 3</fk-radio>
      </fk-grid-item>
      <fk-grid-item>
        <fk-radio value="4">Option 4</fk-radio>
      </fk-grid-item>
      <fk-grid-item>
        <fk-radio value="5">Option 5</fk-radio>
      </fk-grid-item>
    </fk-grid>
  </fk-radio-group>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const checkedValue = ref('1');

    return {
      checkedValue,
    };
  },
};
</script>
```
