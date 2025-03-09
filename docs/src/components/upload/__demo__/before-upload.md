```yaml
title:
  zh-CN: 上传前校验
  en-US: On Before Upload
```


`beforeUpload` 会在每一个文件上传之前执行。如果返回 `false` 或者` Promise.reject`， 那么将会取消当前文件的上传。

---


```vue { "component": true } 
<template>
  <fk-space direction="vertical" :style="{ width: '100%' }">
    <fk-upload action="/" @before-upload="beforeUpload" />
  </fk-space>
</template>

<script>
import { Modal } from '@erp/common';

export default {
  setup() {
    const beforeUpload = (file) => {
      return new Promise((resolve, reject) => {
        Modal.confirm({
          title: 'beforeUpload',
          content: `确认上传 ${file.name}`,
          onOk: () => resolve(true),
          onCancel: () => reject('cancel'),
        });
      });
    };
    return {
      beforeUpload
    }
  },
};
</script>
```
