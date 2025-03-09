```yaml
title:
  zh-CN: 全局提示的位置
  en-US: Position
```


通知提醒框有 4 种不同的弹出位置，分别为：`左上角`, `右上角 (默认)`, `左下角`, `右下角`。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-button type="primary" @click="handleNotification"> Top Right </fk-button>
    <fk-button type="primary" @click="handleNotificationTopLeft"> Top Left </fk-button>
    <fk-button type="primary" @click="handleNotificationBottomRight"> Bottom Right </fk-button>
    <fk-button type="primary" @click="handleNotificationBottomLeft"> Bottom Left </fk-button>
  </fk-space>
</template>

<script>
import { Notification } from '@erp/common';

export default {
  setup() {
    const handleNotification = () => {
      Notification.info({
        title: 'Title',
        content: 'This is a Notification!',
      })
    }

    const handleNotificationTopLeft = () => {
      Notification.info({
        title: 'Title',
        content: 'This is a Notification!',
        position: "topLeft"
      })
    }

    const handleNotificationBottomRight = () => {
      Notification.info({
        title: 'Title',
        content: 'This is a Notification!',
        position: 'bottomRight'
      })
    }

    const handleNotificationBottomLeft = () => {
      Notification.info({
        title: 'Title',
        content: 'This is a Notification!',
        position: "bottomLeft"
      })
    }

    return {
      handleNotification,
      handleNotificationTopLeft,
      handleNotificationBottomRight,
      handleNotificationBottomLeft
    }
  }
}
</script>
```
