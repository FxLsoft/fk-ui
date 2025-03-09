```yaml
title:
  zh-CN: 更新内容
  en-US: Update content
```


更新消息内容，通过设置 `duration` 属性可以重置定时器。

---


```vue { "component": true } 
<template>
  <fk-button @click="handleClick">Update Info Message</fk-button>
</template>

<script>
export default {
  data() {
    return {
      index: 0
    }
  },
  methods: {
    handleClick() {
      this.$message.info({
        id: 'myInfo',
        content: `This is an info message ${this.$data.index++}`,
        duration: 2000
      })
    }
  }
};
</script>
```
