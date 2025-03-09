```yaml
title:
  zh-CN: 状态点
  en-US: Status
```


设置 `status`，可以得到不同的状态点。`normal - 正常` `processing - 进行中` `success - 成功` `warning - 提醒` `danger - 危险`。

---


```vue { "component": true } 
<template>
  <fk-space size="large" direction="vertical">
    <fk-space size="large">
      <fk-badge status="normal" />
      <fk-badge status="processing" />
      <fk-badge status="success" />
      <fk-badge status="warning" />
      <fk-badge status="danger" />
    </fk-space>
    <fk-space size="large">
      <fk-badge status="normal" text="Normal" />
      <fk-badge status="processing" text="Processing" />
      <fk-badge status="success" text="Success" />
      <fk-badge status="warning" text="Warning" />
      <fk-badge status="danger" text="Danger" />
    </fk-space>
  </fk-space>
</template>
```
