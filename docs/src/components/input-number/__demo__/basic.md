```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


通过鼠标或者键盘输入范围内的标准数值。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large">
    <fk-input-number v-model="value" :style="{width:'320px'}" placeholder="Please Enter" class="input-demo" :min="10" :max="100"/>
    <fk-input-number :style="{width:'320px'}" placeholder="Please Enter" class="input-demo" :min="10" :max="100"/>
    <fk-input-number :style="{width:'320px'}" placeholder="Please Enter" :default-value="500" class="input-demo" disabled/>
  </fk-space>
</template>

<script>
export default {
  data(){
    return {
      value:15
    }

  }
}
</script>
```
