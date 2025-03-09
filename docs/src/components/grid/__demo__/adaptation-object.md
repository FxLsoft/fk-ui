```yaml
title:
  zh-CN: 其他属性的响应式
  en-US: Advanced Responsive Layout
```


`span`, `offset`, `order` 属性可以内嵌到 `xs`, `sm`, `md`, `lg`, `xl`, `xxl` 对象中使用。
比如 `:xs="8"` 相当于 `:xs="{ span: 8 }"`。

---


```vue { "component": true } 
<template>
  <div>
    <fk-row class="grid-demo">
      <fk-col :xs="{span: 5, offset: 1}" :lg="{span: 6, offset: 2}">
        Col
      </fk-col>
      <fk-col :xs="{span: 11, offset: 1}" :lg="{span: 6, offset: 2}">
        Col
      </fk-col>
      <fk-col :xs="{span: 5, offset: 1}" :lg="{span: 6, offset: 2}">
        Col
      </fk-col>
    </fk-row>
  </div>
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
