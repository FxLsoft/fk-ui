```yaml
title:
  zh-CN: 固定状态改变回调
  en-US: Callback
```


当固定状态发生改变时，会触发事件。

---


```vue { "component": true } 
<template>
  <fk-affix
    :offset-bottom="80"
    @change="onChange"
  >
    <fk-button type="primary">80px to affix bottom</fk-button>
  </fk-affix>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const onChange = (fixed) => {
      console.log(`${fixed}`);
    };
    return {
      onChange
    };
  }
});
</script>
```
