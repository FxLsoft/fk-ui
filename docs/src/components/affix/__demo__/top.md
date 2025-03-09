```yaml
title:
  zh-CN: 顶部固定
  en-US: Fixed Top
```


当页面滚动或浏览器窗口改变时，元素向上滚动到距顶部一定距离时固定。

---


```vue { "component": true } 
<template>
  <fk-affix :offset-top="80">
    <fk-button type="primary">80px to affix top</fk-button>
  </fk-affix>
</template>
```
