```yaml
title:
  zh-CN: 手风琴模式
  en-US: Accordion
```


通过 `accordion` 开启手风琴模式，同时只能打开一个面板。

---


```vue { "component": true } 
<template>
  <fk-collapse :default-active-key="[1]" accordion>
    <fk-collapse-item key="1" header="Aaaa Technology Co., Ltd.">
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
    <fk-collapse-item key="2" header="Aaaa Technology Co., Ltd.">
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
    <fk-collapse-item key="3" header="Aaaa Technology Co., Ltd.">
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
  </fk-collapse>
</template>
```
