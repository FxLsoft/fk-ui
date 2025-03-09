```yaml
title:
  zh-CN: 布局
  en-US: Layout
```


使用 `<fk-checkbox-group>` 传入 `<fk-checkbox>`，配合 `<fk-grid>` 组件实现灵活的布局。

---


```vue { "component": true } 
<template>
  <fk-checkbox-group v-model="checkedValue">
    <fk-grid :cols="3" :col-gap="24" :row-gap="16">
      <fk-grid-item>
        <fk-checkbox value="1">Option 1</fk-checkbox>
      </fk-grid-item>
      <fk-grid-item>
        <fk-checkbox value="2" disabled>Option 2</fk-checkbox>
      </fk-grid-item>
      <fk-grid-item>
        <fk-checkbox value="3">Option 3</fk-checkbox>
      </fk-grid-item>
      <fk-grid-item>
        <fk-checkbox value="4">Option 4</fk-checkbox>
      </fk-grid-item>
      <fk-grid-item>
        <fk-checkbox value="5">Option 5</fk-checkbox>
      </fk-grid-item>
    </fk-grid>
  </fk-checkbox-group>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const checkedValue = ref(['1', '2']);

    return {
      checkedValue,
    };
  },
};
</script>
```
