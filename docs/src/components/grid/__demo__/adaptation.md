```yaml
title:
  zh-CN: 响应式布局
  en-US: Responsive Layout
```


预置六种响应尺寸, 分别为 `xs`, `sm`, `md`, `lg`, `xl`, `xxl`。

---


```vue { "component": true } 
<template>
  <fk-row class="grid-demo">
    <fk-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10" :xxl="8">
      Col
    </fk-col>
    <fk-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4" :xxl="8">
      Col
    </fk-col>
    <fk-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10" :xxl="8">
      Col
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
.grid-demo .fk-col:nth-child(2n) {
  background-color: rgba(var(--fkblue-6), 0.9);
}
.grid-demo .fk-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>
```
