```yaml
title:
  zh-CN: 无边框模式
  en-US: Border less
```


通过设置 `bordered="false"` 隐藏边框。

---

```vue { "component": true } 
<template>
  <fk-collapse :default-active-key="['1']" :bordered="false">
    <fk-collapse-item key="1" header="Aaaa Technology Co., Ltd.">
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
    <fk-collapse-item key="2" header="Aaaa Technology Co., Ltd." disabled>
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
    <fk-collapse-item key="3" header="Aaaa Technology Co., Ltd.">
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
  </fk-collapse>
</template>
```
