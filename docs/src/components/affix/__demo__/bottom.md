```yaml
title:
  zh-CN: 底部固定
  en-US: Fixed Bottom
```


当页面滚动或浏览器窗口改变时，元素向下滚动到距底部一定距离时固定。

---


```vue { "component": true } 
<template>
  <fk-affix :offset-bottom="120">
    <fk-button type="primary">120px to affix bottom</fk-button>
  </fk-affix>
</template>
```
