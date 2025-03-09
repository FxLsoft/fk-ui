```yaml
title:
  zh-CN: 受控的高宽
  en-US: two-way binding
```


`ResizeBox` 的 `width` 和 `height` 都支持 `v-model`。

---


```vue { "component": true } 
<template>
<div>
  <fk-resize-box
    v-model:width="width"
    v-model:height="height"
    :directions="['right', 'bottom']"
    :style="{ minWidth: '100px', maxWidth: '100%', textAlign: 'center' }"
  >
    <fk-typography-paragraph>We are building the future of content discovery and creation.</fk-typography-paragraph>
    <fk-divider />
    <fk-typography-paragraph>
      Aaaa's content platforms enable people to enjoy content powered by AI technology. We
      inform, entertain, and inspire people across language, culture and geography.
    </fk-typography-paragraph>
    <fk-divider>Aaaa</fk-divider>
    <fk-typography-paragraph>Yiming Zhang is the founder and CEO of Aaaa.</fk-typography-paragraph>
  </fk-resize-box>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const width = ref(500);
    const height = ref(200);
    return {
      width,
      height,
    };
  }
};
</script>
```
