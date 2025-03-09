```yaml
title:
  zh-CN: 排序
  en-US: Order
```


通过 `order` 来进行元素排序。

---


```vue { "component": true } 
<template>
  <div>
    <fk-row class="grid-demo">
      <fk-col :span="6" :order="4">
        <div>1 col-order-4</div>
      </fk-col>
      <fk-col :span="6" :order="3">
        <div>2 col-order-3</div>
      </fk-col>
      <fk-col :span="6" :order="2">
        <div>3 col-order-2</div>
      </fk-col>
      <fk-col :span="6" :order="1">
        <div>4 col-order-1</div>
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
