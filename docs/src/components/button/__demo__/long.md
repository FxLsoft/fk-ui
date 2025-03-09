```yaml
title:
  zh-CN: 长按钮
  en-US: Long Button
```


通过设置 `long` 属性，使按钮的宽度跟随容器的宽度。

---


```vue { "component": true } 
<template>
  <fk-space class="wrapper" direction="vertical">
    <fk-button type="primary" long>Primary</fk-button>
    <fk-button long>Default</fk-button>
    <fk-button type="dashed" long>Dashed</fk-button>
    <fk-button type="outline" long>Outline</fk-button>
    <fk-button type="text" long>Text</fk-button>
  </fk-space>
</template>

<style scoped lang="less">
.wrapper{
  width: 400px;
  padding: 20px;
  border: 1px solid var(~'--color-border');
  border-radius: 4px;
}
</style>
```
