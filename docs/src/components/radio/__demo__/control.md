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
    <fk-radio v-model="checked1">v-model</fk-radio>
    <fk-radio :model-value="true">binding "true"</fk-radio>
    <fk-radio :model-value="checked2">binding value2</fk-radio>
    <fk-radio :default-checked="true">uncontrolled state</fk-radio>
  </fk-space>
  <div :style="{ marginTop: '20px' }">
    <fk-space size="large">
      <fk-button type="primary" @click="handleSetCheck">
        {{ checked2 ? 'uncheck' : 'check' }} value2
      </fk-button>
      <fk-button @click="handleReset"> reset all </fk-button>
    </fk-space>
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

    const handleReset = () => {
      checked1.value = false;
      checked2.value = false;
    };

    return {
      checked1,
      checked2,
      handleSetCheck,
      handleReset,
    };
  },
};
</script>
```
