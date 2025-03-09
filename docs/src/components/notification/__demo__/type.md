```yaml
title:
  zh-CN: 消息类型
  en-US: Notification Type
```


通知提醒框的消息类型。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-button
      type='primary'
      @click="() => $notification.info('This is an info message!')"
    >
      Info
    </fk-button>
    <fk-button
      type='primary'
      status="success"
      @click="() => $notification.success('This is a success message!')"
    >
      Success
    </fk-button>
    <fk-button
      type='primary'
      status="warning"
      @click="() => $notification.warning('This is a warning message!')"
    >
      Warning
    </fk-button>
    <fk-button
      type='primary'
      status="danger"
      @click="() => $notification.error('This is an error message!')"
    >
      Error
    </fk-button>
    <fk-button
      type='secondary'
      @click="() => $notification.info({
        content: 'This is an error message!',
        showIcon: false
      })"
    >
      Normal
    </fk-button>
  </fk-space>
</template>
```
