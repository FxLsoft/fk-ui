```yaml
title:
  zh-CN: 自定义图标
  en-US: Custom icon
```


设置 `icon` 来自定义图标。

---


```vue { "component": true } 
<template>
  <fk-button @click="handleClick">Info Message</fk-button>
</template>

<script>
import { h } from 'vue';
import { IconFaceSmileFill } from '@erp/common';

export default {
  methods: {
    handleClick() {
      this.$message.info({
        content: 'This is an info message!',
        icon: () => h(IconFaceSmileFill)
      });
    }
  }
}
</script>
```
