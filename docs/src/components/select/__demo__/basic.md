```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


选择器的基本用法。
通过 `trigger-props` 属性自定义下拉框的属性，比如可以让下拉框自动适应最小宽度。

---


```vue { "component": true } 

<template>
  <fk-space direction="vertical" size="large">
    <fk-select :style="{width:'320px'}" placeholder="Please select ...">
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
    </fk-select>
    <fk-select :style="{width:'320px'}" placeholder="Please select ...">
      <fk-option :value="true">是</fk-option>
      <fk-option :value="false">否</fk-option>
    </fk-select>
    <fk-select default-value="Beijing" :style="{width:'320px'}" placeholder="Please select ..." disabled>
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
    </fk-select>
    <fk-select v-model="value" :style="{width:'320px'}" placeholder="Please select ...">
      <fk-option v-for="item of data" :value="item" :label="item.label" />
    </fk-select>
    <div>Select Value: {{ value }}</div>
    <fk-select :style="{width:'160px'}" placeholder="Select" :trigger-props="{ autoFitPopupMinWidth: true }">
      <fk-option>Beijing-Beijing-Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
    </fk-select>
    
  </fk-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref();
    const data = [{
      value: 'beijing',
      label: 'Beijing',
      other: 'extra'
    }, {
      value: 'shanghai',
      label: 'Shanghai',
      other: 'extra'
    }, {
      value: 'guangzhou',
      label: 'Guangzhou',
      other: 'extra'
    }, {
      value: 'chengdu',
      label: 'Chengdu',
      other: 'extra'
    }]

    return {
      value,
      data
    }
  },
}
</script>
```
