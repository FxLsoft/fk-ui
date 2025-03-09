```yaml
title:
  zh-CN: 悬浮状态底色
  en-US: hoverable
```


可以通过 hoverable 属性设置是否在悬浮状态时隐藏底色。


---


```vue { "component": true } 
<template>
  <fk-space>
    <fk-link href="link" :hoverable="false">Link</fk-link>
    <fk-link href="link" status="danger" :hoverable="false">Link</fk-link>
  </fk-space>
</template>
```
