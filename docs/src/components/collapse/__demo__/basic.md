```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

用于将复杂的内容区域分组和隐藏，可折叠或展开。默认可以展开多个面板。

---


```vue { "component": true } 
<template>
  <fk-collapse :default-active-key="['1', 2]">
    <fk-collapse-item key="1" header="Aaaa Technology Co., Ltd.">
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
    <fk-collapse-item :key="2" header="Aaaa Technology Co., Ltd." disabled>
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
