```yaml
title:
  zh-CN: 基本使用
  en-US: Basic Usage
```


用于在输入中提及某人或某事，常用于发布、聊天或评论功能。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" size="large" style="width: 100%">
    <fk-mention v-model="value" :data="['Aaaa', 'Bytedesign', 'Bytenumner']" placeholder="enter something" />
    <fk-mention v-model="text" :data="['Aaaa', 'Bytedesign', 'Bytenumner']" type="textarea" placeholder="enter something" />
  </fk-space>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref('');
    const text = ref('');

    return {
      value,
      text
    }
  }
}
</script>
```
