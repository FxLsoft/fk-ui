```yaml
title:
  zh-CN: 单独使用预览组件
  en-US: Use Preview alone
```


`fk-image-preview` 可单独使用，需要手动控制 `visible`。

---


```vue { "component": true } 
<template>
  <fk-button type="primary" @click="onClick">Click me to preview image</fk-button>
  <fk-image-preview
    v-model:visible="visible"
    src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?_=21"
  />
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const visible = ref(false)
    const onClick = () => {
      visible.value = true;
    };

    return {
      visible,
      onClick,
    };
  },
};
</script>
```
