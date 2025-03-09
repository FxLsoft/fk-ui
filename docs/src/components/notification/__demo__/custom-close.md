```yaml
title:
  zh-CN: 自定义关闭按钮
  en-US: Custom close button
```


需要设置 `closable: true`，自定义元素使用 `closeIconElement`，仅图标使用 `closeIcon` (会有 `hover` 样式)。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-button type="primary" @click="handleNotification">
      Open Notification
    </fk-button>
    <fk-button type="primary" status="danger" @click="handleNotification2">
      Open Notification
    </fk-button>
  </fk-space>
</template>

<script lang="jsx">
import { Button, Notification } from '@erp/common';
import { IconCloseCircle } from '@erp/common';

export default {
  setup() {
    const handleNotification = () => {
      Notification.info({
        title:'Notification',
        content:'This is a notification!',
        closable: true,
        closeIcon: <IconCloseCircle />
      })
    }

    const handleNotification2 = () => {
      Notification.error({
        title:'Notification',
        content:'This is a notification!',
        closable: true,
        closeIconElement: <Button size="mini">Close</Button>
      })
    }

    return { handleNotification, handleNotification2 }
  }
}
</script>
```
