```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```


当容器滚动到一定高度的时候，在右下角会出现一个返回顶部的按钮。

---


```vue { "component": true } 
<template>
  <div class="wrapper">
    <ul id="basic-demo">
      <li v-for="(_, index) of Array(40)" :key="index">This is the content</li>
    </ul>
    <fk-back-top target-container="#basic-demo" :style="{position:'absolute'}" />
  </div>
</template>

<style scoped lang="less">
.wrapper {
  position: relative;

  ul {
    height: 200px;
    overflow-y: auto;

    li {
      line-height: 30px;
    }
  }
}
</style>
```
