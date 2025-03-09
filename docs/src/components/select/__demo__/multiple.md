```yaml
title:
  zh-CN: 多选选择器
  en-US: Multiple Select
```


通过设置 `multiple` ，可以让选择器支持多选。此外通过 `max-tag-count` 可以设置最多显示的标签个数。

---


```vue { "component": true } 

<template>
  <div style="margin-bottom: 10px">
    <fk-switch v-model="scrollbar" />
    Virtual Scrollbar
  </div>
  <fk-space direction="vertical" size="large">
    <fk-select
:default-value="['Beijing','Shanghai']" :style="{width:'360px'}" placeholder="Please select ..." multiple
              :scrollbar="scrollbar">
      <fk-option>Beijing</fk-option>
      <fk-option :tag-props="{color:'red'}">Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
      <fk-option>Shenzhen</fk-option>
      <fk-option>Wuhan</fk-option>
    </fk-select>
    <fk-select
:default-value="['Beijing','Shanghai','Guangzhou']" :style="{width:'360px'}"
              placeholder="Please select ..." multiple :max-tag-count="2" allow-clear :scrollbar="scrollbar">
      <fk-option>Beijing</fk-option>
      <fk-option>Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
      <fk-option>Shenzhen</fk-option>
      <fk-option>Chengdu</fk-option>
      <fk-option>Wuhan</fk-option>
    </fk-select>
    <fk-select
:default-value="['Beijing','Shanghai']" :style="{width:'360px'}" placeholder="Please select ..." multiple
              :limit="2" :scrollbar="scrollbar">
      <fk-option>Beijing</fk-option>
      <fk-option :tag-props="{color:'red'}">Shanghai</fk-option>
      <fk-option>Guangzhou</fk-option>
      <fk-option disabled>Disabled</fk-option>
      <fk-option>Shenzhen</fk-option>
      <fk-option>Wuhan</fk-option>
    </fk-select>
  </fk-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const scrollbar = ref(true);

    return {
      scrollbar
    }
  }
}
</script>
```
