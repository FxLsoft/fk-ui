```yaml
title:
  zh-CN: 设置步长
  en-US: Step
```


通过 `step` 设置步长，默认步长为 1。建议设置能够被 `max-min` 整除的值，否则会出现可选最大值小于 `max` 的情况。当设置 `show-ticks` 时，显示步长刻度线。

---


```vue { "component": true } 

<template>
  <fk-space direction="vertical" size="large">
    <fk-form :model="data" layout="inline">
      <fk-form-item label="Step" field="step">
        <fk-input-number v-model="data.step" :style="{ width: '100px' }" />
      </fk-form-item>
      <fk-form-item label="Show steps" field="showTicks">
        <fk-switch v-model="data.showTicks" />
      </fk-form-item>
    </fk-form>
    <fk-slider :default-value="20" :style="{ width: '300px' }" :step="data.step" :show-ticks="data.showTicks" />
  </fk-space>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const data = reactive({
      step: 5,
      showTicks: true
    });

    return {
      data
    }
  },
}
</script>
```
