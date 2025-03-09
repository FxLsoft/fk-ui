```yaml
title:
  zh-CN: 消息提示
  en-US: Notice
```


有**info**, **success**, **warning**, **error**四种类型的消息提示，仅提供一个确认按钮用于关闭消息提示对话框。
消息默认会默认开启 `simple` 和 `hideCancel`，如果想要取消可以再次设置。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-button @click="handleClickInfo">Info</fk-button>
    <fk-button status="success" @click="handleClickSuccess">Success</fk-button>
    <fk-button status="warning" @click="handleClickWarning">Warning</fk-button>
    <fk-button status="danger" @click="handleClickError">Error</fk-button>
  </fk-space>
</template>

<script>
import { Modal } from '@erp/common';

export default {
  setup() {
    const handleClickInfo = () => {
      Modal.info({
        title: 'Info Notification',
        content: 'This is an info description which directly indicates a neutral informative change or action.'
      });
    };
    const handleClickSuccess = () => {
      Modal.success({
        title: 'Success Notification',
        content: 'This is a success notification'
      });
    };
    const handleClickWarning = () => {
      Modal.warning({
        title: 'Warning Notification',
        content: 'This is a warning description which directly indicates a warning that might need attention.'
      });
    };
    const handleClickError = () => {
      Modal.error({
        title: 'Error Notification',
        content: 'This is an error description which directly indicates a dangerous or potentially negative action.'
      });
    };

    return {
      handleClickInfo,
      handleClickSuccess,
      handleClickWarning,
      handleClickError
    }
  },
}
</script>
```
