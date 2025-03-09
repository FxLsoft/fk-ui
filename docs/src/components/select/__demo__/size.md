```yaml
title:
  zh-CN: 选择框大小
  en-US: Select Size
```


选择框分为 `mini`、`small`、`medium`、`large` 四种尺寸。

---


```vue { "component": true } 

<template>
  <fk-space direction="vertical" size="large">
    <fk-radio-group v-model="size" type="button">
      <fk-radio value="mini">Mini</fk-radio>
      <fk-radio value="small">Small</fk-radio>
      <fk-radio value="medium">Medium</fk-radio>
      <fk-radio value="large">Large</fk-radio>
    </fk-radio-group>
    <fk-select default-value="Beijing" :style="{width:'320px'}" :size="size" placeholder="Please select ...">
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
    </fk-select>
    <fk-select
:default-value="['Beijing','Shanghai']" :style="{width:'320px'}" :size="size"
              placeholder="Please select ..." multiple>
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
      <fk-option>Shenzhen</fk-option>
      <fk-option>Chengdu</fk-option>
      <fk-option>Wuhan</fk-option>
    </fk-select>
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
