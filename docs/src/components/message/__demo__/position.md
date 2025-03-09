```yaml
title:
  zh-CN: 全局提示的位置
  en-US: Position
```


全局提示有 2 种不同的弹出位置，分别为顶部和底部。

---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-button @click="()=>$message.info({content:'This is an info message!'})">Top Message</fk-button>
    <fk-button @click="()=>$message.info({content:'This is an info message!',position:'bottom'})">Bottom Message</fk-button>
  </fk-space>
</template>
```
