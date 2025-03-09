```yaml
title:
  zh-CN: 自定义样式
  en-US: Customize style
```


可以设置 `style` 和 `class` 来定制样式。

---


```vue { "component": true } 
<template>
  <fk-button type="primary" @click="handleNotification">
    Open Notification
  </fk-button>
</template>

<script>
import { Notification } from '@erp/common';

export default {
  setup() {
    const handleNotification = () => {
      Notification.info({
        title: 'Notification',
        content: 'This is a notification!',
        closable: true,
        style: { width: '500px' }
      })
    }

    return { handleNotification }
  }
}
</script>
```
