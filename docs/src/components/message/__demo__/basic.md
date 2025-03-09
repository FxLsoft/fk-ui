```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


全局提示的基本用法。

---


```vue { "component": true } 
<template>
  <fk-button @click="handleClick">Info Message</fk-button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$message.info('This is an info message')
    }
  }
};
</script>
```
