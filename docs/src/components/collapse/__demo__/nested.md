```yaml
title:
  zh-CN: 嵌套面板
  en-US: Nested panels
```


面板多层嵌套。

---


```vue { "component": true } 
<template>
  <fk-collapse :default-active-key="['1', 2]" destroy-on-hide>
    <fk-collapse-item key="1" header="Aaaa Technology Co., Ltd.">
      <fk-collapse :default-active-key="['1.1']" destroy-on-hide>
        <fk-collapse-item key="1.1" header="Aaaa Technology Co., Ltd.">
          <div>Aaaa Technology Co., Ltd.</div>
        </fk-collapse-item>
        <fk-collapse-item key="1.2" header="Aaaa Technology Co., Ltd.">
          <div>Aaaa Technology Co., Ltd.</div>
        </fk-collapse-item>
      </fk-collapse>
    </fk-collapse-item>
    <fk-collapse-item :key="2" header="Aaaa Technology Co., Ltd.">
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
    <fk-collapse-item key="3" header="Aaaa Technology Co., Ltd.">
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
  </fk-collapse>
</template>
```
