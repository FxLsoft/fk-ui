```yaml
title:
  zh-CN: 对齐
  en-US: Align
```


内置 4 种对齐方式，分别为 `start` `center` `end` `baseline`，在水平模式下默认为 `center`。

---


```vue { "component": true } 
<template>
  <div>
    <div style="marginBottom: 20px">
      <fk-radio-group v-model="align" type='button'>
        <fk-radio value="start">start</fk-radio>
        <fk-radio value="center">center</fk-radio>
        <fk-radio value="end">end</fk-radio>
        <fk-radio value="baseline">baseline</fk-radio>
      </fk-radio-group>
    </div>
    <fk-space :align="align" style="backgroundColor: var(--color-fill-2);padding: 10px;">
      <fk-typography-text>Space:</fk-typography-text>
      <fk-button type="primary">Item2</fk-button>
      <fk-card title='Card'>
        Card content
      </fk-card>
    </fk-space>
  </div>
</template>
<script>
export default {
  data() {
    return {
      align: 'center',
    }
  }
};
</script>
```
