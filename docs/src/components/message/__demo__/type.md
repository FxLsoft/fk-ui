```yaml
title:
  zh-CN: 消息类型
  en-US: Message Type
```


全局提示有 6 种不同的类型，分别为：`info`, `success`, `warning`, `error`, `loading`。2.41.0 版本增加 `normal` 类型，此类型下默认没有图标。

---


```vue { "component": true } 

<template>
  <div>
    <fk-space>
      <fk-button @click="()=>$message.info('This is an info message!')">Info Message</fk-button>
      <fk-button status="success" @click="()=>$message.success('This is a success message!')">Success Message
      </fk-button>
      <fk-button status="warning" @click="()=>$message.warning('This is a warning message!')">Warning Message
      </fk-button>
      <fk-button status="danger" @click="()=>$message.error('This is an error message!')">Error Message</fk-button>
    </fk-space>
  </div>
  <div style="margin-top: 20px">
    <fk-space>
      <fk-button @click="()=>$message.normal('This is a normal message!')">Normal Message</fk-button>
      <fk-button
@click="()=>$message.normal({
    content:'This is a normal message!',
    icon:renderIcon
    })">Normal Message With Icon
      </fk-button>
      <fk-button status="primary" @click="()=>$message.loading('This is a loading message!')">Loading Message
      </fk-button>
    </fk-space>
  </div>
</template>

<script>
import { h } from 'vue';
import { IconExclamationCircleFill } from '@erp/common';

export default {
  setup() {
    const renderIcon = () => h(IconExclamationCircleFill);
    return {
      renderIcon
    }
  }
};
</script>
```
