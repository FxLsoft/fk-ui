```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


通知提醒框的基本用法。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-button
type="primary" @click="() => $notification.info({
      title:'Notification',
      content:'This is a notification!'
    })"
    >
      Open Notification
    </fk-button>
    <fk-button @click="handleNotification">
      Open Notification
    </fk-button>
  </fk-space>
</template>

<script>
import { Notification } from '@erp/common';

export default {
  setup() {
    const handleNotification = () => {
      Notification.info({
        title: 'Notification',
        content: 'This is a notification!',
      })
    }

    return { handleNotification }
  }
}
</script>
```
