```yaml
title:
  zh-CN: 函数调用
  en-US: Call By Function
```


通过函数的方式使用抽屉。

---


```vue { "component": true } 
<template>
  <fk-button type="primary" @click="handleClick">Open Drawer</fk-button>
</template>

<script>
import { Drawer } from '@erp/common';

export default {
  setup() {
    const handleClick = () => {
      Drawer.open({
        title: 'Info Title',
        content: 'This is an info message',
        width: 340
      });
    };

    return {
      handleClick,
    }
  },
}
</script>
```
