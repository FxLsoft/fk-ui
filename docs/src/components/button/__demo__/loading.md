```yaml
title:
  zh-CN: 加载中状态
  en-US: Loading Status
```


通过设置 `loading` 可以让按钮处于加载中状态。处于加载中状态的按钮不会触发点击事件。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-button type="primary" loading>Primary</fk-button>
    <fk-button loading>Default</fk-button>
    <fk-button type="dashed" loading>Dashed</fk-button>
    <fk-button type="primary" :loading="loading1" @click="handleClick1">Click Me</fk-button>
    <fk-button type="primary" :loading="loading2" @click="handleClick2">
      <template #icon>
        <icon-plus />
      </template>
      Click Me
    </fk-button>
  </fk-space>
</template>

<script>
import { ref } from 'vue';
import { IconPlus } from '@erp/common';

export default {
  components: {
    IconPlus
  },
  setup() {
    const loading1 = ref(false);
    const loading2 = ref(false);

    const handleClick1 = () => {
      loading1.value = !loading1.value
    }
    const handleClick2 = () => {
      loading2.value = !loading2.value
    }

    return {
      loading1,
      loading2,
      handleClick1,
      handleClick2
    }
  }
}
</script>
```
