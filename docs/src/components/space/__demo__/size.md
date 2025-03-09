```yaml
title:
  zh-CN: 尺寸
  en-US: Size
```


内置 4 个尺寸，`mini - 4px` `small - 8px (默认)` `medium - 16px` `large - 24px`，也支持传数字来自定义尺寸。

---


```vue { "component": true } 
<template>
  <div>
    <div style="marginBottom: 20px">
      <fk-radio-group v-model="size" type='button'>
        <fk-radio value="mini">mini</fk-radio>
        <fk-radio value="small">small</fk-radio>
        <fk-radio value="medium">medium</fk-radio>
        <fk-radio value="large">large</fk-radio>
      </fk-radio-group>
    </div>
    <fk-space :size="size">
      <fk-button type="primary">Item1</fk-button>
      <fk-button type="primary">Item2</fk-button>
      <fk-button type="primary">Item3</fk-button>
    </fk-space>
  </div>
</template>
<script>
export default {
  data() {
    return {
      size: 'medium',
    }
  }
};
</script>
```
