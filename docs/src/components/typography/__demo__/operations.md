```yaml
title:
  zh-CN: 可交互
  en-US: Interactive
```


提供复制、编辑文本等功能。

---


```vue { "component": true } 
<template>
  <fk-typography>
    <fk-typography-paragraph copyable>
      Click the icon to copy this text.
    </fk-typography-paragraph>
    <fk-typography-paragraph
      v-model:editText="str"
      editable
    >
      {{str}}
    </fk-typography-paragraph>
  </fk-typography>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const str = ref('Click the icon to edit this text.');
    return {
      str,
    }
  }
});
</script>
```

