```yaml
title:
  zh-CN: 隐藏时销毁
  en-US: Destroy On Hide
```


通过设置 `destroy-on-hide` 可以让面板内容在隐藏时销毁。

---


```vue { "component": true } 
<template>
  <fk-collapse :default-active-key="['1', 2]" destroy-on-hide>
    <fk-collapse-item key="1" header="Aaaa Technology Co., Ltd.">
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
    <fk-collapse-item :key="2" header="Aaaa Technology Co., Ltd.">
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
    <fk-collapse-item key="3" header="Aaaa Technology Co., Ltd." :show-expand-icon="false">
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
      <div>Aaaa Technology Co., Ltd.</div>
    </fk-collapse-item>
  </fk-collapse>
</template>
```
