```yaml
title:
  zh-CN: Flex 用法
  en-US: Flex
```


通过设置 `Col` 组件的 `flex` 属性，可以任意配置 flex 布局。

---


```vue { "component": true } 
<template>
  <fk-row class="grid-demo" style="margin-bottom: 16px;">
    <fk-col flex="100px">
      <div>100px</div>
    </fk-col>
    <fk-col flex="auto">
      <div>auto</div>
    </fk-col>
  </fk-row>
  <fk-row class="grid-demo" style="margin-bottom: 16px;">
    <fk-col flex="100px">
      <div>100px</div>
    </fk-col>
    <fk-col flex="auto">
      <div>auto</div>
    </fk-col>
    <fk-col flex="100px">
      <div>100px</div>
    </fk-col>
  </fk-row>
  <fk-row class="grid-demo" style="margin-bottom: 16px;">
    <fk-col :flex="3">
      <div>3 / 12</div>
    </fk-col>
    <fk-col :flex="4">
      <div>4 / 12</div>
    </fk-col>
    <fk-col :flex="5">
      <div>5 / 12</div>
    </fk-col>
  </fk-row>
</template>

<style scoped>
.grid-demo .fk-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}

.grid-demo .fk-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}

.grid-demo .fk-col:nth-child(2n) {
  background-color: rgba(var(--fkblue-6), 0.9);
}
</style>
```
