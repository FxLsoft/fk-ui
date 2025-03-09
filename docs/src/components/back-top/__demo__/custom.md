```yaml
title:
  zh-CN: 自定义按钮
  en-US: Custom Button
```


可以自定义返回按钮。

---


```vue { "component": true } 
<template>
  <div class="wrapper">
    <ul id="custom-demo">
      <li v-for="(_, index) of Array(40)" :key="index">This is the content</li>
    </ul>
    <fk-back-top target-container="#custom-demo" :style="{position:'absolute'}" >
      <fk-button>UP</fk-button>
    </fk-back-top>
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
