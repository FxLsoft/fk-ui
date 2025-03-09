```yaml
title:
  zh-CN: 可关闭
  en-US: Closeable
```


设置 `closable` 来显示关闭按钮。

---


```vue { "component": true } 
<template>
  <fk-button @click="handleClick">Closeable Message</fk-button>
</template>

<script>
export default {
  methods: {
    handleClick(){
      this.$message.info({
        content:'This is an info message!',
        closable: true
      })
    }
  }
};
</script>
```
