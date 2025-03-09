```yaml
title:
  zh-CN: 限制可勾选数量
  en-US: Limit the number of boxes that can be checked
```


通过设置 `max` 限制最多可被勾选的项目数。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-checkbox-group v-model="value1" :max="2" :options="plainOptions" />
    <fk-checkbox-group :max="2" :default-value="['1']">
      <fk-checkbox value="1" disabled>Option 1</fk-checkbox>
      <fk-checkbox value="2">Option 2</fk-checkbox>
      <fk-checkbox value="3">Option 3</fk-checkbox>
      <fk-checkbox value="4">Option 4</fk-checkbox>
    </fk-checkbox-group>
  </fk-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value1 = ref(['Plain 1']);
    const plainOptions = ['Plain 1', 'Plain 2', 'Plain 3', 'Plain 4'];

    return {
      plainOptions,
      value1,
    };
  },
};
</script>
```
