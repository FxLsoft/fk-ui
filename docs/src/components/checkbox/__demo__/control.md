```yaml
title:
  zh-CN: 受控
  en-US: Controlled
```


通过 `v-model` (`model-value`) 属性控制是否选中

---


```vue { "component": true } 
<template>
  <fk-space size="large">
    <fk-checkbox v-model="checked1">v-model</fk-checkbox>
    <fk-checkbox :model-value="true">binding value</fk-checkbox>
    <fk-checkbox :model-value="checked2">binding value2</fk-checkbox>
    <fk-checkbox :default-checked="true">uncontrolled state</fk-checkbox>
  </fk-space>
  <div :style="{ marginTop: '20px' }">
    <fk-button type="primary" @click="handleSetCheck">
      {{ checked2 ? 'uncheck' : 'check' }} value2
    </fk-button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const checked1 = ref(false);
    const checked2 = ref(false);

    const handleSetCheck = () => {
      checked2.value = !checked2.value;
    };

    return {
      checked1,
      checked2,
      handleSetCheck,
    };
  },
};
</script>
```
